"use client";

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

import { motion } from "framer-motion";

export type AvatarHandle = {
  play: () => void;
  pause: () => void;
  isPlaying: () => boolean;
};

export type AvatarProps = {
  transcript?: string;
  imageSrc?: string;
  videoSrc?: string;
  alt?: string;
};

export const Avatar = forwardRef<AvatarHandle, AvatarProps>(
  ({ transcript, imageSrc, videoSrc, alt = "Avatar" }, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

    const [speaking, setSpeaking] = useState(false);

    useEffect(() => {
      return () => {
        window.speechSynthesis.cancel();
        utterRef.current = null;
      };
    }, []);

    async function ensureVideoReady() {
      const v = videoRef.current;

      if (!v) return;

      if (v.readyState < 2) {
        await new Promise<void>((res) => {
          const onLoaded = () => {
            v.removeEventListener("loadedmetadata", onLoaded);
            res();
          };

          v.addEventListener("loadedmetadata", onLoaded);
        });
      }
    }

    const startSpeaking = async () => {
      if (!transcript) return;

      const v = videoRef.current;

      if (v) {
        try {
          await ensureVideoReady();

          v.currentTime = 0;
          await v.play();
        } catch {}
      }

      const u = new SpeechSynthesisUtterance(transcript);

      u.lang = "es-CO";
      u.rate = 0.95;
      u.pitch = 1;

      u.onstart = () => {
        setSpeaking(true);
      };

      u.onend = () => {
        setSpeaking(false);

        utterRef.current = null;

        v?.pause();
      };

      await v.play();

      window.speechSynthesis.speak(u);

      utterRef.current = u;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    };

    const stopSpeaking = () => {
      window.speechSynthesis.cancel();

      utterRef.current = null;

      setSpeaking(false);

      videoRef.current?.pause();
    };

    useImperativeHandle(ref, () => ({
      play: startSpeaking,
      pause: stopSpeaking,
      isPlaying: () => speaking,
    }));

    return (
      <div className="w-full h-full overflow-hidden">
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-muted">
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              src={imageSrc}
              alt={alt}
              className="w-full h-full object-cover"
            />
          )}

          <motion.div
            animate={speaking ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-3 right-3"
          >
            <div
              className={`h-3 w-3 rounded-full ${
                speaking ? "bg-green-400 animate-pulse" : "bg-gray-300"
              }`}
            />
          </motion.div>
        </div>
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;