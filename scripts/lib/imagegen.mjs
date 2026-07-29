// Shared image generation against the local opencodex proxy.
//
// The proxy is an OpenAI-compatible endpoint, but with three quirks worth
// knowing before you debug a 400:
//   - the legacy /v1/images/generations route does not exist; use /v1/responses
//     with the built-in image_generation tool
//   - it rejects stored responses, so store must be false
//   - it only answers as a stream, so stream must be true and the image
//     arrives inside the SSE events rather than in a JSON body
//
// The port moves between installs — confirm it with `ocx status` and pass it
// through OPENAI_BASE_URL rather than trusting the default here.

const BASE = process.env.OPENAI_BASE_URL || "http://127.0.0.1:10100/v1";
const KEY = process.env.OPENAI_API_KEY || "local";
const MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-5.5";

// Pull the finished base64 image out of the SSE stream. The result can arrive
// either on the completed output item or in the final response payload.
async function readImageFromStream(res) {
  let buffer = "";
  let image = null;

  for await (const chunk of res.body) {
    buffer += Buffer.from(chunk).toString("utf8");
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;

      let event;
      try {
        event = JSON.parse(payload);
      } catch {
        continue;
      }

      if (event.type === "response.output_item.done" && event.item?.type === "image_generation_call" && event.item.result) {
        image = event.item.result;
      }
      if (event.type === "response.completed") {
        const call = (event.response?.output || []).find((o) => o.type === "image_generation_call");
        if (call?.result) image = call.result;
      }
      if (event.type === "error" || event.type === "response.failed") {
        throw new Error(JSON.stringify(event).slice(0, 400));
      }
    }
  }

  return image;
}

/** Generate one image and return it as a PNG buffer. */
export async function generateImage(prompt, { size = "1536x1024" } = {}) {
  const res = await fetch(`${BASE}/responses`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({
      model: MODEL,
      input: [{ role: "user", content: `Generate a single high-quality photographic image. ${prompt}` }],
      store: false,
      stream: true,
      tools: [{ type: "image_generation", size, quality: "high", output_format: "png" }],
    }),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 400)}`);
  }

  const result = await readImageFromStream(res);
  if (!result) throw new Error("No image_generation_call result in the stream");

  return Buffer.from(result, "base64");
}
