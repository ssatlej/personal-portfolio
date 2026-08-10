import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { RoleSwitcher } from "./RoleSwitcher";
import { HeroVisual } from "./HeroVisual";
import resume from "@/assets/pdf/resume.pdf";

const ease = [0.16, 1, 0.3, 1] as const;

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "Email", href: "mailto:satlej.portfolio@gmail.com", Icon: Mail },
  { label: "Download resume", href: resume, Icon: Download, download: true },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const [typingStarted, setTypingStarted] = useState(false);

  // Start the role typewriter only after the name animation settles.
  useEffect(() => {
    const t = setTimeout(() => setTypingStarted(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="radial-glow hero-grid relative flex min-h-screen items-center overflow-hidden py-32 md:py-24"
    >
      <div className="container-page relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.14 } } }}
            className="max-w-2xl"
          >
            <motion.p
              variants={item}
              className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.28em] text-primary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
              Hello, I&apos;m
            </motion.p>

            <motion.h1
              variants={item}
              id="home-title"
              className="mt-7 text-balance font-display text-5xl font-semibold leading-[0.98] sm:text-6xl md:text-7xl"
            >
              Satlej <span className="text-primary text-glow">Sunil</span>
            </motion.h1>

            <motion.div variants={item} className="mt-5">
              <RoleSwitcher start={typingStarted} />
            </motion.div>

            <motion.p
              variants={item}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Full Stack Developer with 3+ years of experience building scalable web applications,
              SaaS platforms, and high-performance digital experiences using React, Next.js,
              Node.js, TypeScript, and modern cloud technologies.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToId("projects")}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                View Projects
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollToId("contact")}
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Contact Me
              </button>
            </motion.div>

            <motion.ul variants={item} className="mt-12 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon, download }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(download ? { download: true } : { target: "_blank", rel: "noreferrer" })}
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Icon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <HeroVisual />
        </div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToId("about")}
        aria-label="Scroll to next section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </motion.button>
    </section>
  );
}
