"use client";

import Link from "next/link";
import { MediaReveal } from "@/components/motion/MediaReveal";
import type { Project } from "@/data/projects";
import styles from "./ProjectDetail.module.css";

export function ProjectDetail({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.sticky}>
          <p className={styles.index}>{project.index}</p>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.statement}>{project.summary}</p>
          <dl className={styles.facts}>
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{project.category}</dd>
            </div>
          </dl>
        </div>
        <MediaReveal
          src={project.heroMedia}
          alt={`${project.title} hero`}
          aspectRatio={`${project.width} / ${project.height}`}
          priority
          className={styles.heroMedia}
          sizes="(max-width: 960px) 100vw, 58vw"
        />
      </header>

      <section className={styles.block}>
        <h2>Challenge</h2>
        <p>{project.challenge}</p>
      </section>

      <section className={styles.blockWide}>
        <h2>Process</h2>
        <p>{project.process}</p>
        <div className={styles.pair}>
          {project.gallery.slice(0, 2).map((src) => (
            <MediaReveal
              key={src}
              src={src}
              alt={`${project.title} process visual`}
              aspectRatio="4 / 3"
            />
          ))}
        </div>
      </section>

      <section className={styles.block}>
        <h2>Outcome</h2>
        <p>{project.outcome}</p>
      </section>

      <section className={styles.tech}>
        <h2>Technology</h2>
        <ul>
          {project.technologies.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <nav className={styles.next} aria-label="Next project">
        <Link href={`/work/${next.slug}`} data-cursor="next">
          <span>Next</span>
          <strong>
            {next.index} · {next.title}
          </strong>
        </Link>
      </nav>
    </article>
  );
}
