"use client";

import Image from "next/image";
import { useState } from "react";
import { MediaReveal } from "@/components/motion/MediaReveal";
import styles from "./AboutContent.module.css";

const EMAIL = "prestonjaysusanto@gmail.com";

const milestones = [
  { year: "2026", text: "Founded Regrade. Applying to YC Fall 2026." },
  { year: "2026", text: "Independent RL research under Prof. Kyu Woong Lee." },
  { year: "2025", text: "Moved to California for EECS at Diablo Valley College." },
  { year: "2024", text: "Computer Science Prize, Wesley College, Perth." },
];

const capabilities = [
  "AI product engineering",
  "Reinforcement learning",
  "Mobile apps",
  "Experimental interfaces",
  "Education technology",
  "Hackathon shipping",
];

export function AboutContent() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.label}>Profile</p>
        <h1 className={styles.title}>
          I build AI products that stay useful under real constraints.
        </h1>
        <p className={styles.lede}>
          First-year EECS student in California. Independent RL research, shipped
          apps, and campus engineering leadership - usually on a MacBook with no
          GPU budget.
        </p>
      </header>

      <div className={styles.grid}>
        <MediaReveal
          src="/about/portrait.jpg"
          alt="Portrait of Preston Susanto"
          aspectRatio="4 / 5"
          priority
          className={styles.portrait}
        />

        <div className={styles.bio}>
          <h2 className={styles.sectionTitle}>Biography</h2>
          <p>
            Path ran through Indonesia, Perth, Mandarin immersion in China, then
            California alone. Focus now: AI products, machine learning, education
            technology, and experimental interfaces - with Regrade as the featured
            company.
          </p>
          <p>
            Tone stays ambitious and understated. Prefer shipping over pitching.
          </p>

          <h2 className={styles.sectionTitle}>Current focus</h2>
          <ul className={styles.list}>
            <li>Regrade product and growth</li>
            <li>Reward-shaping research for tutoring agents</li>
            <li>Transfer applications and research collaborations</li>
          </ul>

          <h2 className={styles.sectionTitle}>Capabilities</h2>
          <ul className={styles.caps}>
            {capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <section className={styles.timeline} aria-label="Milestones">
        <h2 className={styles.sectionTitle}>Selected milestones</h2>
        <ol className={styles.miles}>
          {milestones.map((m) => (
            <li key={`${m.year}-${m.text}`}>
              <span>{m.year}</span>
              <p>{m.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.contact} aria-label="Contact">
        <h2 className={styles.sectionTitle}>Contact</h2>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.emailBtn}
            onClick={copyEmail}
            data-cursor="default"
            aria-label={`Copy email ${EMAIL}`}
          >
            <span className={styles.emailTrack}>
              <span className={copied ? styles.slideUp : undefined}>Email</span>
              <span className={copied ? styles.slideIn : styles.copiedHidden}>
                Copied
              </span>
            </span>
          </button>
          <a href={`mailto:${EMAIL}`} className={styles.link}>
            {EMAIL}
          </a>
          <a
            href="https://www.linkedin.com/in/preston-jay-susanto/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/ShadowEsu"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
        </div>
        <div className={styles.place}>
          <Image
            src="/about/california.jpg"
            alt="California landscape"
            width={1200}
            height={700}
            sizes="(max-width: 900px) 100vw, 70vw"
          />
          <span>California</span>
        </div>
      </section>
    </div>
  );
}
