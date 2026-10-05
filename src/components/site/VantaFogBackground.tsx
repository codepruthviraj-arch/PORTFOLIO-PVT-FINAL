import { useEffect, useRef } from "react";

const THREE_URL = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
const VANTA_FOG_URL = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js";

type VantaFogOptions = {
  el: HTMLElement;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
  highlightColor: number;
  midtoneColor: number;
  lowlightColor: number;
  baseColor: number;
  blurFactor: number;
  zoom: number;
};

type VantaEffect = {
  destroy: () => void;
};

declare global {
  interface Window {
    THREE?: unknown;
    VANTA?: {
      FOG: (options: VantaFogOptions) => VantaEffect;
    };
  }
}

const scriptPromises = new Map<string, Promise<void>>();

function loadScript(src: string) {
  const existingPromise = scriptPromises.get(src);
  if (existingPromise) return existingPromise;

  const promise = new Promise<void>((resolve, reject) => {
    const existingScript = Array.from(document.scripts).find((script) => script.src === src);
    if (existingScript?.dataset["loaded"] === "true") {
      resolve();
      return;
    }

    const script = existingScript ?? document.createElement("script");
    const onLoad = () => {
      script.dataset["loaded"] = "true";
      resolve();
    };
    const onError = () => {
      scriptPromises.delete(src);
      reject(new Error(`Failed to load ${src}`));
    };

    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });

    if (!existingScript) {
      script.src = src;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  });

  scriptPromises.set(src, promise);
  return promise;
}

export function VantaFogBackground() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let effect: VantaEffect | undefined;

    const initialize = async () => {
      if (!window.THREE) await loadScript(THREE_URL);
      if (!window.VANTA?.FOG) await loadScript(VANTA_FOG_URL);
      if (disposed || !elementRef.current || !window.VANTA?.FOG) return;

      effect = window.VANTA.FOG({
        el: elementRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        highlightColor: 0xffffff,
        midtoneColor: 0xd4d4d4,
        lowlightColor: 0xd4d4d4,
        baseColor: 0xffffff,
        blurFactor: 0.9,
        zoom: 1.2,
      });
    };

    void initialize().catch((error: unknown) => {
      if (!disposed) console.error("Unable to initialize the Vanta Fog background.", error);
    });

    return () => {
      disposed = true;
      effect?.destroy();
    };
  }, []);

  return (
    <div ref={elementRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />
  );
}
