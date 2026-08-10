import { useId, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Github, Linkedin, Mail, Loader2, MapPin, Send } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const FORMSPREE_ENDPOINT = import.meta.env["VITE_FORMSPREE_ENDPOINT"] as string | undefined;

const LINKEDIN_URL = "https://www.linkedin.com/in/satlej-sunil";
const GITHUB_URL = "https://github.com/ssatlej";
const EMAIL_URL = "mailto:satlej.sunil@gmail.com";

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!values.subject.trim()) errors.subject = "Please enter a subject.";
  if (!values.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

const fieldClass =
  "w-full rounded-2xl border border-border bg-background/60 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/70 outline-none transition-all duration-300 focus:border-primary/70 focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_18%,transparent),0_0_24px_-6px_color-mix(in_oklab,var(--primary)_60%,transparent)]";

/** Decorative connected-nodes signal graphic. */
function NodeNetwork() {
  const nodes = [
    [20, 70],
    [70, 30],
    [120, 78],
    [170, 36],
    [220, 68],
    [268, 28],
  ] as const;
  return (
    <svg
      aria-hidden
      viewBox="0 0 288 100"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full opacity-[0.35]"
    >
      <polyline
        points={nodes.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1"
        strokeOpacity="0.35"
      />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="var(--primary)">
          <animate
            attributeName="opacity"
            values="0.25;1;0.25"
            dur="3.2s"
            begin={`${i * 0.35}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  secondary,
  href,
  delay,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  secondary?: string;
  href?: string;
  delay: number;
}) {
  const inner = (
    <>
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/5 text-primary transition-colors duration-300 group-hover:border-primary/50">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </span>
        <span className="mt-1 block truncate text-base font-medium text-foreground">{value}</span>
        {secondary && <span className="mt-1 block text-sm text-muted-foreground">{secondary}</span>}
      </span>
    </>
  );

  const base =
    "surface-panel group flex items-start gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className={base}>
          {inner}
          <ArrowRight
            className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
            aria-hidden
          />
        </a>
      ) : (
        <div className={base}>{inner}</div>
      )}
    </motion.div>
  );
}

export function Contact() {
  const uid = useId();
  const [values, setValues] = useState<Fields>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set =
    (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Honeypot: bots fill hidden fields.
    const honeypot = (e.currentTarget.elements.namedItem("company") as HTMLInputElement | null)
      ?.value;
    if (honeypot) return;

    setStatus("sending");
    try {
      if (!FORMSPREE_ENDPOINT) throw new Error("missing endpoint");
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request failed");
      setValues({ name: "", email: "", subject: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const field = (key: keyof Fields) => ({
    id: `${uid}-${key}`,
    name: key,
    value: values[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-error` : undefined,
  });

  const errorFor = (key: keyof Fields) =>
    errors[key] ? (
      <p id={`${uid}-${key}-error`} className="mt-2 text-sm text-destructive">
        <span aria-hidden>⚠ </span>
        {errors[key]}
      </p>
    ) : null;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
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
            <Send className="h-3.5 w-3.5" aria-hidden />
            Get in touch
          </p>
          <h2
            id="contact-title"
            className="text-balance text-4xl font-semibold leading-[1.05] md:text-6xl"
          >
            Let&apos;s Build Something <span className="text-primary text-glow">Great</span>
          </h2>
          <p className="mt-7 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Have a project in mind, an opportunity, or simply want to connect? I&apos;d love to hear
            from you.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:mt-20 lg:grid-cols-[1.25fr_0.85fr] lg:gap-10">
          {/* Availability — first on mobile, inside right column on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease }}
            className="order-1 lg:hidden"
          >
            <AvailabilityPill />
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease }}
            className="order-2 lg:order-1"
          >
            <form
              onSubmit={onSubmit}
              noValidate
              className="surface-panel p-6 shadow-elevated md:p-9"
              style={{
                boxShadow: "0 0 60px -30px color-mix(in oklab, var(--primary) 55%, transparent)",
              }}
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor={`${uid}-name`} className="mb-2 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    {...field("name")}
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    className={fieldClass}
                  />
                  {errorFor("name")}
                </div>
                <div>
                  <label htmlFor={`${uid}-email`} className="mb-2 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    {...field("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="Your email address"
                    className={fieldClass}
                  />
                  {errorFor("email")}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor={`${uid}-subject`} className="mb-2 block text-sm font-medium">
                  Subject
                </label>
                <input
                  {...field("subject")}
                  type="text"
                  placeholder="What would you like to discuss?"
                  className={fieldClass}
                />
                {errorFor("subject")}
              </div>

              <div className="mt-6">
                <label htmlFor={`${uid}-message`} className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  {...field("message")}
                  rows={7}
                  placeholder="Tell me about your project or opportunity..."
                  className={`${fieldClass} min-h-44 resize-y`}
                />
                {errorFor("message")}
              </div>

              {/* Honeypot */}
              <div aria-hidden className="hidden">
                <label htmlFor={`${uid}-company`}>Company</label>
                <input id={`${uid}-company`} name="company" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>

              <div aria-live="polite" className="mt-5 empty:mt-0">
                {status === "success" && (
                  <div className="rounded-2xl border border-primary/35 bg-primary/5 p-4 text-sm">
                    <p className="font-medium text-primary">Message sent successfully.</p>
                    <p className="mt-1 text-muted-foreground">
                      Thanks for reaching out — I&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                )}
                {status === "error" && (
                  <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
                    <span aria-hidden>⚠ </span>
                    Something went wrong while sending your message. Please try again.
                  </div>
                )}
              </div>
            </form>
          </motion.div>

          {/* Right column */}
          <div className="order-3 flex flex-col gap-4 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease }}
              className="hidden lg:block"
            >
              <AvailabilityPill />
            </motion.div>

            <InfoCard
              icon={MapPin}
              label="Based in"
              value="Dubai, UAE"
              secondary="Available for opportunities worldwide"
              delay={0.05}
            />
            <InfoCard
              icon={Linkedin}
              label="LinkedIn"
              value="Satlej Sunil"
              href={LINKEDIN_URL}
              delay={0.12}
            />
            <InfoCard
              icon={Github}
              label="GitHub"
              value="@ssatlej"
              href={GITHUB_URL}
              delay={0.19}
            />

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease, delay: 0.26 }}
              className="surface-panel relative mt-1 overflow-hidden p-6"
            >
              <NodeNetwork />
              <p className="relative z-10 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Connect
              </p>
              <ul className="relative z-10 mt-4 flex items-center gap-3">
                {[
                  { label: "GitHub", href: GITHUB_URL, Icon: Github },
                  { label: "LinkedIn", href: LINKEDIN_URL, Icon: Linkedin },
                  { label: "Gmail", href: EMAIL_URL, Icon: Mail },
                ].map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/40 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:text-primary hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Icon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AvailabilityPill() {
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-primary">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary shadow-glow" />
      </span>
      Open to opportunities
    </p>
  );
}
