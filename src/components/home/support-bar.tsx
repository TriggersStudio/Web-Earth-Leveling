"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useCallback } from "react";
import Hls from "hls.js";
import { LanguageSwitcher } from "@/components/language-switcher";

const AZURACAST_BASE = "https://triggers-fm.triggersstudio.com";
const NOWPLAYING_URL = `${AZURACAST_BASE}/api/nowplaying`;
const HLS_STREAM_URL = `${AZURACAST_BASE}/hls/triggers_fm/live.m3u8`;

interface NowPlayingData {
  station?: {
    listen_url?: string;
  };
  now_playing?: {
    song?: {
      title?: string;
      artist?: string;
      art?: string;
    };
  };
}

export function SupportBar() {
  const t = useTranslations("SupportBar");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [albumArt, setAlbumArt] = useState("");

  const fetchNowPlaying = useCallback(async () => {
    try {
      const res = await fetch(NOWPLAYING_URL);
      const data = await res.json();
      const station: NowPlayingData | undefined = Array.isArray(data)
        ? data[0]
        : data;
      if (station?.now_playing?.song) {
        const song = station.now_playing.song;
        setSongTitle(song.title || "");
        setSongArtist(song.artist || "");
        setAlbumArt(song.art || "");
      }
    } catch {
      // Silently fail — keep last known info or defaults
    }
  }, []);

  // Poll nowplaying every 15s
  useEffect(() => {
    fetchNowPlaying();
    const id = setInterval(fetchNowPlaying, 15_000);
    return () => clearInterval(id);
  }, [fetchNowPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const stopPlayback = useCallback(() => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startPlayback = useCallback(() => {
    // Fresh audio element each time
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    const onError = () => {
      setIsPlaying(false);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
    audio.addEventListener("error", onError);

    // Safari supports HLS natively
    if (audio.canPlayType("application/vnd.apple.mpegurl")) {
      audio.src = HLS_STREAM_URL;
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_STREAM_URL);
      hls.attachMedia(audio);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      });
      hls.on(Hls.Events.ERROR, () => {
        setIsPlaying(false);
        hls.destroy();
        hlsRef.current = null;
      });
      hlsRef.current = hls;
    }
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  const displayText = songTitle
    ? `${songArtist ? `${songArtist} — ` : ""}${songTitle}`
    : "LEVELING FM";

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] w-full bg-black border-b border-white/10 h-[50px] px-4 sm:px-8 lg:px-[136px] flex items-center">
      <div className="flex items-center justify-between w-full max-w-[1008px] mx-auto">
        {/* Left spacer */}
        <div className="flex-1 h-[23px]" />

        {/* Center - Radio player */}
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity group"
          >
            {/* Album art */}
            <div className="w-[30px] h-[31px] rounded-[7px] overflow-hidden relative shrink-0">
              {albumArt ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={albumArt}
                  alt="Album Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src="/images/radio-pochette.png"
                  alt="Album Cover"
                  fill
                  sizes="30px"
                  className="object-cover"
                />
              )}

              {/* Play/Pause overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                {isPlaying ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                    <rect x="1" y="1" width="3" height="8" rx="0.5" />
                    <rect x="6" y="1" width="3" height="8" rx="0.5" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                    <path d="M2 1.5v7l6.5-3.5z" />
                  </svg>
                )}
              </div>
            </div>

            {/* Song info */}
            <div className="flex flex-col max-w-[120px] overflow-hidden">
              <span className="font-manrope font-extrabold text-[#dbdbdb] text-[10px] leading-normal truncate">
                {displayText}
              </span>
              {songTitle && (
                <span className="font-manrope text-[#868686] text-[8px] leading-normal">
                  LEVELING FM
                </span>
              )}
            </div>

            {/* Sound indicator */}
            <div className="flex items-center gap-[3px] h-[11px]">
              {isPlaying ? (
                <>
                  <span className="w-[2px] h-full bg-[#C29FFF] animate-[eq_0.6s_ease-in-out_infinite_alternate]" />
                  <span className="w-[2px] h-[70%] bg-[#C29FFF] animate-[eq_0.6s_ease-in-out_0.2s_infinite_alternate]" />
                  <span className="w-[2px] h-[40%] bg-[#C29FFF] animate-[eq_0.6s_ease-in-out_0.4s_infinite_alternate]" />
                </>
              ) : (
                <div className="relative w-[11px] h-[11px]">
                  <Image
                    src="/images/radio-sound.svg"
                    alt="Sound"
                    fill
                    className="object-contain opacity-50"
                  />
                </div>
              )}
            </div>
          </button>

          {/* Volume slider */}
          <div className="flex items-center gap-1.5 ml-1">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                setVolume(v);
                if (audioRef.current) audioRef.current.volume = v;
              }}
              className="w-[48px] h-[3px] appearance-none bg-white/15 rounded-full cursor-pointer accent-[#C29FFF] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[8px] [&::-webkit-slider-thumb]:h-[8px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C29FFF] [&::-moz-range-thumb]:w-[8px] [&::-moz-range-thumb]:h-[8px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#C29FFF] [&::-moz-range-thumb]:border-0"
            />
          </div>
        </div>

        {/* Right - Support + Language */}
        <div className="flex-1 flex items-center justify-end gap-[32px]">
          <span className="font-manrope font-extrabold text-[#dbdbdb] text-[10px] leading-normal">
            {t("support")}
          </span>
          <LanguageSwitcher compact />
        </div>
      </div>
    </div>
  );
}
