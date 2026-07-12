"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/animation/gsap";
import { prefersReducedMotion } from "@/lib/animation/reducedMotion";
import { motion } from "@/lib/animation/motion";
import styles from "./Preloader.module.css";

type AssetProgress = {
  loaded: number;
  total: number;
  percentage: number;
};

const SESSION_KEY = "portfolio-preloader-done";

async function preloadImages(urls: string[], onProgress: (p: AssetProgress) => void) {
  const unique = [...new Set(urls.filter(Boolean))];
  const total = Math.max(unique.length, 1);
  let loaded = 0;

  const bump = () => {
    loaded += 1;
    onProgress({
      loaded,
      total,
      percentage: Math.round((loaded / total) * 100),
    });
  };

  await Promise.allSettled(
    unique.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            bump();
            resolve();
          };
          img.onerror = () => {
            bump();
            resolve();
          };
          img.src = src;
        })
    )
  );
}

export function Preloader({
  assets,
  onComplete,
}: {
  assets: string[];
  onComplete: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const [active, setActive] = useState(true);
  const targetPct = useRef(0);
  const displayed = useRef(0);

  useEffect(() => {
    registerGsap();
    const skip = sessionStorage.getItem(SESSION_KEY) === "1";
    const reduce = prefersReducedMotion();

    if (skip || reduce) {
      setActive(false);
      onComplete();
      return;
    }

    document.documentElement.classList.add("is-loading");
    let raf = 0;
    let finished = false;

    const smoothNumber = () => {
      displayed.current += (targetPct.current - displayed.current) * 0.12;
      const shown = Math.round(displayed.current);
      setDisplay(shown);
      if (numberRef.current) numberRef.current.textContent = `${shown}%`;
      if (!finished || Math.abs(targetPct.current - displayed.current) > 0.4) {
        raf = requestAnimationFrame(smoothNumber);
      } else {
        setDisplay(100);
        exit();
      }
    };

    const exit = () => {
      finished = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove("is-loading");
          setActive(false);
          onComplete();
        },
      });
      tl.to(numberRef.current, {
        y: -28,
        duration: motion.medium,
        ease: motion.easeOut,
      })
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: motion.medium,
            ease: motion.easeEditorial,
          },
          "<0.05"
        )
        .to(rootRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: motion.medium,
          ease: motion.easeEditorial,
        });
    };

    preloadImages(assets, (p) => {
      targetPct.current = p.percentage;
      if (p.percentage >= 100) {
        targetPct.current = 100;
      }
    }).then(() => {
      targetPct.current = 100;
    });

    raf = requestAnimationFrame(smoothNumber);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("is-loading");
    };
  }, [assets, onComplete]);

  if (!active) return null;

  return (
    <div ref={rootRef} className={styles.root} aria-live="polite" aria-busy="true">
      <span ref={numberRef} className={styles.number}>
        {display}%
      </span>
      <div ref={lineRef} className={styles.line} />
      <p className={styles.caption}>Preston Susanto</p>
    </div>
  );
}
