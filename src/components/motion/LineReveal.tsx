"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/animation/gsap";
import { wrapManualLines } from "@/lib/animation/splitText";
import { lineReveal } from "@/lib/animation/transitions";
import { prefersReducedMotion } from "@/lib/animation/reducedMotion";

export function LineReveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    const lines = wrapManualLines(el);
    gsap.set(lines, { yPercent: 110, rotate: lineReveal.fromRotate });
    const tween = gsap.to(lines, {
      yPercent: 0,
      rotate: 0,
      duration: lineReveal.duration,
      stagger: lineReveal.stagger,
      ease: lineReveal.ease,
      delay,
    });

    return () => {
      tween.kill();
    };
  }, [delay]);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
