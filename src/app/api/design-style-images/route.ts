import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getDesignStyleBySlug } from "@/data/designStyles";

export const runtime = "nodejs";

type GenerateImageRequest = {
  prompt?: string;
  quality?: string;
  size?: string;
  slug?: string;
};

type OpenAIImageResponse = {
  data?: Array<{
    b64_json?: string;
    revised_prompt?: string;
    url?: string;
  }>;
  error?: {
    message?: string;
  };
};

const allowedQualities = new Set(["auto", "low", "medium", "high"]);
const allowedSizes = new Set(["auto", "1024x1024", "1536x1024", "1024x1536"]);

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function cleanText(input: unknown) {
  return typeof input === "string" ? input.trim() : "";
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return jsonError("Image generation is only available in local development.", 404);
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return jsonError("OPENAI_API_KEY is required to generate design style images.", 503);
  }

  let body: GenerateImageRequest;

  try {
    body = (await request.json()) as GenerateImageRequest;
  } catch {
    return jsonError("Request body must be valid JSON.", 400);
  }

  const slug = cleanText(body.slug);
  const style = getDesignStyleBySlug(slug);

  if (!style) {
    return jsonError("Unknown design style slug.", 404);
  }

  const quality = allowedQualities.has(cleanText(body.quality)) ? cleanText(body.quality) : "medium";
  const size = allowedSizes.has(cleanText(body.size)) ? cleanText(body.size) : "1024x1024";
  const customPrompt = cleanText(body.prompt);
  const prompt = [style.imagePrompt, customPrompt].filter(Boolean).join(". ").slice(0, 32000);
  const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1.5";
  const outputFormat = "webp";

  const openaiResponse = await fetch("https://api.openai.com/v1/images/generations", {
    body: JSON.stringify({
      background: "opaque",
      model,
      output_format: outputFormat,
      prompt,
      quality,
      size,
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const result = (await openaiResponse.json()) as OpenAIImageResponse;

  if (!openaiResponse.ok) {
    return jsonError(result.error?.message ?? "OpenAI image generation failed.", openaiResponse.status);
  }

  const image = result.data?.[0];

  if (!image?.b64_json && !image?.url) {
    return jsonError("OpenAI response did not include image data.", 502);
  }

  const bytes = image.b64_json
    ? Buffer.from(image.b64_json, "base64")
    : Buffer.from(await (await fetch(image.url as string)).arrayBuffer());
  const outputDir = path.join(process.cwd(), "public", "generated", "design-styles");
  const fileName = `${style.slug}.${outputFormat}`;
  const filePath = path.join(outputDir, fileName);

  await mkdir(outputDir, { recursive: true });
  await writeFile(filePath, bytes);

  return NextResponse.json({
    model,
    path: `/generated/design-styles/${fileName}`,
    prompt,
    revisedPrompt: image.revised_prompt ?? null,
    style: {
      nameEn: style.nameEn,
      nameKo: style.nameKo,
      slug: style.slug,
    },
  });
}
