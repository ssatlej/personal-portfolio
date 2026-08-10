import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Award,
  Braces,
  BriefcaseBusiness,
  CalendarClock,
  CircleCheck,
  Cpu,
  GraduationCap,
  Layers,
  Layout,
  MapPin,
  Server,
  Sparkles,
} from "lucide-react";
import { AboutPortrait } from "@/components/AboutPortrait";

const ease = [0.16, 1, 0.3, 1] as const;

type Stat = {
  icon: typeof Award;
  value: string;
  count?: number;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { icon: CalendarClock, value: "3+", count: 3, suffix: "+", label: "Years Experience" },
  { icon: Layers, value: "15+", count: 15, suffix: "+", label: "Projects Delivered" },
  { icon: Cpu, value: "MERN", label: "Specialization" },
  { icon: MapPin, value: "Dubai", label: "Currently Working" },
];

const HIGHLIGHTS = [
  {
    icon: Layout,
    title: "Frontend Excellence",
    description:
      "Building responsive, accessible and high-performance user interfaces using React, Next.js and modern UI technologies.",
  },
  {
    icon: Server,
    title: "Backend Engineering",
    description:
      "Developing scalable APIs, secure authentication systems and cloud-ready backend architectures using Node.js, Express.js and PostgreSQL.",
  },
  {
    icon: Braces,
    title: "Problem Solver",
    description:
      "Passionate about turning business ideas into reliable software products through clean architecture, performance optimization and thoughtful user experience.",
  },
];

const INFO = [
  { icon: MapPin, label: "Location", value: "Dubai, UAE" },
  { icon: BriefcaseBusiness, label: "Experience", value: "3+ Years" },
  { icon: GraduationCap, label: "Education", value: "B.Tech Computer Science" },
  { icon: CircleCheck, label: "Availability", value: "Open to Opportunities" },
];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string | undefined }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function About() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative w-full bg-surface/60 py-28 md:py-36"
    >
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            About Me
          </p>
          <h2
            id="about-title"
            className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] md:text-6xl"
          >
            Turning Ideas Into Scalable Digital Products
          </h2>
          <div
            aria-hidden
            className="mt-8 h-px w-40 bg-primary"
            style={{
              boxShadow:
                "0 0 18px color-mix(in oklab, var(--primary) 70%, transparent), 0 0 40px color-mix(in oklab, var(--primary) 35%, transparent)",
            }}
          />
        </motion.div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:items-start lg:gap-20">
          <AboutPortrait />

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
          >
            <h3 className="text-3xl font-semibold md:text-4xl">
              Hi, I&apos;m <span className="text-primary text-glow">Satlej Sunil.</span>
            </h3>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              I am a Full Stack Developer with over 3 years of experience building scalable SaaS
              platforms, enterprise applications, and high-performance web experiences. My expertise
              spans frontend development with React.js and Next.js, backend development with Node.js
              and Express.js, cloud deployment, payment integrations, and scalable software
              architecture. I enjoy solving complex engineering challenges while creating intuitive
              user experiences.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                  className="surface-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
                >
                  <stat.icon className="h-5 w-5 text-primary" aria-hidden />
                  <p className="mt-4 font-display text-2xl font-semibold md:text-3xl">
                    {stat.count ? <CountUp to={stat.count} suffix={stat.suffix} /> : stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3">
          {HIGHLIGHTS.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease, delay: i * 0.12 }}
              className="surface-panel group p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/25 bg-primary/8 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <h4 className="mt-5 text-lg font-semibold">{item.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {INFO.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 border-t border-border pt-5"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card/60 text-primary">
                <item.icon className="h-4.5 w-4.5" aria-hidden />
              </span>
              <div className="min-w-0">
                <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="mt-1 truncate text-sm font-medium">{item.value}</dd>
              </div>
            </div>
          ))}
        </motion.dl>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease }}
          className="mt-14"
        >
          <button
            type="button"
            onClick={scrollToContact}
            className="group inline-flex items-center gap-2 rounded-full border border-primary/45 px-8 py-3.5 text-sm font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Let&apos;s Work Together
            <Award
              className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
              aria-hidden
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
