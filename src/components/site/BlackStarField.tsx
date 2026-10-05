import { useEffect, useRef } from "react";

const CONFIG = {
  desktopCount: 230,
  tabletCount: 165,
  mobileCount: 82,
  interactionRadius: 190,
  interactionStrength: 18,
  opacityBoost: 1.1,
  driftAmplitude: 15,
  maxPixelRatio: 1.5,
  mobileFrameInterval: 1000 / 26,
  tabletFrameInterval: 1000 / 45,
  desktopFrameInterval: 1000 / 60,
};

type BlackStar = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  depth: number;
  phase: number;
  twinkleSpeed: number;
  twinkleAmount: number;
  glossy: boolean;
  offsetX: number;
  offsetY: number;
};

export function BlackStarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, active: false, influence: 0 };
    let width = 0;
    let height = 0;
    let stars: BlackStar[] = [];
    let animationFrame = 0;
    let resizeFrame = 0;
    let lastDrawTime = 0;

    const createStars = (count: number) =>
      Array.from({ length: count }, () => {
        const glossy = Math.random() < 0.16;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: glossy ? Math.random() * 0.9 + 1.25 : Math.random() * 0.75 + 0.45,
          opacity: Math.random() * 0.24 + 0.14,
          depth: Math.random() * 0.85 + 0.15,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.001 + 0.0005,
          twinkleAmount: Math.random() < 0.12 ? Math.random() * 0.08 + 0.025 : 0,
          glossy,
          offsetX: 0,
          offsetY: 0,
        };
      });

    const draw = (time: number) => {
      const delta = lastDrawTime ? Math.min(time - lastDrawTime, 50) : 16;
      const easing = 1 - Math.exp(-delta * 0.009);
      lastDrawTime = time;
      pointer.influence += ((pointer.active ? 1 : 0) - pointer.influence) * easing;
      context.clearRect(0, 0, width, height);
      const darkMode = document.documentElement.classList.contains("dark");

      for (const star of stars) {
        let influence = 0;
        let targetX = 0;
        let targetY = 0;

        if (pointer.active && !reducedMotion.matches) {
          const deltaX = star.x - pointer.x;
          const deltaY = star.y - pointer.y;
          const distance = Math.hypot(deltaX, deltaY);
          if (distance < CONFIG.interactionRadius) {
            const proximity = 1 - distance / CONFIG.interactionRadius;
            influence = proximity * proximity * pointer.influence * star.depth;
            const safeDistance = Math.max(distance, 1);
            targetX = (deltaX / safeDistance) * influence * CONFIG.interactionStrength;
            targetY = (deltaY / safeDistance) * influence * CONFIG.interactionStrength;
          }
        }

        star.offsetX += (targetX - star.offsetX) * easing;
        star.offsetY += (targetY - star.offsetY) * easing;

        const driftX = Math.sin(time * 0.00028 + star.phase) * star.depth * CONFIG.driftAmplitude;
        const driftY =
          Math.cos(time * 0.00021 + star.phase * 1.31) * star.depth * CONFIG.driftAmplitude;
        const twinkle = Math.sin(time * star.twinkleSpeed + star.phase) * star.twinkleAmount;
        const opacity = Math.min(
          0.75,
          star.opacity * CONFIG.opacityBoost * (1 + influence * 0.75 + twinkle),
        );
        const x = star.x + star.offsetX + driftX;
        const y = star.y + star.offsetY + driftY;

        if (star.glossy) {
          const glow = context.createRadialGradient(x, y, 0, x, y, star.radius * 3.2);
          const glowColor = darkMode ? "230, 233, 240" : "20, 21, 23";
          glow.addColorStop(0, `rgba(${glowColor}, ${opacity * 0.2})`);
          glow.addColorStop(1, `rgba(${glowColor}, 0)`);
          context.beginPath();
          context.arc(x, y, star.radius * 3.2, 0, Math.PI * 2);
          context.fillStyle = glow;
          context.fill();
        }

        const sphere = context.createRadialGradient(
          x - star.radius * 0.35,
          y - star.radius * 0.4,
          0,
          x,
          y,
          star.radius,
        );
        sphere.addColorStop(
          0,
          `rgba(255, 255, 255, ${star.glossy ? opacity * 0.82 : opacity * 0.2})`,
        );
        sphere.addColorStop(0.18, `rgba(${darkMode ? "220, 225, 235" : "44, 45, 47"}, ${opacity})`);
        sphere.addColorStop(
          1,
          `rgba(${darkMode ? "160, 170, 190" : "8, 9, 10"}, ${opacity * 0.76})`,
        );
        context.beginPath();
        context.arc(x, y, star.radius, 0, Math.PI * 2);
        context.fillStyle = sphere;
        context.fill();
      }
    };

    const stopAnimation = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const animate = (time: number) => {
      animationFrame = 0;
      if (document.hidden) return;

      const frameInterval =
        width <= 640
          ? CONFIG.mobileFrameInterval
          : width <= 1024
            ? CONFIG.tabletFrameInterval
            : CONFIG.desktopFrameInterval;
      if (!lastDrawTime || time - lastDrawTime >= frameInterval) draw(time);
      animationFrame = window.requestAnimationFrame(animate);
    };

    const resize = () => {
      width = document.documentElement.clientWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, CONFIG.maxPixelRatio);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const count =
        width <= 640
          ? CONFIG.mobileCount
          : width <= 1024
            ? CONFIG.tabletCount
            : CONFIG.desktopCount;
      stars = createStars(count);
      pointer.x = width * 0.5;
      pointer.y = height * 0.5;
      lastDrawTime = 0;
      stopAnimation();
      draw(performance.now());
      if (!document.hidden && !reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reducedMotion.matches) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      if (!animationFrame && !document.hidden) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) pointer.active = false;
    };

    const onVisibilityChange = () => {
      if (document.hidden) stopAnimation();
      else if (!reducedMotion.matches) animationFrame = window.requestAnimationFrame(animate);
    };

    const onMotionPreferenceChange = () => {
      stopAnimation();
      if (!reducedMotion.matches && !document.hidden) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        draw(performance.now());
      }
    };

    const scheduleResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(resize);
    };

    resize();
    window.addEventListener("resize", scheduleResize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onMotionPreferenceChange);

    return () => {
      stopAnimation();
      window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", scheduleResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
    />
  );
}
