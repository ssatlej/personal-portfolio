import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const ROLES = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "MERN Stack Developer",
  "Software Engineer",
];

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 1800;

/** Professional typewriter role switcher — no flashing, respects reduced motion. */
export function RoleSwitcher({ start = true }: { start?: boolean }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!start || reduced) return;
    const full = ROLES[index] ?? ROLES[0]!;

    if (!deleting && text === full) {
      const t = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % ROLES.length);
      return;
    }
    const t = setTimeout(
      () =>
        setText((prev) =>
          deleting ? full.slice(0, prev.length - 1) : full.slice(0, prev.length + 1),
        ),
      deleting ? DELETE_MS : TYPE_MS,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, start, reduced]);

  return (
    <p
      className="flex min-h-[1.3em] items-baseline text-2xl font-medium text-primary md:text-4xl"
      aria-live="polite"
      aria-label={`Role: ${ROLES[index]}`}
    >
      <span className="font-display tracking-tight">
        {reduced ? ROLES[0] : text}
      </span>
      {!reduced && (
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [1, 1, 0.15, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          className="ml-1 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-primary"
        />
      )}
    </p>
  );
}
