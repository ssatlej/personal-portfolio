import { motion, useReducedMotion } from "motion/react";

const CODE = [
  { t: "const", c: "text-primary" },
  { t: " engineer", c: "text-foreground" },
  { t: " = {", c: "text-muted-foreground" },
];

const LINES: Array<Array<{ t: string; c: string }>> = [
  CODE,
  [
    { t: "  name", c: "text-accent" },
    { t: ": ", c: "text-muted-foreground" },
    { t: "'Satlej Sunil'", c: "text-foreground/90" },
    { t: ",", c: "text-muted-foreground" },
  ],
  [
    { t: "  stack", c: "text-accent" },
    { t: ": [", c: "text-muted-foreground" },
    { t: "'React'", c: "text-foreground/90" },
    { t: ", ", c: "text-muted-foreground" },
    { t: "'Next.js'", c: "text-foreground/90" },
    { t: ",", c: "text-muted-foreground" },
  ],
  [
    { t: "    ", c: "" },
    { t: "'Node'", c: "text-foreground/90" },
    { t: ", ", c: "text-muted-foreground" },
    { t: "'TypeScript'", c: "text-foreground/90" },
    { t: "],", c: "text-muted-foreground" },
  ],
  [
    { t: "  focus", c: "text-accent" },
    { t: ": ", c: "text-muted-foreground" },
    { t: "'scale · speed · craft'", c: "text-foreground/90" },
    { t: ",", c: "text-muted-foreground" },
  ],
  [
    { t: "  shipping", c: "text-accent" },
    { t: ": ", c: "text-muted-foreground" },
    { t: "true", c: "text-primary" },
    { t: ",", c: "text-muted-foreground" },
  ],
  [{ t: "};", c: "text-muted-foreground" }],
];

/** Abstract floating glass code card — decorative developer identity visual. */
export function HeroVisual() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative hidden select-none lg:block"
    >
      <div className="absolute inset-6 rounded-[2.5rem] bg-primary/10 blur-[90px]" />

      <motion.div
        animate={reduced ? { y: 0 } : { y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="surface-panel overflow-hidden rounded-3xl shadow-elevated">
          <div className="flex items-center gap-2 border-b border-border px-5 py-4">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">
              engineer.ts
            </span>
          </div>

          <pre className="overflow-x-auto px-6 py-7 font-mono text-[13px] leading-7">
            <code>
              {LINES.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.12 }}
                  className="flex"
                >
                  <span className="mr-5 w-4 shrink-0 text-right text-muted-foreground/40">
                    {i + 1}
                  </span>
                  <span>
                    {line.map((tok, j) => (
                      <span key={j} className={tok.c}>
                        {tok.t}
                      </span>
                    ))}
                  </span>
                </motion.div>
              ))}
            </code>
          </pre>
        </div>

        <motion.div
          animate={reduced ? { y: 0 } : { y: [0, 10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="surface-panel absolute -bottom-10 -left-10 flex items-center gap-3 rounded-2xl px-5 py-4"
        >
          <span className="h-2 w-2 rounded-full bg-primary shadow-glow" />
          <div>
            <p className="text-sm font-medium">99.9% uptime</p>
            <p className="text-xs text-muted-foreground">Production systems</p>
          </div>
        </motion.div>

        <motion.div
          animate={reduced ? { y: 0 } : { y: [0, -12, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="surface-panel absolute -right-8 -top-10 rounded-2xl px-5 py-4"
        >
          <p className="font-display text-2xl font-semibold text-primary">3+</p>
          <p className="text-xs text-muted-foreground">Years shipping</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
