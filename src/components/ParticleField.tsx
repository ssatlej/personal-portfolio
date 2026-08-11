import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
};

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let particles: Particle[] = [];
    const pointer = { x: 0, y: 0 };
    const parallax = { x: 0, y: 0 };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.round((width * height) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.5,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.18 + 0.03),
        a: Math.random() * 0.35 + 0.08,
      }));
    };

    const draw = () => {
      parallax.x += (pointer.x - parallax.x) * 0.04;
      parallax.y += (pointer.y - parallax.y) * 0.04;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }
        const px = p.x + parallax.x * (p.r * 8);
        const py = p.y + parallax.y * (p.r * 8);
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.a})`;
        ctx.shadowColor = "rgba(34, 211, 238, 0.6)";
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      raf = window.requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    build();
    draw();
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} className="h-full w-full opacity-70" />
      <div className="absolute left-1/2 top-[-10%] h-[520px] w-[900px] max-w-[120vw] -translate-x-1/2 rounded-full bg-primary/8 blur-[140px]" />
      <div className="absolute bottom-[-15%] right-[-10%] h-[420px] w-[620px] rounded-full bg-accent/6 blur-[150px]" />
    </div>
  );
}
