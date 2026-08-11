import { motion } from "motion/react";
import { useState } from "react";
import type { Tech } from "@/types";

function TechCard({ tech }: { tech: Tech }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="surface-panel group/card mr-4 flex h-[86px] w-[150px] shrink-0 flex-col items-center justify-center gap-2.5 px-4 shadow-[0_18px_40px_-28px_oklch(0_0_0/0.9)] transition-all duration-300 will-change-transform hover:-translate-y-1.5 hover:scale-[1.05] hover:border-primary/45 hover:shadow-glow sm:mr-6 sm:h-[104px] sm:w-[182px] sm:gap-3"
      // style={{ transform: "translateZ(0)" }}
    >
      {tech.logo && !failed ? (
        <img
          src={tech.logo}
          alt={`${tech.name} logo`}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onError={() => setFailed(true)}
          className="h-7 w-7 object-contain sm:h-9 sm:w-9"
        />
      ) : (
        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 font-display text-[0.7rem] font-semibold text-primary sm:h-9 sm:w-9 sm:text-sm">
          {tech.name
            .replace(/[^A-Za-z ]/g, "")
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </span>
      )}
      <span className="whitespace-nowrap text-[0.72rem] font-medium tracking-tight text-muted-foreground transition-colors duration-300 group-hover/card:text-foreground sm:text-sm">
        {tech.name}
      </span>
    </div>
  );
}

type RowProps = {
  items: Tech[];
  direction?: "left" | "right";
  duration?: number;
  tilt?: number;
  delay?: number;
};

export function TechMarquee({
  items,
  direction = "left",
  duration = 38,
  tilt = 0,
  delay = 0,
}: RowProps) {
  const loop = [...items, ...items];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className="group/row relative"
    >
      <div
        className="overflow-visible py-5 md:py-6"
        style={{
          // transform: tilt ? `rotate(${tilt * 0.4}deg)` : undefined,
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div
          className="flex w-max [animation-play-state:running] group-hover/row:[animation-play-state:paused] motion-reduce:animate-none"
          style={{
            animation: `tech-marquee-${direction} ${duration}s linear infinite`,
            willChange: "transform",
          }}
        >
          {loop.map((tech, i) => (
            <TechCard key={`${tech.name}-${i}`} tech={tech} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
