"use client";

import Link from "next/link";
import { MediaReveal } from "@/components/motion/MediaReveal";
import { projects } from "@/data/projects";
import styles from "./ExperimentsGrid.module.css";

const experiments = projects.filter(
  (p) => p.slug === "selected-experiments" || p.slug === "jayminilm" || p.slug === "car-knowledge-app"
);

export function ExperimentsGrid() {
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.label}>Index</p>
        <h1 className={styles.title}>Experiments</h1>
        <p className={styles.sub}>
          Shorter builds, hackathon slices, and lab work that still ships a demo.
        </p>
      </header>

      <div className={styles.grid}>
        {experiments.map((item) => (
          <article key={item.slug} className={styles.card}>
            <Link href={`/work/${item.slug}`} data-cursor="view" className={styles.link}>
              <MediaReveal
                src={item.thumbnail}
                alt={`${item.title} experiment visual`}
                aspectRatio="5 / 4"
              />
              <div className={styles.meta}>
                <span>{item.index}</span>
                <h2>{item.title}</h2>
                <p>{item.category}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
