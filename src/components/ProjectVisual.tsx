/**
 * Abstract, non-deceptive project visuals.
 *
 * These are deliberately schematic (no fake browser chrome, no fabricated
 * screenshots). To swap in a real screenshot later, pass `image` — the
 * abstract art is only used as a fallback.
 */
type ProjectVisualProps = {
  variant: "secure" | "saas" | "gov" | "crm";
  image?: string | undefined;
  alt?: string;
  className?: string;
};

export function ProjectVisual({ variant, image, alt = "", className = "" }: ProjectVisualProps) {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`relative h-full w-full overflow-hidden bg-[color-mix(in_oklab,var(--background)_92%,var(--primary))] ${className}`}
    >
      {/* grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--primary) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--primary) 8%, transparent) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(80% 70% at 50% 45%, black 0%, transparent 100%)",
        }}
      />
      {/* ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 55% at 50% 45%, color-mix(in oklab, var(--primary) 20%, transparent) 0%, transparent 70%)",
        }}
      />
      <svg
        viewBox="0 0 400 240"
        className="relative h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`pv-stroke-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--glow)" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <g
          fill="none"
          stroke={`url(#pv-stroke-${variant})`}
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          {variant === "secure" && (
            <>
              <rect x="150" y="86" width="100" height="76" rx="14" />
              <path d="M172 86v-16a28 28 0 0156 0v16" />
              <circle cx="200" cy="120" r="7" />
              <path d="M200 127v14" />
              <path d="M150 124H74M250 124h76" strokeDasharray="6 8" />
              <rect x="34" y="98" width="40" height="52" rx="8" />
              <rect x="326" y="98" width="40" height="52" rx="8" />
              <path
                d="M44 112h20M44 124h20M44 136h12M336 112h20M336 124h20M336 136h12"
                opacity="0.55"
              />
              <path d="M96 40h60M96 52h34M244 188h60M270 200h34" opacity="0.4" />
            </>
          )}
          {variant === "saas" && (
            <>
              <rect x="40" y="46" width="130" height="148" rx="12" />
              <path d="M40 78h130M62 100h60M62 118h86M62 136h44" opacity="0.5" />
              <rect x="192" y="46" width="168" height="66" rx="12" />
              <rect x="192" y="128" width="78" height="66" rx="12" />
              <rect x="282" y="128" width="78" height="66" rx="12" />
              <path d="M210 92l28-24 22 18 34-30 44 24" />
              <circle cx="238" cy="68" r="3.5" />
              <circle cx="294" cy="56" r="3.5" />
            </>
          )}
          {variant === "gov" && (
            <>
              <circle cx="200" cy="120" r="58" />
              <circle cx="200" cy="120" r="34" opacity="0.5" />
              <path d="M183 120l12 12 23-25" strokeWidth="2" />
              <path d="M200 62V30M200 210v-32M142 120H98M302 120h-44" strokeDasharray="5 9" />
              <rect x="52" y="86" width="46" height="68" rx="8" opacity="0.7" />
              <rect x="302" y="86" width="46" height="68" rx="8" opacity="0.7" />
              <path
                d="M62 104h26M62 118h26M62 132h16M312 104h26M312 118h26M312 132h16"
                opacity="0.45"
              />
            </>
          )}
          {variant === "crm" && (
            <>
              <rect x="46" y="54" width="94" height="132" rx="12" />
              <rect x="156" y="54" width="94" height="60" rx="12" />
              <rect x="156" y="126" width="94" height="60" rx="12" />
              <rect x="266" y="54" width="88" height="132" rx="12" />
              <path
                d="M64 82h58M64 100h40M64 118h58M174 78h58M174 150h40M284 82h52M284 100h52M284 118h30M284 140h52"
                opacity="0.45"
              />
              <path d="M284 168l18-16 14 12 22-22" strokeWidth="2" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}
