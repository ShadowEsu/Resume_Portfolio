"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { gsap, registerGsap } from "@/lib/animation/gsap";
import { motion } from "@/lib/animation/motion";
import { prefersReducedMotion } from "@/lib/animation/reducedMotion";
import styles from "./Header.module.css";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/experiments", label: "Experiments" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/Los_Angeles",
        })
      );
    };
    update();
    const id = window.setInterval(update, 30000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open || !panelRef.current) return;
    registerGsap();
    const items = panelRef.current.querySelectorAll("[data-menu-item]");
    if (prefersReducedMotion()) {
      gsap.set(items, { clearProps: "all" });
      return;
    }
    gsap.fromTo(
      items,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: motion.medium,
        stagger: motion.staggerMedium,
        ease: motion.easeOut,
      }
    );
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.mark} data-cursor="default">
          Preston Susanto
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              data-cursor="default"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.meta}>
          <span className={styles.year} aria-label={`Local time ${time} Pacific`}>
            {time || "2026"} · CA
          </span>
          <ThemeToggle />
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls={titleId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            data-cursor="default"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id={titleId}
        ref={panelRef}
        className={`${styles.menu} ${open ? styles.menuOpen : ""}`}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav className={styles.menuNav}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.menuLink}
              data-menu-item
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/" className={styles.menuLink} data-menu-item onClick={() => setOpen(false)}>
            Home
          </Link>
        </nav>
        <p className={styles.menuFoot} data-menu-item>
          AI engineer · California
        </p>
      </div>
    </>
  );
}
