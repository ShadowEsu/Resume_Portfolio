"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { isCoarsePointer } from "@/lib/animation/reducedMotion";

export type CursorMode =
  | "default"
  | "view"
  | "drag"
  | "close"
  | "previous"
  | "next";

type CursorContextValue = {
  mode: CursorMode;
  setMode: (mode: CursorMode) => void;
  enabled: boolean;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<CursorMode>("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!isCoarsePointer());
  }, []);

  const setCursorMode = useCallback((next: CursorMode) => {
    setMode(next);
  }, []);

  const value = useMemo(
    () => ({ mode, setMode: setCursorMode, enabled }),
    [mode, setCursorMode, enabled]
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}
