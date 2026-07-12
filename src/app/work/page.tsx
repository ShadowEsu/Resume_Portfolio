import type { Metadata } from "next";
import { WorkGallery } from "@/components/work/WorkGallery";
import { projects } from "@/data/projects";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.label}>Index</p>
        <h1 className={styles.title}>Work</h1>
      </header>
      <WorkGallery projects={projects} />
    </div>
  );
}
