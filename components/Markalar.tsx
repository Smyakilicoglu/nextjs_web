"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Markalar() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const track = container.querySelector(".markalar") as HTMLElement | null;
    if (!track) return;

    const run = async () => {
      const imgs = Array.from(track.querySelectorAll("img")) as HTMLImageElement[];
      await Promise.all(
        imgs.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise<void>((res) => img.addEventListener("load", () => res(), { once: true }))
        )
      );

      track.innerHTML += track.innerHTML;

      const segmentWidth = track.scrollWidth / 2; 
      const speed = 140; 

      gsap.killTweensOf(track);
      gsap.set(track, { x: 0 });

      gsap.to(track, {
        x: `-=${segmentWidth}`,
        duration: segmentWidth / speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => (parseFloat(x) % -segmentWidth)), 
        },
      });
    };

    run();
    return () => gsap.killTweensOf(track);
  }, []);

  return (
    <div
      ref={containerRef}
      className="proje-markalar w-full absolute top-1/2 left-0 -translate-y-1/2 overflow-hidden z-0"
    >
      <div className="markalar flex">
        {[
          { src: "/emsal_logo1.png", alt: "Emsal" },
          { src: "/tarvina_logo1.png", alt: "Tarvina" },
          { src: "/tarvip_logo1.png", alt: "Tarvip" },
          { src: "/balerion_logo1.png", alt: "Balerion" },
          { src: "/tahsilatE_logo1.png", alt: "Tahsilate" },
        ].map((it) => (
          <div
            key={it.alt}
            className="basis-1/5 shrink-0 h-[clamp(160px,16vw,260px)] flex items-center justify-center"
          >
            <div className="w-[94%] h-[86%] rounded-2xl ring-1 ring-black/10 shadow-sm flex items-center justify-center bg-white/70 backdrop-blur">
              <img
                src={it.src}
                alt={it.alt}
                className="max-h-[82%] w-auto object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
