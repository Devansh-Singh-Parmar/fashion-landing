"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { Captions, Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { cx } from "@/components/fashion/ui/cx";
import { BASE_PATH } from "@/lib/basePath";

const POSTER_SRC = `${BASE_PATH}/videos/burker-case-study-poster.jpg`;
const WEBM_SRC = `${BASE_PATH}/videos/burker-case-study.webm`;
const MP4_SRC = `${BASE_PATH}/videos/burker-case-study.mp4`;
const CAPTIONS_EN_SRC = `${BASE_PATH}/videos/burker-case-study.en.vtt`;
const CAPTIONS_NL_SRC = `${BASE_PATH}/videos/burker-case-study.nl.vtt`;

interface CaseStudyVideoProps {
  playLabel: string;
  videoTitle: string;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Poster-only until the video scrolls near the viewport, at which point the
 * real <video> mounts with preload="auto" so it's already buffering by the
 * time someone presses play, so clicking should feel instant instead of
 * waiting on a cold fetch. Controls are fully custom (no native <video
 * controls>) to match the site's visual language.
 */
export function CaseStudyVideo({ playLabel, videoTitle }: CaseStudyVideoProps) {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);

  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Preload the video ahead of interaction, once the player is within reach of the viewport.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || shouldLoad) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!hasStarted || !videoRef.current) {
      return;
    }
    videoRef.current.play().catch(() => {
      // Autoplay can be blocked by the browser; the visible play button remains available.
    });
  }, [hasStarted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    for (const track of Array.from(video.textTracks)) {
      track.mode = captionsOn && track.language === language ? "showing" : "disabled";
    }
  }, [language, captionsOn, shouldLoad]);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  function handlePlayClick() {
    setShouldLoad(true);
    setHasStarted(true);
  }

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }

  function toggleFullscreen() {
    if (!containerRef.current) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else containerRef.current.requestFullscreen().catch(() => {});
  }

  function seekFromPointer(event: ReactPointerEvent<HTMLDivElement>) {
    const video = videoRef.current;
    const track = scrubberRef.current;
    if (!video || !track || !duration) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    video.currentTime = ratio * duration;
  }

  function handleScrubberPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    seekFromPointer(event);
  }

  const progressPct = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPct = duration ? (bufferedEnd / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1b2422] to-[#233330]"
      style={{ aspectRatio: "16 / 10" }}
    >
      {shouldLoad ? (
        <video
          ref={videoRef}
          preload="auto"
          playsInline
          poster={POSTER_SRC}
          className="absolute inset-0 h-full w-full bg-black object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
          onCanPlay={() => setIsBuffering(false)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onProgress={(e) => {
            const buffered = e.currentTarget.buffered;
            if (buffered.length) setBufferedEnd(buffered.end(buffered.length - 1));
          }}
          onEnded={(e) => {
            setIsPlaying(false);
            e.currentTarget.currentTime = 0;
          }}
        >
          <source src={WEBM_SRC} type="video/webm" />
          <source src={MP4_SRC} type="video/mp4" />
          <track kind="captions" src={CAPTIONS_EN_SRC} srcLang="en" label="English" />
          <track kind="captions" src={CAPTIONS_NL_SRC} srcLang="nl" label="Nederlands" />
        </video>
      ) : null}

      {isBuffering && hasStarted ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/25 border-t-brand-500" />
        </div>
      ) : null}

      {!hasStarted ? (
        <>
          <Image src={POSTER_SRC} alt={videoTitle} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, rgba(112,202,185,0.08) 0 12px, transparent 12px 24px)",
            }}
          />
          <div className="absolute left-4 top-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-brand-300">
            Burker &times; Zineps &middot; film
          </div>
          <button
            type="button"
            onClick={handlePlayClick}
            aria-label={playLabel}
            className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3.5 border-none bg-transparent text-[#F6F3EE]"
          >
            <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-brand-500 shadow-[0_10px_40px_rgba(112,202,185,0.4)] transition-transform duration-300 group-hover:scale-105">
              <Play className="ml-1 h-7 w-7 fill-current text-ink950" aria-hidden="true" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#c7d0cc]">2 min</span>
          </button>
        </>
      ) : (
        <div
          className={cx(
            "absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-3.5 pb-3 pt-8 transition-opacity duration-200",
            isPlaying ? "opacity-0 group-hover:opacity-100 focus-within:opacity-100" : "opacity-100",
          )}
        >
            <div
              ref={scrubberRef}
              onPointerDown={handleScrubberPointerDown}
              className="group/scrub relative flex h-3.5 cursor-pointer items-center"
            >
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                <div className="absolute inset-y-0 left-0 bg-white/25" style={{ width: `${bufferedPct}%` }} />
                <div className="absolute inset-y-0 left-0 bg-brand-500" style={{ width: `${progressPct}%` }} />
              </div>
              <div
                className="absolute h-3 w-3 -translate-x-1/2 rounded-full bg-brand-500 opacity-0 shadow transition-opacity group-hover/scrub:opacity-100"
                style={{ left: `${progressPct}%` }}
              />
            </div>

            <div className="flex items-center gap-3 text-[#F6F3EE]">
              <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="cursor-pointer">
                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
              </button>
              <button type="button" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"} className="cursor-pointer">
                {isMuted ? <VolumeX className="h-[18px] w-[18px]" /> : <Volume2 className="h-[18px] w-[18px]" />}
              </button>
              <span className="font-mono text-[11px] tabular-nums text-[#c7d0cc]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <span className="ml-auto flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCaptionsOn((prev) => !prev)}
                  aria-label="Toggle captions"
                  aria-pressed={captionsOn}
                  className={cx("cursor-pointer transition-colors", captionsOn ? "text-brand-400" : "text-[#c7d0cc]")}
                >
                  <Captions className="h-[18px] w-[18px]" />
                </button>
                <button type="button" onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"} className="cursor-pointer">
                  {isFullscreen ? <Minimize className="h-[18px] w-[18px]" /> : <Maximize className="h-[18px] w-[18px]" />}
                </button>
              </span>
            </div>
          </div>
      )}
    </div>
  );
}
