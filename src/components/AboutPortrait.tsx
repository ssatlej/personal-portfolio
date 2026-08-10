import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import portrait from "@/assets/images/photo.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

/** Portrait in a glass frame with a subtle 6deg cursor tilt and cursor-tracked glow. */
export function AboutPortrait() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });

  const rotateY = useTransform(sx, [0, 1], [-6, 6]);
  const rotateX = useTransform(sy, [0, 1], [6, -6]);
  const glowX = useTransform(sx, [0, 1], ["25%", "75%"]);
  const glowY = useTransform(sy, [0, 1], ["25%", "75%"]);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease }}
      className="relative mx-auto w-full max-w-sm lg:max-w-none"
    >
      {/* Soft abstract glows behind the photo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-primary/15 blur-[90px]" />
        <div className="absolute -bottom-12 -right-8 h-64 w-64 rounded-full bg-accent/12 blur-[100px]" />
      </div>

      <div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{ perspective: 1000 }}
        className="group relative"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="surface-panel relative p-3 shadow-elevated"
        >
          {/* animated border trace */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "conic-gradient(from var(--trace-angle,0deg), transparent 0deg, color-mix(in oklab, var(--primary) 55%, transparent) 40deg, transparent 90deg)",
              mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "1px",
              animation: "trace-spin 6s linear infinite",
            }}
          />

          <motion.div
            className="relative overflow-hidden rounded-[1.5rem]"
            style={{ transform: "translateZ(30px)" }}
          >
            <motion.img
              src={portrait}
              alt="Portrait of Satlej Sunil, full stack developer"
              loading="lazy"
              className="block h-auto w-full rounded-[1.5rem] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] lg:max-h-[470px]"
            />

            {/* cursor-tracked neon glow */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: useTransform(
                  [glowX, glowY],
                  ([x, y]) =>
                    `radial-gradient(38% 38% at ${x} ${y}, color-mix(in oklab, var(--primary) 26%, transparent), transparent 70%)`,
                ),
              }}
            />
          </motion.div>

          {/* floating geometric accents */}
          <motion.span
            aria-hidden
            style={{ transform: "translateZ(60px)" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 top-10 h-12 w-12 rounded-xl border border-primary/40 bg-primary/5 backdrop-blur-md"
          />
          <motion.span
            aria-hidden
            style={{ transform: "translateZ(50px)" }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute -left-5 bottom-16 h-10 w-10 rounded-full border border-accent/40 bg-accent/5 backdrop-blur-md"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
