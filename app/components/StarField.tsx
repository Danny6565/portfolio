"use client";
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  trailLen: number;
  life: number;
  maxLife: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];
    const meteors: Meteor[] = [];
    // first meteor after ~1.5s, then every 4–8s
    let nextMeteor = 90;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        r: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.004,
      }));
    }

    function spawnMeteor() {
      const w = canvas!.width;
      const h = canvas!.height;
      // Start in the upper portion, slightly left of center
      const x = w * 0.1 + Math.random() * w * 0.7;
      const y = h * 0.05 + Math.random() * h * 0.35;
      // ~25–45° below horizontal, travelling right
      const angle = (25 + Math.random() * 20) * (Math.PI / 180);
      const speed = 2.5 + Math.random() * 2;
      meteors.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        trailLen: 35 + Math.random() * 30,
        life: 0,
        maxLife: 55 + Math.floor(Math.random() * 30),
      });
    }

    function drawMeteors() {
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const progress = m.life / m.maxLife;

        // Envelope: fade in first 20%, hold, fade out last 35%
        const alpha =
          progress < 0.2
            ? progress / 0.2
            : progress > 0.65
            ? (1 - progress) / 0.35
            : 1;

        const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.trailLen;
        const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.trailLen;

        const grad = ctx!.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(1, `rgba(255,255,255,${(alpha * 0.45).toFixed(3)})`);

        ctx!.save();
        ctx!.beginPath();
        ctx!.moveTo(tailX, tailY);
        ctx!.lineTo(m.x, m.y);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 0.8;
        ctx!.stroke();
        ctx!.restore();

        // Advance
        m.x += m.vx;
        m.y += m.vy;
        m.life++;
        if (m.life >= m.maxLife) meteors.splice(i, 1);
      }
    }

    let t = 0;
    function draw() {
      t++;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Twinkling stars
      for (const s of stars) {
        const alpha = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx!.fill();
      }

      // Meteor spawner
      nextMeteor--;
      if (nextMeteor <= 0) {
        spawnMeteor();
        nextMeteor = Math.floor((4 + Math.random() * 4) * 60);
      }

      drawMeteors();

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
