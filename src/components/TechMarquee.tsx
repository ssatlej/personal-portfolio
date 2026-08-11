import { motion } from "motion/react";
import { useState } from "react";
import type { Tech } from "@/types";
import { TechCard } from "./TechCard";

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
