"use client";

import { useCallback, useMemo, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Cursor } from "@/components/motion/Cursor";
import { CursorProvider } from "@/components/motion/CursorProvider";
import { PageTransition } from "@/components/motion/PageTransition";
import { Preloader } from "@/components/motion/Preloader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { projects } from "@/data/projects";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const assets = useMemo(
    () => [
      ...projects.flatMap((p) => [p.heroMedia, p.thumbnail, ...p.gallery]),
      "/about/portrait.jpg",
      "/about/california.jpg",
    ],
    []
  );

  const onComplete = useCallback(() => setReady(true), []);

  return (
    <ThemeProvider>
      <CursorProvider>
        <Preloader assets={assets} onComplete={onComplete} />
        <SmoothScroll />
        <Header />
        <Cursor />
        <main
          className="site-main"
          id="main"
          style={{ visibility: ready ? "visible" : "hidden" }}
        >
          <PageTransition>{children}</PageTransition>
        </main>
      </CursorProvider>
    </ThemeProvider>
  );
}
