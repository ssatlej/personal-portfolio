import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  ArrowUpRight,
  Bot,
  Boxes,
  CreditCard,
  Database,
  Layers3,
  MonitorSmartphone,
  Plane,
  Plug,
  Server,
  Users,
} from "lucide-react";
import { ArchitectureVisual } from "@/components/ArchitectureVisual";
import { useIsMobile } from "@/hooks/use-mobile";

const ease = [0.16, 1, 0.3, 1] as const;

const AREAS = [
  {
    icon: MonitorSmartphone,
    title: "Frontend Engineering",
    points: [
      "Built a high-performance Next.js frontend with a strong focus on SEO, page-load optimization, responsive user interfaces, reusable components, dynamic forms, dashboards, and complex booking workflows.",
      "Implemented Arabic-English localization with full LTR/RTL support.",
    ],
    tech: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Bootstrap"],
  },
  {
    icon: Server,
    title: "Backend & API Engineering",
    points: [
      "Designed and implemented scalable RESTful APIs supporting booking workflows, business operations, external integrations, authentication, authorization, validation, and real-time data processing.",
      "Worked with PostgreSQL, MongoDB, and Redis as part of the backend systems.",
    ],
    tech: [
      "Node.js",
      "Express.js",
      "Nest.js",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "REST APIs",
    ],
  },
  {
    icon: Plane,
    title: "Booking & Travel Systems",
    points: [
      "Developed functionality supporting hotel, flight, and visa booking workflows, including real-time availability, pricing, booking operations, and checkout experiences.",
    ],
  },
  {
    icon: Users,
    title: "CRM & Business Operations",
    points: [
      "Developed internal CRM functionality supporting business operations, dashboards, workflows, reporting, and operational processes.",
    ],
  },
  {
    icon: CreditCard,
    title: "Payment Systems",
    points: [
      "Integrated and implemented payment functionality using Stripe, Tabby, and PayBy, including transaction handling, webhook workflows, retry scenarios, failure handling, and checkout improvements.",
    ],
    tech: ["Stripe", "Tabby", "PayBy"],
  },
  {
    icon: Plug,
    title: "Third-Party Integrations",
    points: [
      "Integrated external services required for travel booking and business workflows, connecting real-time external data with the platform's booking processes.",
    ],
  },
  {
    icon: Database,
    title: "Production Infrastructure",
    points: [
      "Deployed and maintained production systems across cloud and Linux-based environments, managing application hosting, containerization, reverse-proxy configuration, SSL/TLS, releases, and Git workflows.",
    ],
    tech: ["AWS", "AWS EC2", "Hetzner Cloud", "Docker", "Nginx", "Linux", "Git"],
  },
  {
    icon: Bot,
    title: "AI-Powered Customer Support",
    points: [
      "Built and integrated an AI-powered customer-support capability for handling booking-related queries and reducing manual support workload.",
    ],
  },
] as const;

const HIGHLIGHTS = [
  { icon: Layers3, label: "Full-Stack Development" },
  { icon: Plane, label: "Booking Systems" },
  { icon: Users, label: "CRM & Business Operations" },
  { icon: CreditCard, label: "Payment Integrations" },
  { icon: Boxes, label: "Production Infrastructure" },
  { icon: Bot, label: "AI-Powered Support" },
] as const;

const STACK = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express.js",
  "Nest.js",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Tailwind CSS",
  "Bootstrap",
  "AWS",
  "AWS EC2",
  "Hetzner Cloud",
  "Docker",
  "Nginx",
  "Linux",
  "Git",
  "Stripe",
  "Tabby",
  "PayBy",
];

function Pill({ label, index = 0 }: { label: string; index?: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease, delay: 0.02 * index }}
      className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] tracking-wide text-muted-foreground md:text-xs"
    >
      {label}
    </motion.li>
  );
}

function Bullets({ points }: { points: readonly string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {points.map((p) => (
        <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
          <span aria-hidden className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

function AreaCard({
  icon: Icon,
  title,
  points,
  tech,
  index,
}: {
  icon: typeof Server;
  title: string;
  points: readonly string[];
  tech?: readonly string[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease, delay: 0.06 * index }}
      className="surface-panel flex h-full flex-col rounded-2xl border border-border/80 !bg-[color-mix(in_oklab,var(--card)_82%,transparent)] p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow md:p-6"
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
          <Icon className="h-4.5 w-4.5" aria-hidden />
        </span>
        <h4 className="text-base font-semibold tracking-tight md:text-lg">{title}</h4>
      </div>
      <Bullets points={points} />
      {tech && (
        <div className="mt-auto pt-5">
          <ul className="flex flex-wrap gap-2">
            {tech.map((t, i) => (
              <Pill key={t} label={t} index={i} />
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

/** Subtle pointer tilt + cursor-following glow. Disabled on touch/mobile. */
function useTilt(enabled: boolean, max = 3.5) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const gx = useSpring(useMotionValue(50), { stiffness: 120, damping: 20 });
  const gy = useSpring(useMotionValue(50), { stiffness: 120, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rx.set((0.5 - py) * max * 2);
    ry.set((px - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  };

  const glow = useTransform(
    [gx, gy],
    ([x, y]) =>
      `radial-gradient(32% 40% at ${x}% ${y}%, color-mix(in oklab, var(--primary) 15%, transparent) 0%, transparent 70%)`,
  );

  return { ref, onMove, onLeave, rx, ry, glow };
}

export function JadwelnyProject() {
  const isMobile = useIsMobile();
  const { ref, onMove, onLeave, rx, ry, glow } = useTilt(!isMobile, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, ease }}
      style={{ perspective: 1600 }}
    >
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group surface-panel relative overflow-hidden !bg-[color-mix(in_oklab,var(--card)_88%,transparent)] p-6 shadow-elevated transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-glow md:p-10"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glow }}
        />

        <div className="relative">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              <span
                aria-hidden
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-glow"
              />
              Professional Experience
            </span>
          </div>

          <h3 className="mt-5 text-4xl font-semibold tracking-tight text-glow md:text-6xl">
            Jadwelny
          </h3>
          <p className="mt-2 text-base text-primary/90 md:text-lg">Travel Booking Platform</p>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            Software Developer — Full Stack / MERN
          </p>
          <p className="mt-1 text-xs text-muted-foreground md:text-sm">
            April 2025 – Present · Dubai, UAE
          </p>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            A high-traffic, real-time travel booking platform where I worked across frontend
            development, backend architecture, APIs, business workflows, payment systems, CRM,
            integrations, and production infrastructure.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="https://www.jadwelny.com"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.03]"
            >
              Visit Project
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <span className="text-sm text-muted-foreground">www.jadwelny.com</span>
          </div>

          {/* Conceptual visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="mt-8"
          >
            <ArchitectureVisual className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[2/1]" />
          </motion.div>

          {/* My contributions */}
          <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/[0.06] p-5 md:p-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-primary">My Contributions</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
              I independently developed and managed significant full-stack functionality across
              frontend engineering, backend APIs, databases, business workflows, CRM functionality,
              payment systems, integrations, and production infrastructure.
            </p>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {AREAS.map((a, i) => (
              <AreaCard
                key={a.title}
                icon={a.icon}
                title={a.title}
                points={a.points}
                {...("tech" in a ? { tech: a.tech } : {})}
                index={i}
              />
            ))}
          </div>

          {/* Project highlights */}
          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.22em] text-primary">Project Highlights</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, ease, delay: 0.05 * i }}
                  className="flex items-center gap-3 rounded-xl border border-border/80 bg-[color-mix(in_oklab,var(--card)_82%,transparent)] px-4 py-3 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <h.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-foreground/90">
                    {h.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.22em] text-primary">Technology Stack</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {STACK.map((t, i) => (
                <Pill key={t} label={t} index={i} />
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
