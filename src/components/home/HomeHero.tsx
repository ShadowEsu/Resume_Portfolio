"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import { gsap, registerGsap } from "@/lib/animation/gsap";
import { motion } from "@/lib/animation/motion";
import { prefersReducedMotion } from "@/lib/animation/reducedMotion";
import styles from "./HomeHero.module.css";

export function HomeHero() {
  const rootRef = useRef<HTMLElement>(null);
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const support = projects[1];

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) {
      if (root) root.style.opacity = "1";
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: motion.easeOut } });
      tl.fromTo(
        `.${styles.stage}`,
        { opacity: 0 },
        { opacity: 1, duration: motion.medium }
      )
        .fromTo(
          `.${styles.featureMedia}`,
          { clipPath: "inset(0 0 100% 0)", scale: 1.06 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: motion.slow,
            ease: motion.easeEditorial,
          },
          0.1
        )
        .fromTo(
          `.${styles.titleLine}`,
          { yPercent: 110, rotate: 1 },
          {
            yPercent: 0,
            rotate: 0,
            duration: motion.medium,
            stagger: motion.staggerMedium,
          },
          0.25
        )
        .fromTo(
          [`.${styles.statement}`, `.${styles.meta}`, `.${styles.support}`],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: motion.medium, stagger: 0.06 },
          0.45
        )
        .fromTo(
          `.${styles.scroll}`,
          { opacity: 0 },
          { opacity: 1, duration: motion.medium },
          0.7
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.hero} aria-label="Introduction">
      <div className={styles.stage}>
        <div className={styles.copy}>
          <p className={styles.index}>01 · Profile</p>
          <h1 className={styles.title}>
            <span className={styles.titleMask}>
              <span className={styles.titleLine}>Preston</span>
            </span>
            <span className={styles.titleMask}>
              <span className={styles.titleLine}>Susanto</span>
            </span>
          </h1>
          <p className={styles.statement}>
            Preston Susanto is an AI engineer and student founder building useful,
            thoughtful products.
          </p>
          <div className={styles.meta}>
            <span>California</span>
            <span>2026</span>
            <span>AI · ML · Product</span>
          </div>
        </div>

        <Link
          href={`/work/${featured.slug}`}
          className={styles.feature}
          data-cursor="view"
          aria-label={`Open ${featured.title}`}
        >
          <div className={styles.featureMedia}>
            <Image
              src={featured.heroMedia}
              alt={`${featured.title} featured visual`}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.featureCaption}>
            <span>{featured.index}</span>
            <span>{featured.title}</span>
            <span>{featured.year}</span>
          </div>
        </Link>

        <Link
          href={`/work/${support.slug}`}
          className={styles.support}
          data-cursor="view"
          aria-label={`Open ${support.title}`}
        >
          <div className={styles.supportMedia}>
            <Image
              src={support.thumbnail}
              alt={`${support.title} supporting visual`}
              fill
              sizes="280px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <span className={styles.supportLabel}>
            {support.index} · {support.title}
          </span>
        </Link>

        <a href="#selected" className={styles.scroll} data-cursor="default">
          Scroll to explore
          <span className={styles.scrollLine} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
