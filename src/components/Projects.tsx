import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Layers3, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { ProjectVisual } from "@/components/ProjectVisual";
import secuesShot from "@/assets/images/secues.png";
import srvSocialShot from "@/assets/images/srv-social.png";
import asapShot from "@/assets/images/asap-csp.png";
import smotproShot from "@/assets/images/smotpro.png";
import { JadwelnyProject } from "@/components/JadwelnyProject";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ease = [0.16, 1, 0.3, 1] as const;

type Project = {
  name: string;
  category: string;
  description: string;
  highlights: string[];
  badges: string[];
  tech: string[];
  variant: "secure" | "saas" | "gov" | "crm";
  /** Drop a real screenshot URL/import here to replace the abstract visual. */
  image?: string;
  url?: string;
};

const FEATURED = {
  name: "SECUES",
  subtitle: "Secure File Sharing and Viewing",
  dates: "Jan 2025 – Feb 2025",
  label: "Security • Web Application",
  description:
    "A secure and interactive file-sharing web application focused on responsive user experience, secure file sharing, and client-side encryption.",
  highlights: [
    "Developed a responsive web application using React.js, Vite, and Tailwind CSS.",
    "Integrated a PHP-based API with optimized request handling.",
    "Engineered a secure file-sharing system using server-generated share IDs.",
    "Implemented end-to-end encryption using the Web Cryptography API and AES-GCM.",
    "Focused on data integrity, confidentiality, and protection against unauthorized access.",
  ],
  metrics: ["Secure File Sharing", "AES-GCM Encryption"],
  tech: [
    "React.js",
    "Vite",
    "Tailwind CSS",
    "TypeScript",
    "Web Cryptography API",
    "AES-GCM",
    "PHP",
    "Hyperhost",
  ],
  url: "https://secues.com",
  urlLabel: "secues.com",
  variant: "secure" as const,
  image: secuesShot as string | undefined,
};

const PROJECTS: Project[] = [
  {
    name: "SRV Social",
    category: "SaaS CRM Platform",
    description:
      "A multi-tenant SaaS CRM platform with separate Admin CRM and Client CRM modules, designed for client management and analytics.",
    highlights: [
      "Solely developed the system architecture.",
      "Built Admin CRM and Client CRM modules.",
      "Implemented multi-tenant backend architecture.",
      "Built multi-tenant frontend architecture and dynamic dashboards.",
      "Integrated Google My Business and Meta APIs for automated review management and insights.",
    ],
    badges: ["Multi-Tenant SaaS"],
    tech: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "TypeScript",
      "REST APIs",
    ],
    variant: "saas",
    image: srvSocialShot,
    url: "https://srvsocial.com",
  },
  {
    name: "ASAP Kerala",
    category: "Government Initiative",
    description:
      "A full-stack platform developed as part of the Kerala Government initiative, supporting assessment, ranking, certification, and lead management workflows.",
    highlights: [
      "Developed full-stack features supporting over 6,000 leads within six months.",
      "Implemented assessment, ranking, and certification modules.",
      "Built rank generation and secure data processing functionality.",
      "Developed UI for assessment modules, rank lists, and certification systems with real-time updates.",
    ],
    badges: ["6,000+ Leads"],
    tech: ["React.js", "Next.js", "Node.js", "Express.js", "PostgreSQL", "TypeScript"],
    variant: "gov",
    image: asapShot,
    url: "https://csp.asapkerala.gov.in",
  },
  {
    name: "SMOTPRO",
    category: "Website + CRM System",
    description:
      "A business platform combining website functionality with Sales, Marketing, and HRMS modules.",
    highlights: [
      "Built Sales, Marketing, and HRMS modules across frontend and backend.",
      "Integrated external platforms including Just Dial, IVR systems, and Sulekha.",
      "Supported more than 500 leads per week.",
      "Automated business workflows using backend-driven solutions.",
      "Improved operational efficiency by more than 50%.",
      "Improved internal UI/UX to enhance productivity and reduce manual effort.",
    ],
    badges: ["500+ Leads / Week", "50%+ Efficiency"],
    tech: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "TypeScript"],
    variant: "crm",
    image: smotproShot,
    url: "https://newuat.smotpro.com",
  },
];

function TechPill({ label, index = 0 }: { label: string; index?: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease, delay: 0.03 * index }}
      className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] tracking-wide text-muted-foreground md:text-xs"
    >
      {label}
    </motion.li>
  );
}

function MetricBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-primary">
      <TrendingUp className="h-3 w-3" aria-hidden />
      {children}
    </span>
  );
}

/** Subtle pointer tilt + cursor-following glow. Disabled on touch/mobile. */
function useTilt(enabled: boolean, max = 4.5) {
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
      `radial-gradient(38% 55% at ${x}% ${y}%, color-mix(in oklab, var(--primary) 16%, transparent) 0%, transparent 70%)`,
  );

  return { ref, onMove, onLeave, rx, ry, glow };
}

function FeaturedProject() {
  const isMobile = useIsMobile();
  const { ref, onMove, onLeave, rx, ry, glow } = useTilt(!isMobile, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease }}
      style={{ perspective: 1400 }}
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

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="order-first overflow-hidden rounded-2xl border border-primary/20 lg:order-last"
          >
            <a
              href={FEATURED.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group/overlay relative block aspect-[16/10] w-full cursor-pointer overflow-hidden"
            >
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                <ProjectVisual variant={FEATURED.variant} image={FEATURED.image} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover/overlay:opacity-100">
                <span
                  // href={FEATURED.url}
                  // target="_blank"
                  // rel="noreferrer noopener"
                  className="flex gap-2 items-center rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
                >
                  Visit Project
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </a>
          </motion.div>

          {/* Content */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                {FEATURED.label}
              </span>
              <span className="text-xs text-muted-foreground">{FEATURED.dates}</span>
            </div>

            <h3 className="mt-5 text-3xl font-semibold tracking-tight text-glow transition-transform duration-300 group-hover:-translate-y-0.5 md:text-5xl">
              {FEATURED.name}
            </h3>
            <p className="mt-2 text-base text-primary/90 md:text-lg">{FEATURED.subtitle}</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {FEATURED.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {FEATURED.metrics.map((m) => (
                <MetricBadge key={m}>{m}</MetricBadge>
              ))}
            </div>

            <ul className="mt-6 space-y-2.5">
              {FEATURED.highlights.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease, delay: 0.05 * i }}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-glow"
                  />
                  <span>{h}</span>
                </motion.li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-2">
              {FEATURED.tech.map((t, i) => (
                <TechPill key={t} label={t} index={i} />
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={FEATURED.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.03]"
              >
                Visit Project
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <span className="text-sm text-muted-foreground">{FEATURED.urlLabel}</span>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const isMobile = useIsMobile();
  const { ref, onMove, onLeave, rx, ry, glow } = useTilt(!isMobile);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease, delay: 0.12 * index }}
      style={{ perspective: 1200 }}
    >
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group surface-panel relative flex h-full flex-col overflow-hidden !bg-[color-mix(in_oklab,var(--card)_90%,transparent)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: glow }}
        />

        <a
          href={project.url}
          target="_blank"
          rel="noreferrer noopener"
          className="group/overlay relative aspect-[16/10] w-full cursor-pointer overflow-hidden border-b border-border"
        >
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover/overlay:scale-[1.06]">
            <ProjectVisual variant={project.variant} image={project.image} />
          </div>

          {/* Hover overlay & label */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover/overlay:opacity-100">
            <span
              // href={project.url}
              // target="_blank"
              // rel="noreferrer noopener"
              className="flex gap-2 items-center rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
            >
              Visit Project
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </a>

        <div className="relative z-20 flex flex-1 flex-col p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary">{project.category}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight transition-transform duration-300 group-hover:-translate-y-0.5 md:text-2xl">
            {project.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.badges.map((b) => (
              <MetricBadge key={b}>{b}</MetricBadge>
            ))}
          </div>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <TechPill key={t} label={t} index={i} />
            ))}
          </ul>

          <button
            type="button"
            onClick={onOpen}
            className=" mt-6 inline-flex items-center gap-2 self-start rounded-full border border-primary/30 px-4 py-2 text-sm font-medium text-primary/80 opacity-70 transition-all duration-300 group-hover:bg-primary/10 group-hover:opacity-100 group-hover:shadow-glow"
          >
            View Details
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </motion.article>
    </motion.div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative w-full py-28 md:py-36"
    >
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
            My Work
          </p>
          <h2
            id="projects-title"
            className="text-balance text-4xl font-semibold leading-[1.05] md:text-6xl"
          >
            Projects I&apos;ve Built
          </h2>
          <p className="mt-6 text-balance text-sm leading-relaxed text-muted-foreground md:text-base">
            A selection of products, platforms, and applications I&apos;ve worked on across SaaS,
            CRM, secure file sharing, and business automation.
          </p>
          <div
            aria-hidden
            className="mt-8 h-px w-40 bg-primary"
            style={{
              boxShadow:
                "0 0 18px color-mix(in oklab, var(--primary) 70%, transparent), 0 0 40px color-mix(in oklab, var(--primary) 35%, transparent)",
            }}
          />
        </motion.div>

        <div className="mt-16 md:mt-20">
          <JadwelnyProject />
        </div>

        <div className="mt-8 md:mt-10">
          <FeaturedProject />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-10">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} onOpen={() => setOpen(p)} />
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto border-border bg-card/95 backdrop-blur-xl sm:max-w-2xl">
          {open && (
            <>
              <div className="overflow-hidden rounded-xl border border-primary/20">
                <div className="aspect-[16/9] w-full">
                  <ProjectVisual variant={open.variant} image={open.image} />
                </div>
              </div>
              <DialogHeader className="mt-4 text-left">
                <p className="text-[11px] uppercase tracking-[0.2em] text-primary">
                  {open.category}
                </p>
                <DialogTitle className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {open.name}
                </DialogTitle>
                <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                  {open.description}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-wrap gap-2">
                {open.badges.map((b) => (
                  <MetricBadge key={b}>{b}</MetricBadge>
                ))}
              </div>

              <div>
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
                  <Layers3 className="h-3.5 w-3.5" aria-hidden />
                  Key Contributions
                </p>
                <ul className="mt-3 space-y-2.5">
                  {open.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary">Technologies</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {open.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
