import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { TechMarquee, type Tech } from "@/components/TechMarquee";

const ease = [0.16, 1, 0.3, 1] as const;

const si = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

const ROW_1: Tech[] = [
  { name: "React.js", logo: si("react") },
  { name: "Next.js", logo: si("nextdotjs/FFFFFF") },
  { name: "TypeScript", logo: si("typescript") },
  { name: "JavaScript", logo: si("javascript") },
  { name: "HTML5", logo: si("html5") },
  { name: "CSS3", logo: si("css") },
  { name: "Tailwind CSS", logo: si("tailwindcss") },
  { name: "Bootstrap", logo: si("bootstrap") },
  { name: "Material UI", logo: si("mui") },
  { name: "SCSS", logo: si("sass") },
  { name: "Vite", logo: si("vite") },
];

const ROW_2: Tech[] = [
  { name: "Node.js", logo: si("nodedotjs") },
  { name: "Express.js", logo: si("express/FFFFFF") },
  { name: "Nest.js", logo: si("nestjs") },
  { name: "Socket.IO", logo: si("socketdotio/FFFFFF") },
  { name: "PostgreSQL", logo: si("postgresql") },
  { name: "MongoDB", logo: si("mongodb") },
  { name: "MySQL", logo: si("mysql") },
  { name: "Redis", logo: si("redis") },
  { name: "Docker", logo: si("docker") },
];

const ROW_3: Tech[] = [
  {
    name: "AWS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  },
  { name: "Nginx", logo: si("nginx") },
  { name: "Linux", logo: si("linux/FFFFFF") },
  { name: "Git", logo: si("git") },
  { name: "GitHub", logo: si("github/FFFFFF") },
  { name: "Cursor AI", logo: si("cursor/FFFFFF") },
  { name: "Claude Code", logo: si("claude") },
  { name: "Stripe", logo: si("stripe/635BFF") },
  { name: "SendGrid" },
];

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
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
        </motion.div>
      </div>

      <div className="relative z-10 mt-16 flex flex-col gap-3 md:mt-20 md:gap-5">
        <TechMarquee items={ROW_1} direction="left" duration={42} tilt={-2} />
        <TechMarquee items={ROW_2} direction="right" duration={38} tilt={2} delay={0.1} />
        <TechMarquee items={ROW_3} direction="left" duration={46} tilt={-2} delay={0.2} />
      </div>
    </section>
  );
}
