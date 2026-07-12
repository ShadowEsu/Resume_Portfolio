import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { IntroScene } from './scenes/IntroScene';
import { FilmLoader } from './ui/FilmLoader';

function useReducedMotion(): boolean {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches
  );

  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setReduced(m.matches);
    onChange();
    m.addEventListener?.('change', onChange);
    return () => m.removeEventListener?.('change', onChange);
  }, []);

  return reduced;
}

function useLowPower(): boolean {
  const [lowPower, setLowPower] = useState(false);
  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const small = window.matchMedia('(max-width: 768px)').matches;
    setLowPower(coarse || small);
  }, []);
  return lowPower;
}

export function FilmApp(): JSX.Element {
  const reduced = useReducedMotion();
  const lowPower = useLowPower();
  const [ready, setReady] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { rootMargin: '120px 0px', threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const dpr = useMemo(() => {
    if (lowPower) return 1;
    return Math.min(2, window.devicePixelRatio || 1);
  }, [lowPower]);

  return (
    <>
      <FilmLoader done={ready || reduced} />
      {!reduced && (
        <Canvas
          frameloop={heroVisible ? 'always' : 'demand'}
          shadows={!lowPower}
          dpr={dpr}
          gl={{
            antialias: !lowPower,
            alpha: true,
            powerPreference: lowPower ? 'low-power' : 'high-performance',
          }}
          camera={{ fov: 48, near: 0.1, far: 100, position: [0, 0.4, 10] }}
          onCreated={() => setReady(true)}
        >
          <Suspense fallback={null}>
            <IntroScene lowPower={lowPower} />
          </Suspense>
        </Canvas>
      )}
    </>
  );
}
