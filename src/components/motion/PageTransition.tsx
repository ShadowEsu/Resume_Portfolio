"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, registerGsap } from "@/lib/animation/gsap";
import { routeFade } from "@/lib/animation/transitions";
import { prefersReducedMotion } from "@/lib/animation/reducedMotion";
import styles from "./PageTransition.module.css";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, clearProps: "all" });
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: routeFade.duration + 0.35,
        ease: routeFade.ease,
      }
    );
  }, [pathname]);

  return (
    <div ref={ref} className={styles.page}>
      {children}
    </div>
  );
}
