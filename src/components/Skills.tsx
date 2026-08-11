import { motion } from "motion/react";
import { ArrowUpRight, ChevronDownIcon, LayoutGrid, Sparkles } from "lucide-react";
import { TechMarquee } from "@/components/TechMarquee";
import type { Tech } from "@/types";
import { ALL_TECH } from "./TechList";
import { useState } from "react";
import { TechAllModal } from "./TechAllModal";

const ease = [0.16, 1, 0.3, 1] as const;

export function chunkIntoRows(items: Tech[], rowCount: number): Tech[][] {
  const rows: Tech[][] = Array.from({ length: rowCount }, () => []);
  const base = Math.floor(items.length / rowCount);
  const remainder = items.length % rowCount;

  let cursor = 0;
  for (let i = 0; i < rowCount; i++) {
    const size = base + (i < remainder ? 1 : 0);
    rows[i] = items.slice(cursor, cursor + size);
    cursor += size;
  }
  return rows;
}

const BASE_DURATION_PER_ITEM = 3;
function buildRows(rowCount: number) {
  return chunkIntoRows(ALL_TECH, rowCount).map((items, i) => ({
    items,
    direction: (i % 2 === 0 ? "left" : "right") as "left" | "right",
    duration: items.length * BASE_DURATION_PER_ITEM,
    tilt: i % 2 === 0 ? -2 : 2,
    delay: i * 0.05,
  }));
}

const DESKTOP_ROWS = buildRows(3);
const MOBILE_ROWS = buildRows(4);

export function Skills() {
  const [showAll, setShowAll] = useState(false);
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative w-full py-28 md:py-36">
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            My Expertise
          </p>
          <h2
            id="skills-title"
            className="text-balance text-4xl font-semibold leading-[1.05] md:text-6xl"
          >
            Technologies I Work With
          </h2>
          <div
            aria-hidden
            className="mt-8 h-px w-40 bg-primary"
            style={{
              boxShadow:
                "0 0 18px color-mix(in oklab, var(--primary) 70%, transparent), 0 0 40px color-mix(in oklab, var(--primary) 35%, transparent)",
            }}
          />
          <p className="mt-8 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            I build scalable, production-ready web applications using modern frontend, backend,
            cloud, and AI-assisted development tools. These are the technologies I use regularly to
            design, develop, deploy, and maintain high-quality software.
          </p>
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="mt-12 inline-flex items-center cursor-pointer gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
            View All
          </button>
        </motion.div>
      </div>
      <div className="relative z-10 mt-12 flex flex-col gap-3 md:hidden">
        {MOBILE_ROWS.map((row, i) => (
          <TechMarquee key={i} {...row} />
        ))}
      </div>
      <div className="relative z-10 mt-16 hidden flex-col gap-5 md:mt-20 md:flex">
        {DESKTOP_ROWS.map((row, i) => (
          <TechMarquee key={i} {...row} />
        ))}
      </div>
      <TechAllModal open={showAll} onClose={() => setShowAll(false)} items={ALL_TECH} />
    </section>
  );
}
