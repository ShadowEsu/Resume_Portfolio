"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/animation/gsap";
import { mediaReveal } from "@/lib/animation/transitions";
import { prefersReducedMotion } from "@/lib/animation/reducedMotion";
import styles from "./MediaReveal.module.css";

type Props = {
  src: string;
  alt: string;
  aspectRatio?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  objectFit?: "cover" | "contain";
};

export function MediaReveal({
  src,
  alt,
  aspectRatio = "4 / 5",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 60vw",
  className,
  objectFit = "cover",
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    const media = mediaRef.current;
    if (!root || !media) return;

    if (prefersReducedMotion()) {
      gsap.set(root, { clipPath: "inset(0 0 0% 0)" });
      gsap.set(media, { scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(root, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(media, { scale: mediaReveal.fromScale });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 88%",
            once: true,
          },
        })
        .to(root, {
          clipPath: "inset(0 0 0% 0)",
          duration: mediaReveal.duration,
          ease: mediaReveal.ease,
        })
        .to(
          media,
          {
            scale: 1,
            duration: mediaReveal.duration,
            ease: mediaReveal.ease,
          },
          0
        );
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === root)
        .forEach((st) => st.kill());
    };
  }, [src]);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${className ?? ""}`}
      style={{ aspectRatio }}
    >
      <div ref={mediaRef} className={styles.media}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit }}
        />
      </div>
    </div>
  );
}
