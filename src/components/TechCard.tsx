import { Tech } from "@/types";
import { useState } from "react";

export function TechCard({ tech, fluid = false }: { tech: Tech; fluid?: boolean }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={
        fluid
          ? "surface-panel group/card flex h-[86px] w-full flex-col items-center justify-center gap-2.5 px-4 shadow-[0_18px_40px_-28px_oklch(0_0_0/0.9)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.05] hover:border-primary/45 hover:shadow-glow sm:h-[104px] sm:gap-3"
          : "surface-panel group/card mr-4 flex h-[86px] w-[150px] shrink-0 flex-col items-center justify-center gap-2.5 px-4 shadow-[0_18px_40px_-28px_oklch(0_0_0/0.9)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.05] hover:border-primary/45 hover:shadow-glow sm:mr-6 sm:h-[104px] sm:w-[182px] sm:gap-3"
      }
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
