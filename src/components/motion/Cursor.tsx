"use client";

import { useEffect, useRef } from "react";
import { useCursor } from "./CursorProvider";
import { prefersReducedMotion } from "@/lib/animation/reducedMotion";
import styles from "./Cursor.module.css";

const LABELS: Record<string, string> = {
  view: "View",
  drag: "Drag",
  close: "Close",
  previous: "Prev",
  next: "Next",
};

export function Cursor() {
  const { mode, enabled, setMode } = useCursor();
  const rootRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      const next = (el?.getAttribute("data-cursor") as typeof mode) || "default";
      setMode(next);

      if (
        (e.target as HTMLElement)?.closest?.(
          "input, textarea, [contenteditable='true']"
        )
      ) {
        rootRef.current?.classList.add(styles.hidden);
      } else {
        rootRef.current?.classList.remove(styles.hidden);
      }
    };

    const tick = () => {
      const reduce = prefersReducedMotion();
      const lerp = reduce ? 1 : 0.18;
      pos.current.x += (target.current.x - pos.current.x) * lerp;
      pos.current.y += (target.current.y - pos.current.y) * lerp;
      if (rootRef.current) {
        rootRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    raf.current = requestAnimationFrame(tick);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled, setMode]);

  if (!enabled) return null;

  const expanded = mode !== "default";

  return (
    <div
      ref={rootRef}
      className={`${styles.cursor} ${expanded ? styles.expanded : ""}`}
      aria-hidden="true"
      data-mode={mode}
    >
      <span className={styles.dot} />
      {expanded ? <span className={styles.label}>{LABELS[mode]}</span> : null}
    </div>
  );
}
