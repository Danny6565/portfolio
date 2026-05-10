"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let targetX = -999;
    let targetY = -999;
    let currentX = targetX;
    let currentY = targetY;
    let animId: number;

    function animate() {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      el!.style.transform = `translate(${currentX}px, ${currentY}px)`;
      animId = requestAnimationFrame(animate);
    }

    function onMove(e: MouseEvent) {
      targetX = e.clientX - 300;
      targetY = e.clientY - 300;
    }

    animate();
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{
        background:
          "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)",
        zIndex: 2,
      }}
    />
  );
}
