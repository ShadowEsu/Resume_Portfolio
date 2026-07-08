import { useEffect, useState } from 'react';
import gsap from 'gsap';

type Props = {
  done: boolean;
};

export function FilmLoader({ done }: Props): JSX.Element | null {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!done) return;
    const el = document.getElementById('film-loader');
    if (!el) {
      setVisible(false);
      return;
    }
    gsap.to(el, {
      autoAlpha: 0,
      duration: 0.6,
      ease: 'power3.out',
      onComplete: () => setVisible(false),
    });
  }, [done]);

  if (!visible) return null;

  return (
    <div className="film-loader" id="film-loader" aria-hidden="true">
      <div className="film-loader-inner">
        <p className="film-loader-kicker">Initializing</p>
        <div className="film-loader-signal" aria-hidden="true">
          <span className="film-loader-node" />
          <span className="film-loader-node" />
          <span className="film-loader-node" />
          <span className="film-loader-node" />
          <span className="film-loader-node" />
          <span className="film-loader-pulse" />
        </div>
        <p className="film-loader-note">Scroll to start the film.</p>
      </div>
    </div>
  );
}

