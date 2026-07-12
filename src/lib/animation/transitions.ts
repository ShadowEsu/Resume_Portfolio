import { motion } from "./motion";
import { gsapEaseEditorial, gsapEaseOut } from "./easings";

export const pageTransition = {
  duration: motion.medium,
  ease: gsapEaseEditorial,
};

export const lineReveal = {
  duration: motion.medium,
  stagger: motion.staggerMedium,
  ease: gsapEaseOut,
  fromY: "110%",
  fromRotate: 1,
};

export const mediaReveal = {
  duration: motion.slow,
  ease: gsapEaseOut,
  fromScale: 1.08,
};

export const routeFade = {
  duration: motion.fast,
  ease: gsapEaseOut,
};
