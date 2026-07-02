"use client";

import { useRef } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * Wraps children in a mouse-position-driven 3D tilt (rotateX/rotateY),
 * spring-eased back to neutral on mouse-leave. Intended to wrap a card that
 * handles its own lift/shadow hover via CSS, so the two transforms compose
 * on separate elements instead of fighting over the same `transform` style.
 */
export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 22 });

  function handleMouseMove(event: ReactMouseEvent<HTMLDivElement>) {
    if (reduceMotion || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * maxTilt * 2);
    rotateX.set(y * -maxTilt * 2);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
