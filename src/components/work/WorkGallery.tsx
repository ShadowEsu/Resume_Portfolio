"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { Flip, gsap, registerGsap } from "@/lib/animation/gsap";
import { motion } from "@/lib/animation/motion";
import { isCoarsePointer, prefersReducedMotion } from "@/lib/animation/reducedMotion";
import styles from "./WorkGallery.module.css";

type Mode = "editorial" | "index";

export function WorkGallery({ projects }: { projects: Project[] }) {
  const [mode, setMode] = useState<Mode>("editorial");
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<Project | null>(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const previewRaf = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  const switchMode = useCallback(
    (next: Mode) => {
      if (busy || next === mode || !listRef.current) return;
      if (prefersReducedMotion()) {
        setMode(next);
        return;
      }

      setBusy(true);
      registerGsap();
      const state = Flip.getState(listRef.current.querySelectorAll("[data-flip-item]"));
      setMode(next);

      requestAnimationFrame(() => {
        Flip.from(state, {
          duration: motion.medium,
          ease: motion.easeEditorial,
          absolute: false,
          stagger: 0.02,
          onComplete: () => setBusy(false),
        });
      });
    },
    [busy, mode]
  );

  useEffect(() => {
    if (isCoarsePointer()) return;
    const tick = () => {
      setPreviewPos((prev) => ({
        x: prev.x + (pointer.current.x - prev.x) * 0.16,
        y: prev.y + (pointer.current.y - prev.y) * 0.16,
      }));
      previewRaf.current = requestAnimationFrame(tick);
    };
    previewRaf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(previewRaf.current);
  }, []);

  const openProject = (slug: string, el: HTMLElement | null) => {
    if (busy) return;
    if (prefersReducedMotion() || !el) {
      router.push(`/work/${slug}`);
      return;
    }

    setBusy(true);
    registerGsap();
    const media = el.querySelector("[data-project-media]") as HTMLElement | null;
    if (!media) {
      router.push(`/work/${slug}`);
      return;
    }

    const rect = media.getBoundingClientRect();
    const clone = media.cloneNode(true) as HTMLElement;
    Object.assign(clone.style, {
      position: "fixed",
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      zIndex: "80",
      margin: "0",
      pointerEvents: "none",
    });
    document.body.appendChild(clone);

    const siblings = listRef.current?.querySelectorAll("[data-flip-item]") ?? [];
    gsap.to(siblings, {
      opacity: 0.15,
      duration: motion.fast,
      ease: motion.easeOut,
    });

    gsap.to(clone, {
      top: "12vh",
      left: "50%",
      xPercent: -50,
      width: "min(92vw, 880px)",
      height: "min(62vh, 720px)",
      duration: motion.medium,
      ease: motion.easeEditorial,
      onComplete: () => {
        router.push(`/work/${slug}`);
        window.setTimeout(() => {
          clone.remove();
          setBusy(false);
        }, 250);
      },
    });
  };

  return (
    <section className={styles.section} id="selected" aria-labelledby="work-heading">
      <div className={styles.head}>
        <div>
          <p className={styles.label}>Selected Work</p>
          <h2 id="work-heading" className={styles.heading}>
            Projects
          </h2>
        </div>
        <div className={styles.modes} role="group" aria-label="Gallery layout">
          <button
            type="button"
            className={mode === "editorial" ? styles.active : undefined}
            onClick={() => switchMode("editorial")}
            disabled={busy}
            data-cursor="default"
          >
            Editorial
          </button>
          <button
            type="button"
            className={mode === "index" ? styles.active : undefined}
            onClick={() => switchMode("index")}
            disabled={busy}
            data-cursor="default"
          >
            Index
          </button>
        </div>
      </div>

      <div
        ref={listRef}
        className={mode === "editorial" ? styles.editorial : styles.index}
      >
        {projects.map((project, i) => (
          <article
            key={project.slug}
            className={styles.item}
            data-flip-item
            data-align={i % 2 === 0 ? "left" : "right"}
            onMouseEnter={() => {
              if (mode === "index" && !isCoarsePointer()) setPreview(project);
            }}
            onMouseLeave={() => setPreview(null)}
            onMouseMove={(e) => {
              pointer.current = { x: e.clientX + 24, y: e.clientY - 40 };
            }}
          >
            <button
              type="button"
              className={styles.trigger}
              data-cursor="view"
              onClick={(e) =>
                openProject(project.slug, (e.currentTarget as HTMLElement).closest("[data-flip-item]"))
              }
            >
              <div
                className={styles.media}
                data-project-media
                style={{ aspectRatio: `${project.width} / ${project.height}` }}
              >
                <Image
                  src={project.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.meta}>
                <span className={styles.number}>{project.index}</span>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.sub}>{project.subtitle}</p>
                <div className={styles.tags}>
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </button>
            <Link href={`/work/${project.slug}`} className={styles.fallbackLink}>
              Open {project.title}
            </Link>
          </article>
        ))}
      </div>

      {preview && mode === "index" ? (
        <div
          className={styles.floatingPreview}
          style={{ transform: `translate3d(${previewPos.x}px, ${previewPos.y}px, 0)` }}
          aria-hidden="true"
        >
          <Image src={preview.thumbnail} alt="" fill sizes="220px" style={{ objectFit: "cover" }} />
        </div>
      ) : null}
    </section>
  );
}
