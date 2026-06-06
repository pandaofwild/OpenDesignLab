import type { ReactNode } from "react";

export function DesignStyleDetailSection({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="specimen-surface p-5">
      <h2 className="raw-label flex items-center gap-2 text-[var(--specimen-signal)]">
        <span className="specimen-bullet" aria-hidden="true" />
        {title}
      </h2>
      <div className="mt-4 text-sm leading-7 text-[var(--specimen-ink-55)]">{children}</div>
    </section>
  );
}
