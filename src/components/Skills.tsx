import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { TechMarquee } from "@/components/TechMarquee";
import type { Tech } from "@/types";
import reactLogo from "@/assets/images/react.svg";

const ease = [0.16, 1, 0.3, 1] as const;

import nextjsLogo from "@/assets/images/nextdotjs.svg";
import typescriptLogo from "@/assets/images/typescript.svg";
import javascriptLogo from "@/assets/images/javascript.svg";
import html5Logo from "@/assets/images/html5.svg";
import cssLogo from "@/assets/images/css.svg";
import tailwindLogo from "@/assets/images/tailwindcss.svg";
import bootstrapLogo from "@/assets/images/bootstrap.svg";
import muiLogo from "@/assets/images/mui.svg";
import sassLogo from "@/assets/images/sass.svg";
import viteLogo from "@/assets/images/vite.svg";

import nodejsLogo from "@/assets/images/nodedotjs.svg";
import expressLogo from "@/assets/images/express.svg";
import nestjsLogo from "@/assets/images/nestjs.svg";
import socketioLogo from "@/assets/images/socketdotio.svg";
import postgresqlLogo from "@/assets/images/postgresql.svg";
import mongodbLogo from "@/assets/images/mongodb.svg";
import mysqlLogo from "@/assets/images/mysql.svg";
import redisLogo from "@/assets/images/redis.svg";
import dockerLogo from "@/assets/images/docker.svg";

// import awsLogo from "@/assets/images/aws.svg";
import nginxLogo from "@/assets/images/nginx.svg";
import linuxLogo from "@/assets/images/linux.svg";
import gitLogo from "@/assets/images/git.svg";
import githubLogo from "@/assets/images/github.svg";
import cursorLogo from "@/assets/images/cursor.svg";
import claudeLogo from "@/assets/images/claude.svg";
import stripeLogo from "@/assets/images/stripe.svg";

export const ROW_1: Tech[] = [
  { name: "React.js", logo: reactLogo },
  { name: "Next.js", logo: nextjsLogo },
  { name: "TypeScript", logo: typescriptLogo },
  { name: "JavaScript", logo: javascriptLogo },
  { name: "HTML5", logo: html5Logo },
  { name: "CSS3", logo: cssLogo },
  { name: "Tailwind CSS", logo: tailwindLogo },
  { name: "Bootstrap", logo: bootstrapLogo },
  { name: "Material UI", logo: muiLogo },
  { name: "SCSS", logo: sassLogo },
  { name: "Vite", logo: viteLogo },
];

export const ROW_2: Tech[] = [
  { name: "Node.js", logo: nodejsLogo },
  { name: "Express.js", logo: expressLogo },
  { name: "Nest.js", logo: nestjsLogo },
  { name: "Socket.IO", logo: socketioLogo },
  { name: "PostgreSQL", logo: postgresqlLogo },
  { name: "MongoDB", logo: mongodbLogo },
  { name: "MySQL", logo: mysqlLogo },
  { name: "Redis", logo: redisLogo },
  { name: "Docker", logo: dockerLogo },
];

export const ROW_3: Tech[] = [
  { name: "AWS" },
  { name: "Nginx", logo: nginxLogo },
  { name: "Linux", logo: linuxLogo },
  { name: "Git", logo: gitLogo },
  { name: "GitHub", logo: githubLogo },
  { name: "Cursor AI", logo: cursorLogo },
  { name: "Claude Code", logo: claudeLogo },
  { name: "Stripe", logo: stripeLogo },
  { name: "SendGrid" }, // no logo in original data — renders monogram fallback
];

export function Skills() {
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
