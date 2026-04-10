// @ts-nocheck
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    // Native scrolling is more reliable on touch devices.
    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    let frame: number;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}
