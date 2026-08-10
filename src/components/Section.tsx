import { motion } from "motion/react";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  /** Alternating tonal background for visual separation. */
  tone?: "base" | "raised";
  className?: string;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function Section({
  id,
  eyebrow,
  title,
  children,
  tone = "base",
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={[
        "relative flex min-h-[92vh] w-full items-center py-28 md:py-36",
        tone === "raised" ? "bg-surface/60" : "bg-transparent",
        className,
      ].join(" ")}
    >
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
        >
          {eyebrow && (
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-primary">
              {eyebrow}
            </p>
          )}
          <h2
            id={`${id}-title`}
            className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] md:text-6xl"
          >
            {title}
          </h2>
          {children && <div className="mt-12 md:mt-16">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
