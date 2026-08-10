import { AnimatePresence, motion, useScroll, useSpring, useTransform, useInView } from "motion/react";
import { useId, useRef, useState } from "react";
import {
  Building2,
  CalendarDays,
  ChevronDown,
  MapPin,
  Sparkles,
  Layers3,
  CheckCircle2,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

type Project = {
  name: string;
  kind: string;
  description: string;
  highlights: string[];
};

type Experience = {
  company: string;
  location: string;
  role: string;
  dates: string;
  current?: boolean;
  summary: string;
  label: string;
  highlights: string[];
  stack: string[];
  keyStack: string[];
  projects?: Project[];
};

const EXPERIENCES: Experience[] = [
  {
    company: "Jadwelny",
    location: "Dubai, UAE",
    role: "Software Developer",
    dates: "April 2025 – Present",
    current: true,
    summary:
      "Working across frontend, backend, infrastructure, integrations, and production systems for a high-traffic, real-time travel booking platform.",
    label: "End-to-End Engineering",
    highlights: [
      "Led end-to-end development of a high-traffic, real-time travel booking platform across frontend, backend, and production infrastructure.",
      "Designed and implemented scalable RESTful APIs using Node.js and Express.js for booking workflows, external integrations, and real-time data processing.",
      "Built a high-performance Next.js frontend focused on SEO, page-load optimization, responsive interfaces, reusable components, dynamic forms, and interactive dashboards.",
      "Integrated fintech payment systems including Stripe, Tabby, and PayBy, handling transactions, webhooks, retries, and failure scenarios.",
      "Integrated multiple B2B APIs for hotels, flights, and visa services to support real-time pricing, availability, and booking operations.",
      "Used PostgreSQL and Redis for database operations, caching, and session management to improve performance on high-traffic booking endpoints.",
      "Deployed and maintained production systems using Hetzner Cloud, AWS EC2, Nginx, Linux, Docker, and SSL/TLS.",
      "Implemented Arabic-English localization with full LTR/RTL support.",
    ],
    keyStack: ["Next.js", "Node.js", "PostgreSQL", "AWS", "Docker", "Stripe"],
    stack: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "Nest.js",
      "PostgreSQL",
      "MongoDB",
      "TypeScript",
      "REST APIs",
      "Nginx",
      "Linux",
      "Stripe",
      "Tabby",
      "PayBy",
      "Hetzner Cloud",
      "AWS",
      "AWS EC2",
      "Docker",
      "Redis",
      "Git",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    company: "SRV IT Hub Private Limited",
    location: "Kannur, Kerala, India",
    role: "Full Stack Developer (MERN)",
    dates: "November 2023 – February 2025",
    summary:
      "Developed and maintained multiple end-to-end web applications and SaaS platforms across frontend, backend, architecture, and deployment.",
    label: "Full-Stack Development",
    highlights: [
      "Developed and maintained multiple end-to-end web applications and SaaS platforms covering frontend, backend, and deployment.",
      "Designed and implemented scalable REST APIs and integrated them with responsive React.js and Next.js applications.",
      "Built server-rendered Next.js applications with a strong focus on SEO, performance, and server-side rendering.",
      "Led backend architecture and infrastructure for multiple SaaS platforms and high-traffic web applications.",
      "Implemented multi-tenant architecture with secure data isolation and scalable backend systems for multiple clients.",
      "Configured and deployed applications using Nginx and AWS with a focus on security, optimization, and production readiness.",
    ],
    keyStack: ["React.js", "Next.js", "Node.js", "MongoDB", "AWS"],
    stack: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "TypeScript",
      "REST APIs",
      "AWS",
      "Nginx",
      "Git",
      "Material UI",
      "Bootstrap",
      "CSS",
      "SCSS",
    ],
    projects: [
      {
        name: "SRV Social",
        kind: "SaaS CRM Platform",
        description:
          "Solely developed the system architecture including Admin CRM and Client CRM modules, with a multi-tenant backend and frontend architecture for client management and analytics.",
        highlights: ["Multi-Tenant SaaS"],
      },
      {
        name: "ASAP Kerala",
        kind: "Kerala Government Initiative",
        description:
          "Developed full-stack features supporting over 6,000 leads within six months, including assessment, ranking, certification, and real-time UI modules.",
        highlights: ["6,000+ Leads"],
      },
      {
        name: "SMOTPRO",
        kind: "Website + CRM System",
        description:
          "Built Sales, Marketing, and HRMS modules across frontend and backend, while integrating external platforms and automating business workflows.",
        highlights: ["500+ Leads / Week", "50%+ Operational Efficiency"],
      },
    ],
  },
];

function TechPills({ stack, keyStack }: { stack: string[]; keyStack: string[] }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.025, delayChildren: 0.35 } } }}
      className="mt-7 flex flex-wrap gap-2"
    >
      {stack.map((tech) => {
        const important = keyStack.includes(tech);
        return (
          <motion.li
            key={tech}
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.35, ease }}
            className={[
              "rounded-full border px-3 py-1.5 text-xs transition-all duration-300 hover:-translate-y-0.5",
              important
                ? "border-primary/45 bg-primary/10 font-medium text-primary hover:shadow-glow"
                : "border-border bg-card/50 text-muted-foreground hover:border-primary/30 hover:text-foreground",
            ].join(" ")}
          >
            {tech}
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

function ExperienceCard({ exp }: { exp: Experience }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="surface-panel group/card relative overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow md:p-9">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--primary) 12%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/8 text-primary">
            <Building2 className="h-5 w-5" aria-hidden />
          </span>
          <h3 className="text-2xl font-semibold md:text-3xl">{exp.company}</h3>
          {exp.current && (
            <span
              className="rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-primary"
              style={{
                boxShadow:
                  "0 0 18px color-mix(in oklab, var(--primary) 45%, transparent)",
              }}
            >
              Current Role
            </span>
          )}
        </div>

        <p className="mt-4 text-lg font-medium text-primary">{exp.role}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary/70" aria-hidden />
            {exp.dates}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary/70" aria-hidden />
            {exp.location}
          </span>
        </div>

        <div className="mt-7 rounded-2xl border border-border bg-card/40 p-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3 w-3" aria-hidden />
            {exp.label}
          </span>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {exp.summary}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group/toggle mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {open ? "Hide details" : "View details"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="overflow-hidden"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
                className="mt-7 space-y-3.5"
              >
                {exp.highlights.map((h) => (
                  <motion.li
                    key={h}
                    variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.45, ease }}
                    className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span>{h}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {exp.projects && (
                <div className="mt-9">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-primary">
                    <Layers3 className="h-3.5 w-3.5" aria-hidden />
                    Selected Work
                  </p>
                  <div className="mt-5 grid gap-4">
                    {exp.projects.map((p, i) => (
                      <motion.article
                        key={p.name}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.08 }}
                        className="rounded-2xl border border-border bg-card/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35"
                      >
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h4 className="text-base font-semibold">{p.name}</h4>
                          <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                            {p.kind}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {p.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.highlights.map((h) => (
                            <span
                              key={h}
                              className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              )}

              <TechPills stack={exp.stack} keyStack={exp.keyStack} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

function TimelineItem({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-6 lg:grid-cols-2 lg:gap-0"
    >
      {/* Node column (mobile/tablet) */}
      <div className="relative flex justify-center lg:hidden">
        <span className="relative mt-9 block h-4 w-4 shrink-0 rounded-full border border-primary bg-background">
          <span
            className="absolute inset-0.5 rounded-full bg-primary"
            style={{ boxShadow: "0 0 16px color-mix(in oklab, var(--primary) 80%, transparent)" }}
          />
          <span className="absolute -inset-1.5 animate-ping rounded-full border border-primary/40" />
        </span>
      </div>

      {/* Node (desktop centered) */}
      <span className="absolute left-1/2 top-9 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border border-primary bg-background lg:block">
        <span
          className="absolute inset-0.5 rounded-full bg-primary"
          style={{ boxShadow: "0 0 20px color-mix(in oklab, var(--primary) 85%, transparent)" }}
        />
        <span className="absolute -inset-2 animate-ping rounded-full border border-primary/40" />
      </span>

      {isLeft ? (
        <>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="lg:pr-14"
          >
            <ExperienceCard exp={exp} />
          </motion.div>
          <div className="hidden lg:block" />
        </>
      ) : (
        <>
          <div className="hidden lg:block" />
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="lg:pl-14"
          >
            <ExperienceCard exp={exp} />
          </motion.div>
        </>
      )}
    </div>
  );
}

export function Experience() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative w-full bg-surface/60 py-28 md:py-36"
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
            My Journey
          </p>
          <h2
            id="experience-title"
            className="text-balance text-4xl font-semibold leading-[1.05] md:text-6xl"
          >
            Experience &amp; Engineering Journey
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
            Building production systems, scalable applications, and digital products across
            frontend, backend, infrastructure, and integrations.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative mt-16 md:mt-24">
          {/* Timeline rail */}
          <div
            aria-hidden
            className="absolute left-[7px] top-0 h-full w-px bg-border lg:left-1/2 lg:-translate-x-1/2"
          >
            <motion.div
              className="h-full w-full origin-top bg-primary"
              style={{
                scaleY,
                boxShadow:
                  "0 0 12px color-mix(in oklab, var(--primary) 70%, transparent), 0 0 30px color-mix(in oklab, var(--primary) 30%, transparent)",
              }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {EXPERIENCES.map((exp, i) => (
              <TimelineItem key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
