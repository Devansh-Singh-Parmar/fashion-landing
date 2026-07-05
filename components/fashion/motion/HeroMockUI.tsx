"use client";

import { useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent, CSSProperties } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { BASE_PATH } from "@/lib/basePath";
import {
  Bell,
  Bookmark,
  ChevronDown,
  CheckCircle2,
  Home,
  Menu,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  BarChart3,
  ClipboardList,
  Truck,
  User,
} from "lucide-react";

interface HeroMockUIProps {
  imageAlt: string;
}

const SYSTEM_SANS_800: CSSProperties = {
  fontFamily:
    'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  fontWeight: 800,
};

const SIDEBAR_ICONS = [Home, ShoppingCart, Bookmark, Settings, Truck, BarChart3, ClipboardList];
const ACTIVE_SIDEBAR_INDEX = 2;

const ORDER_ROWS = [
  {
    thumb: "#DDF6F0",
    product: "Wool coat, size M",
    meta: "SKU ZP-88213 · Amsterdam",
    flag: "\u{1F1F3}\u{1F1F1}",
    shop: "Shopify",
    shopColor: "#5A8A3A",
    amount: 2,
    date: "23-04-2026",
    value: "€248",
  },
  {
    thumb: "#F6E9E2",
    product: "Leather ankle boots",
    meta: "SKU ZP-77042 · Berlin",
    flag: "\u{1F1E9}\u{1F1EA}",
    shop: "bol.com",
    shopColor: "#1C4ED8",
    amount: 1,
    date: "23-04-2026",
    value: "€189",
  },
  {
    thumb: "#E6FAF5",
    product: "Cotton midi dress",
    meta: "SKU ZP-91007 · Milan",
    flag: "\u{1F1EE}\u{1F1F9}",
    shop: "WooCommerce",
    shopColor: "#7C3FA3",
    amount: 3,
    date: "22-04-2026",
    value: "€312",
  },
];

/**
 * A hand-built illustration of a shipping dashboard, not a real screenshot.
 * Stands in for product UI until a real capture replaces it (see CONTENT_TODO.md).
 */
export function HeroMockUI({ imageAlt }: HeroMockUIProps) {
  const reduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const BASE_TILT_X = 10;
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
            ? { rotateX: 10, rotateY: 0, transformStyle: "preserve-3d" }
            : { rotateX: springRotateX, rotateY: springRotateY, y: floatY, transformStyle: "preserve-3d" }
        }
        className="flex overflow-hidden rounded-[18px] border border-ink-900/[0.08] bg-white text-left shadow-[0_40px_90px_-30px_rgba(20,50,44,0.4),0_8px_24px_rgba(20,50,44,0.1)]"
        aria-hidden="true"
      >
        {/* icon sidebar */}
        <div className="hidden w-14 shrink-0 flex-col items-center gap-4 border-r border-ink-900/[0.06] py-4 sm:flex">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-500/40">
            <Image src={`${BASE_PATH}/logo/Group.png`} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-ink-900 text-white">
            <Plus className="h-3.5 w-3.5" />
          </span>
          <div className="mt-1 flex flex-col items-center gap-3.5 text-ink-300">
            {SIDEBAR_ICONS.map((Icon, index) => (
              <span
                key={index}
                className={
                  index === ACTIVE_SIDEBAR_INDEX
                    ? "flex h-8 w-8 items-center justify-center rounded-[9px] bg-brand-100 text-brand-700"
                    : "flex h-8 w-8 items-center justify-center text-ink-300"
                }
              >
                <Icon className="h-[15px] w-[15px]" />
              </span>
            ))}
          </div>
          <span className="mt-auto flex h-8 w-8 items-center justify-center text-ink-300">
            <Settings className="h-[15px] w-[15px]" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          {/* topbar */}
          <div className="flex items-center gap-3 border-b border-ink-900/[0.06] px-3.5 py-3 sm:px-5">
            <Menu className="h-4 w-4 shrink-0 text-ink-400 sm:hidden" />
            <div className="hidden min-w-0 flex-1 items-center gap-2 rounded-lg bg-ink-50 px-3 py-1.5 text-[12px] text-ink-400 sm:flex">
              <Search className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Search...</span>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-3 text-ink-400 sm:gap-4">
              <span className="hidden items-center gap-1 text-[11.5px] font-medium text-ink-600 sm:flex">
                🇬🇧 English <ChevronDown className="h-3 w-3" />
              </span>
              <User className="h-[15px] w-[15px]" />
              <Bell className="h-[15px] w-[15px]" />
            </div>
          </div>

          <div className="space-y-3 p-3.5 sm:space-y-4 sm:p-5">
            {/* welcome banner */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-brand-100 via-[#DDF6F0] to-brand-200 p-4 sm:p-5">
              <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 sm:block" aria-hidden="true">
                <span className="absolute right-6 top-2 h-10 w-16 rounded-xl bg-brand-300/60" />
                <span className="absolute right-24 top-6 h-6 w-6 rounded-lg bg-brand-400/50" />
                <span className="absolute bottom-2 right-4 h-14 w-20 rounded-xl bg-brand-400/70" />
                <span className="absolute bottom-3 right-28 h-9 w-9 rounded-lg bg-brand-300/60" />
              </div>
              <div className="relative min-w-0 max-w-[62%] sm:max-w-[55%]">
                <h3 className="truncate text-[19px] leading-tight text-[#424242] sm:text-[22px]" style={SYSTEM_SANS_800}>
                  Dashboard
                </h3>
                <p className="mt-1 text-[11.5px] leading-snug text-ink-600 sm:text-[12.5px]">
                  Welcome back, see what&apos;s new.
                </p>
                <span className="mt-2.5 inline-flex rounded-lg bg-brand-500 px-3 py-1.5 text-[11px] font-semibold text-ink950 sm:text-[12px]">
                  See more
                </span>
              </div>
            </div>

            {/* stat cards */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="min-w-0 rounded-xl border border-ink-900/[0.08] p-2.5 sm:p-3.5">
                <div className="truncate text-[10px] text-ink-500 sm:text-[11.5px]">Open orders</div>
                <div className="mt-2 truncate text-lg font-extrabold text-ink-900 sm:text-2xl">789</div>
                <div className="mt-1.5 hidden text-[10.5px] font-semibold text-brand-700 underline sm:block">See all</div>
              </div>
              <div className="min-w-0 rounded-xl border border-ink-900/[0.08] p-2.5 sm:p-3.5">
                <CheckCircle2 className="h-4 w-4 text-brand-500" />
                <div className="mt-1.5 truncate text-[11px] font-bold text-ink-900 sm:text-[12.5px]">Up to date</div>
                <div className="mt-1 hidden text-[10.5px] leading-snug text-ink-500 sm:block">
                  All features enabled.
                </div>
              </div>
              <div className="min-w-0 overflow-hidden rounded-xl bg-cta-gradient p-2.5 text-white sm:p-3.5">
                <div className="truncate text-[11px] font-bold sm:text-[12.5px]">Important news</div>
                <div className="mt-1 hidden text-[10.5px] leading-snug text-white/70 sm:block">
                  New EU shipment options.
                </div>
                <div className="mt-1.5 hidden text-[10.5px] font-semibold text-brand-300 underline sm:block">
                  Read more
                </div>
              </div>
            </div>

            {/* order table */}
            <div className="hidden overflow-hidden rounded-xl border border-ink-900/[0.08] sm:block">
              <div className="grid grid-cols-[1.6fr_0.7fr_0.5fr_0.6fr] gap-2 border-b border-ink-900/[0.07] bg-[#FCFBF9] px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-ink-400">
                <span>Product</span>
                <span>Shop</span>
                <span className="text-right">Amount</span>
                <span className="text-right">Value</span>
              </div>
              {ORDER_ROWS.map((row) => (
                <div
                  key={row.product}
                  className="grid grid-cols-[1.6fr_0.7fr_0.5fr_0.6fr] items-center gap-2 border-b border-ink-900/[0.05] px-3 py-2 text-[11.5px] last:border-b-0"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-6 w-6 shrink-0 rounded-md" style={{ background: row.thumb }} />
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-ink-900">{row.product}</div>
                      <div className="truncate text-[10px] text-ink-400">
                        {row.flag} {row.meta}
                      </div>
                    </div>
                  </div>
                  <span className="truncate text-[11px] font-semibold" style={{ color: row.shopColor }}>
                    {row.shop}
                  </span>
                  <span className="text-right text-ink-600">{row.amount}</span>
                  <span className="text-right font-semibold text-ink-900">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
