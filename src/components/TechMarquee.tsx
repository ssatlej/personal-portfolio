import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const loop = [...items, ...items];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { rootMargin: "100px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className="group/row relative overflow-hidden"
    >
      <div
        className=" py-5 md:py-6"
        style={{
          // transform: tilt ? `rotate(${tilt * 0.4}deg)` : undefined,
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div
          ref={trackRef}
          className="flex w-max motion-reduce:animate-none"
          style={{
            animation: `tech-marquee-${direction} ${duration}s linear infinite`,
            animationPlayState: inView ? "running" : "paused",
            willChange: inView ? "transform" : "auto",
            transform: "translate3d(0,0,0)",
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
