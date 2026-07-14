"use client";

import { useEffect, useRef } from "react";

/**
 * EmberField — the page's one signature visual.
 *
 * A field of faint embers drifts upward from the bottom of the hero and,
 * as each one nears the top of its life, it cools from a warm ember glow
 * to a still white point of light before fading out — a quiet visual
 * translation of the page's whole argument: what burns can instead
 * settle into something that lasts.
 *
 * Kept deliberately restrained: low particle count, low opacity, slow
 * motion, no interaction required. Disabled entirely for users who
 * prefer reduced motion.
 */
export default function EmberField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    type Particle = {
      x: number;
      y: number;
      r: number;
      speed: number;
      drift: number;
      driftPhase: number;
      life: number;
      maxLife: number;
    };

    const count = 24;
    const particles: Particle[] = Array.from({ length: count }, () =>
      spawn(true)
    );

    function spawn(initial = false): Particle {
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : height + Math.random() * 40,
        r: 0.5 + Math.random() * 1.4,
        speed: 4 + Math.random() * 6,
        drift: 6 + Math.random() * 10,
        driftPhase: Math.random() * Math.PI * 2,
        life: initial ? Math.random() : 0,
        maxLife: 16 + Math.random() * 10,
      };
    }

    let raf = 0;
    let last = performance.now();
    let isVisible = true;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.life += dt;
        const t = p.life / p.maxLife;

        if (t >= 1) {
          Object.assign(p, spawn(false));
          continue;
        }

        p.y -= (p.speed * dt) / 4;
        p.driftPhase += dt * 0.6;
        const x = p.x + Math.sin(p.driftPhase) * p.drift * 0.05;

        // Cool from ember-orange to soft white as the particle rises.
        const warmth = 1 - t;
        const r = 255;
        const g = Math.round(140 + 115 * (1 - warmth));
        const b = Math.round(90 + 165 * (1 - warmth));

        // Fade in, hold, fade out.
        const alphaIn = Math.min(t / 0.12, 1);
        const alphaOut = Math.min((1 - t) / 0.25, 1);
        const alpha = Math.min(alphaIn, alphaOut) * 0.32;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isVisible) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    // The field only ever renders inside the hero, so there's no reason
    // to keep painting once the user has scrolled past it.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          last = performance.now();
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      resize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
