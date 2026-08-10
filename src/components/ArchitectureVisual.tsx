import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  w?: number;
};

/** Conceptual, non-technical map of the Jadwelny platform. */
const NODES: Node[] = [
  { id: "root", label: "Jadwelny", x: 400, y: 210, w: 170 },
  { id: "frontend", label: "Frontend", x: 400, y: 60 },
  { id: "backend", label: "Backend", x: 640, y: 130 },
  { id: "booking", label: "Booking", x: 660, y: 300 },
  { id: "crm", label: "CRM", x: 470, y: 390 },
  { id: "payments", label: "Payments", x: 250, y: 380 },
  { id: "infra", label: "Infrastructure", x: 150, y: 220, w: 160 },
  { id: "ai", label: "AI", x: 175, y: 80 },
];

const EDGES: [string, string][] = [
  ["root", "frontend"],
  ["root", "backend"],
  ["root", "booking"],
  ["root", "crm"],
  ["root", "payments"],
  ["root", "infra"],
  ["root", "ai"],
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;

const NODE_H = 46;

function edgePath(a: Node, b: Node) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  return `M${a.x} ${a.y} Q ${mx + (b.y - a.y) * 0.12} ${my + (a.x - b.x) * 0.12}, ${b.x} ${b.y}`;
}

export function ArchitectureVisual({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-primary/20 bg-[color-mix(in_oklab,var(--background)_92%,var(--primary))] ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--primary) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--primary) 8%, transparent) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(80% 75% at 50% 50%, black 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 45% at 50% 50%, color-mix(in oklab, var(--primary) 18%, transparent) 0%, transparent 70%)",
        }}
      />

      <motion.svg
        viewBox="0 0 800 460"
        role="img"
        aria-label="Conceptual overview of the Jadwelny platform: frontend, backend, booking, CRM, payments, infrastructure and AI."
        className="relative h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <defs>
          <linearGradient id="jw-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {EDGES.map(([from, to], i) => (
          <motion.path
            key={`${from}-${to}`}
            d={edgePath(byId(from), byId(to))}
            fill="none"
            stroke="url(#jw-edge)"
            strokeWidth="1.3"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              show: { pathLength: 1, opacity: 1 },
            }}
            transition={{ duration: 0.7, ease, delay: 0.25 + i * 0.06 }}
          />
        ))}

        {NODES.map((n, i) => {
          const w = n.w ?? 122;
          const isRoot = n.id === "root";
          return (
            <motion.g
              key={n.id}
              className="group cursor-default"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.08 }}
            >
              <motion.g
                animate={{ y: [0, i % 2 === 0 ? -4 : 4, 0] }}
                transition={{
                  duration: 6 + (i % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                }}
              >
                <rect
                  x={n.x - w / 2}
                  y={n.y - NODE_H / 2}
                  width={w}
                  height={NODE_H}
                  rx="14"
                  fill={
                    isRoot
                      ? "color-mix(in oklab, var(--primary) 16%, var(--card))"
                      : "color-mix(in oklab, var(--card) 80%, transparent)"
                  }
                  stroke={
                    isRoot
                      ? "var(--primary)"
                      : "color-mix(in oklab, var(--primary) 35%, transparent)"
                  }
                  strokeWidth="1"
                  className="transition-[stroke,fill] duration-300 group-hover:[stroke:var(--primary)]"
                />
                <text
                  x={n.x}
                  y={n.y + 5}
                  textAnchor="middle"
                  className={isRoot ? "fill-[var(--primary)]" : "fill-foreground"}
                  style={{ fontSize: isRoot ? 16 : 13, fontWeight: 600 }}
                >
                  {n.label}
                </text>
              </motion.g>
            </motion.g>
          );
        })}
      </motion.svg>
    </div>
  );
}
