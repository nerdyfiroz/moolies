"use client";

import React, { useEffect, useRef } from "react";

/**
 * RealisticRiverWater
 * Renders realistic animated 2D cartoon river water over the river body:
 * - Fluid sine wave caustics that flow continuously from left to right.
 * - Organic water swells, wave crest highlights, and depth light gradients.
 * - Twinkling sunlight reflections / specular glints drifting with the river current.
 * - Interactive ripples on mouse hover/click.
 * - Seamlessly blends with the underlying artwork using soft-light & overlay modes.
 */
export const RealisticRiverWater: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<{ x: number; y: number; radius: number; opacity: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Handle high-DPI displays
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle sparkles that drift with the current
    const sparkles = Array.from({ length: 24 }, () => ({
      x: Math.random() * 500,
      y: Math.random() * 70,
      size: 1 + Math.random() * 2.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 0.8,
    }));

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      time += 0.032;

      // ========================================================
      // 1. BASE WATER FLOW CAUSTICS (Harmonic sine waves moving Left to Right)
      // ========================================================
      // Wave layer 1: Top gentle shoreline current
      drawFluidWave(ctx, {
        width,
        height,
        yOffset: height * 0.22,
        amplitude: 2.2,
        wavelength: 75,
        speed: 1.8,
        time,
        color: "rgba(224, 242, 254, 0.45)",
        lineWidth: 2.0,
      });

      // Wave layer 2: Mid-river main current (slightly faster, undulating)
      drawFluidWave(ctx, {
        width,
        height,
        yOffset: height * 0.46,
        amplitude: 3.0,
        wavelength: 95,
        speed: 2.3,
        time: time + 1.2,
        color: "rgba(255, 255, 255, 0.55)",
        lineWidth: 2.4,
      });

      // Wave layer 3: Secondary mid-stream ripples
      drawFluidWave(ctx, {
        width,
        height,
        yOffset: height * 0.62,
        amplitude: 2.4,
        wavelength: 65,
        speed: 1.9,
        time: time + 3.1,
        color: "rgba(186, 230, 253, 0.5)",
        lineWidth: 1.8,
      });

      // Wave layer 4: Bottom shoreline gentle swell
      drawFluidWave(ctx, {
        width,
        height,
        yOffset: height * 0.82,
        amplitude: 2.0,
        wavelength: 85,
        speed: 1.5,
        time: time + 2.0,
        color: "rgba(255, 255, 255, 0.4)",
        lineWidth: 1.6,
      });

      // ========================================================
      // 2. CURVED WATER CAUSTIC GLEAMS (Organic drifting highlights)
      // ========================================================
      for (let i = 0; i < 7; i++) {
        const cx = ((i * 110 + time * 32) % (width + 120)) - 60;
        const cy = height * (0.28 + ((i * 17) % 55) / 100);
        const wLen = 35 + ((i * 13) % 25);
        const swell = Math.sin(time * 2 + i) * 2;

        ctx.beginPath();
        ctx.moveTo(cx, cy + swell);
        ctx.quadraticCurveTo(cx + wLen * 0.5, cy - 3.5 + swell, cx + wLen, cy + swell);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 + 0.25 * Math.sin(time * 3 + i)})`;
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // ========================================================
      // 3. SUNLIGHT WATER GLINTS / SPARKLES (Twinkling with the current)
      // ========================================================
      sparkles.forEach((s) => {
        // Drift smoothly left to right
        s.x = (s.x + s.speed) % width;
        const twinkle = Math.sin(time * 4 + s.phase);
        if (twinkle > 0.2) {
          const alpha = (twinkle - 0.2) * 0.9;
          const py = Math.min(Math.max(s.y, 4), height - 4);

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(s.x, py, s.size * 0.8, 0, Math.PI * 2);
          ctx.fill();

          // Tiny cross star glare
          if (twinkle > 0.7) {
            ctx.strokeStyle = `rgba(254, 240, 138, ${alpha * 0.8})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(s.x - 3, py);
            ctx.lineTo(s.x + 3, py);
            ctx.moveTo(s.x, py - 3);
            ctx.lineTo(s.x, py + 3);
            ctx.stroke();
          }
        }
      });

      // ========================================================
      // 4. INTERACTIVE RIPPLES
      // ========================================================
      const activeRipples = ripplesRef.current;
      for (let i = activeRipples.length - 1; i >= 0; i--) {
        const r = activeRipples[i];
        r.radius += 0.8;
        r.opacity -= 0.016;

        if (r.opacity <= 0) {
          activeRipples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity * 0.7})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        // Elliptical ripple matching isometric perspective of the lake
        ctx.ellipse(r.x, r.y, r.radius * 1.8, r.radius * 0.55, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handlePointerInteraction = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (ripplesRef.current.length < 8) {
      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        opacity: 0.9,
      });
    }
  };

  return (
    <div
      style={{
        left: "31.8%",
        top: "48.8%",
        width: "44.5%",
        height: "8.8%",
        borderRadius: "45% 45% 40% 40% / 60% 60% 30% 30%",
      }}
      className="absolute z-12 overflow-hidden pointer-events-auto cursor-pointer select-none"
      title="Gentle River — Click or hover to create water ripples"
    >
      {/* Soft Water Depth Atmosphere (Gentle shimmer, no harsh lines) */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400/15 via-cyan-300/10 to-teal-400/20 mix-blend-overlay pointer-events-none" />

      {/* Real-time HTML5 Fluid Water Canvas */}
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerInteraction}
        onClick={handlePointerInteraction}
        className="w-full h-full block"
      />
    </div>
  );
};

// Helper: draw continuous smooth fluid wave
function drawFluidWave(
  ctx: CanvasRenderingContext2D,
  options: {
    width: number;
    height: number;
    yOffset: number;
    amplitude: number;
    wavelength: number;
    speed: number;
    time: number;
    color: string;
    lineWidth: number;
  }
) {
  const { width, yOffset, amplitude, wavelength, speed, time, color, lineWidth } = options;

  ctx.beginPath();
  const step = 6;
  const startX = 0;
  const endX = width;

  for (let x = startX; x <= endX; x += step) {
    // Flowing sine equation from left to right: (x - speed * time)
    const wave =
      Math.sin((x / wavelength) * Math.PI * 2 - time * speed) * amplitude +
      Math.cos((x / (wavelength * 0.6)) * Math.PI * 2 - time * speed * 0.7) * (amplitude * 0.35);

    const y = yOffset + wave;

    if (x === startX) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.stroke();
}
