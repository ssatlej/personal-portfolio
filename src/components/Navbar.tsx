import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { SECTIONS, useActiveSection } from "@/lib/sections";
import resume from "@/assets/pdf/resume.pdf";

const IDS = SECTIONS.map((s) => s.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const active = useActiveSection(IDS);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={[
          "border-b transition-all duration-500",
          scrolled
            ? "border-border bg-background/60 backdrop-blur-2xl"
            : "border-transparent bg-transparent backdrop-blur-0",
        ].join(" ")}
      >
        <nav
          aria-label="Primary"
          className={[
            "container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 transition-all duration-500 md:flex md:justify-between",
            scrolled ? "h-16" : "h-24",
          ].join(" ")}
        >
          <a
            href="#home"
            className="min-w-0 truncate font-display text-lg font-semibold tracking-[0.28em] text-foreground transition-colors hover:text-primary"
          >
            SATLEJ
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full border border-primary/30 bg-primary/10 shadow-glow"
                      />
                    )}
                    <span className="relative z-10">{s.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={resume}
              download
              className="hidden items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/20 hover:shadow-glow sm:inline-flex"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/40 hover:text-primary md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden border-b border-border bg-background/90 backdrop-blur-2xl md:hidden"
      >
        <ul className="container-page flex flex-col gap-1 py-4">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className={[
                  "block rounded-2xl px-4 py-3 text-sm transition-colors",
                  active === s.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              download
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  );
}
