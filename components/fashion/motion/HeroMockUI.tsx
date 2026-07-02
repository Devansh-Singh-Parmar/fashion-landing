"use client";

import { useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface HeroMockUIProps {
  imageAlt: string;
}

const BAR_HEIGHTS = [38, 52, 44, 66, 58, 74, 64, 82, 70, 90, 78, 100];
const BAR_COLORS = [
  "#DDF6F0",
  "#DDF6F0",
  "#DDF6F0",
  "#B7E8DC",
  "#B7E8DC",
  "#8FD9C7",
  "#8FD9C7",
  "#70CAB9",
  "#70CAB9",
  "#5BBFA9",
  "#5BBFA9",
  "#1A1A1A",
];

const SIDEBAR_ITEMS = ["Dashboard", "Shipments", "Returns", "Carriers", "Analytics"];

/**
 * A hand-built illustration of a shipping dashboard, not a real screenshot.
 * Stands in for product UI until a real capture replaces it (see CONTENT_TODO.md).
 */
export function HeroMockUI({ imageAlt }: HeroMockUIProps) {
  const reduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const BASE_TILT_X = 16;
  const BASE_TILT_Y = 0;

  const rotateX = useMotionValue(BASE_TILT_X);
  const rotateY = useMotionValue(BASE_TILT_Y);
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 16 });
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 16 });
  const floatY = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const controls = animate(floatY, [0, -12, 0], {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    });

    return () => controls.stop();
  }, [floatY, reduceMotion]);

  function handleMouseMove(event: ReactMouseEvent<HTMLDivElement>) {
    if (reduceMotion || !wrapperRef.current) {
      return;
    }

    const rect = wrapperRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    rotateY.set(px * 5);
    rotateX.set(BASE_TILT_X - Math.abs(px) * 4);
  }

  function handleMouseLeave() {
    rotateX.set(BASE_TILT_X);
    rotateY.set(BASE_TILT_Y);
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="[perspective:1800px]"
      role="img"
      aria-label={imageAlt}
    >
      <motion.div
        style={
          reduceMotion
            ? { rotateX: 16, rotateY: 0, transformStyle: "preserve-3d" }
            : { rotateX: springRotateX, rotateY: springRotateY, y: floatY, transformStyle: "preserve-3d" }
        }
        className="overflow-hidden rounded-[18px] border border-ink-900/[0.08] bg-white text-left shadow-[0_40px_90px_-30px_rgba(20,50,44,0.4),0_8px_24px_rgba(20,50,44,0.1)]"
        aria-hidden="true"
      >
        {/* topbar */}
        <div className="flex items-center gap-2.5 border-b border-ink-900/[0.07] bg-[#FCFBF9] px-4 py-3.5 sm:px-[18px]">
          <span className="h-[11px] w-[11px] rounded-full bg-clay-300" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#EBD48C]" />
          <span className="h-[11px] w-[11px] rounded-full bg-brand-300" />
          <div className="ml-3.5 hidden font-mono text-xs text-ink-400 sm:block">app.zineps.com/shipments</div>
          <div className="ml-auto flex items-center gap-2 text-[12.5px] text-ink-600">
            <span className="h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_0_4px_rgba(112,202,185,0.2)]" />
            Live
          </div>
        </div>

        <div className="grid min-h-[300px] grid-cols-1 sm:min-h-[340px] sm:grid-cols-[190px_1fr]">
          {/* sidebar */}
          <div className="hidden flex-col gap-1.5 border-r border-ink-900/[0.07] bg-[#FCFBF9] p-3.5 sm:flex">
            <div className="flex items-center gap-2.5 rounded-lg bg-brand-100 px-2.5 py-2 text-[13.5px] font-semibold text-ink-900">
              <span className="h-[15px] w-[15px] rounded-[4px] bg-brand-500" />
              {SIDEBAR_ITEMS[0]}
            </div>
            {SIDEBAR_ITEMS.slice(1).map((item) => (
              <div key={item} className="px-2.5 py-2 text-[13.5px] text-ink-500">
                {item}
              </div>
            ))}
            <div className="mt-auto rounded-[11px] bg-gradient-to-br from-brand-100 to-brand-200 p-3 text-[12px] leading-tight text-brand-800">
              Savings this month
              <br />
              <b className="font-display text-[22px] font-semibold text-ink-900">&euro; 4.1k</b>
            </div>
          </div>

          {/* main */}
          <div className="space-y-3.5 p-3.5 sm:p-5">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="min-w-0 rounded-xl border border-ink-900/[0.08] p-2.5 sm:p-3.5">
                <div className="truncate font-mono text-[9px] text-ink-400 sm:text-[11.5px]">SHIPMENTS / DAY</div>
                <div className="mt-1 truncate font-display text-lg font-semibold text-ink-900 sm:text-2xl">5,120</div>
              </div>
              <div className="min-w-0 rounded-xl border border-ink-900/[0.08] p-2.5 sm:p-3.5">
                <div className="truncate font-mono text-[9px] text-ink-400 sm:text-[11.5px]">RETURN RATE</div>
                <div className="mt-1 truncate font-display text-lg font-semibold text-ink-900 sm:text-2xl">6.4%</div>
              </div>
              <div className="min-w-0 rounded-xl bg-ink-900 p-2.5 text-white sm:p-3.5">
                <div className="truncate font-mono text-[9px] text-brand-300 sm:text-[11.5px]">AVG. COST</div>
                <div className="mt-1 truncate font-display text-lg font-semibold sm:text-2xl">&euro; 3.28</div>
              </div>
            </div>

            <div className="rounded-xl border border-ink-900/[0.08] p-3 pb-2 sm:p-4 sm:pb-2.5">
              <div className="mb-2.5 flex items-baseline justify-between">
                <span className="text-[12px] font-semibold sm:text-[13px]">Volume · last 14 days</span>
                <span className="text-[11px] font-semibold text-brand-800 sm:text-[12px]">&#9650; 180% YoY</span>
              </div>
              <div className="flex h-[70px] items-end gap-1 sm:h-[92px] sm:gap-1.5">
                {BAR_HEIGHTS.map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-[4px]"
                    style={{ height: `${height}%`, background: BAR_COLORS[index] }}
                  />
                ))}
              </div>
            </div>

            <div className="hidden flex-col gap-2 sm:flex">
              <div className="flex items-center gap-3 rounded-lg border border-ink-900/[0.06] bg-[#FCFBF9] px-3 py-2 text-[12.5px]">
                <span className="font-mono text-ink-400">#ZP-4471</span>
                <span className="font-semibold text-ink-900">Wool coat · NL&rarr;FR</span>
                <span className="ml-auto rounded-full bg-brand-100 px-2.5 py-0.5 text-[11.5px] font-semibold text-brand-800">
                  Cheapest: DPD
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-ink-900/[0.06] bg-[#FCFBF9] px-3 py-2 text-[12.5px]">
                <span className="font-mono text-ink-400">#ZP-4470</span>
                <span className="font-semibold text-ink-900">Sneakers · NL&rarr;DE</span>
                <span className="ml-auto rounded-full bg-clay-100 px-2.5 py-0.5 text-[11.5px] font-semibold text-clay-700">
                  Fastest: PostNL
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
