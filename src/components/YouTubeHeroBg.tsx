"use client";

import { useEffect, useRef } from "react";

// Fond vidéo YouTube du hero — muet, autoplay, en boucle sur le segment [START, END].
const VIDEO_ID = "X6LwfOY31E0";
const START = 3; // 0:03
const END = 38; // 0:38

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function YouTubeHeroBg() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    const build = () => {
      if (cancelled || !wrapRef.current || !window.YT?.Player) return;
      // Div interne créée hors de React : la YT API la remplace par une iframe,
      // sans interférer avec la reconciliation React (évite l'erreur removeChild).
      const target = document.createElement("div");
      wrapRef.current.appendChild(target);
      playerRef.current = new window.YT.Player(target, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          loop: 0,
          playsinline: 1,
          start: START,
          end: END,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
        },
        events: {
          onReady: (e: any) => {
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e: any) => {
            // À la fin du segment (END), on repart au début du segment (boucle).
            if (e.data === window.YT.PlayerState.ENDED) {
              e.target.seekTo(START, true);
              e.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      build();
    } else {
      if (!document.getElementById("yt-iframe-api")) {
        const s = document.createElement("script");
        s.id = "yt-iframe-api";
        s.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(s);
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        build();
      };
    }

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy?.();
      } catch {
        /* noop */
      }
    };
  }, []);

  return (
    <div className="yt-hero-bg absolute inset-0 overflow-hidden pointer-events-none bg-[#1C1008]">
      <div ref={wrapRef} className="absolute inset-0" />
      {/* Le player 16:9 est agrandi pour couvrir tout le hero (façon object-cover). */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            ".yt-hero-bg iframe{position:absolute;top:50%;left:50%;width:177.78vh;min-width:100%;height:56.25vw;min-height:100%;transform:translate(-50%,-50%);pointer-events:none;border:0;}",
        }}
      />
    </div>
  );
}
