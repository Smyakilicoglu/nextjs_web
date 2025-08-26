"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useRef } from "react";
import { usePathname } from "next/navigation";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export function useRevealer() {
  const isFirstLoad = useRef(true); // sayfanın ilk yüklemesini takip etmek için
  const pathname = usePathname();

  useGSAP(() => {
    if (isFirstLoad.current) {
      // İlk yüklemede animasyonu çalıştırma, sadece gizle
      isFirstLoad.current = false;
      gsap.set(".revealer", { scaleY: 0 });
      return;
    }

    // Sonraki sayfa geçişlerinde animasyonu çalıştır
    gsap.to(".revealer", {
      scaleY: 0,
      duration: 1.25,
      delay: 0.2,
      ease: "hop",
    });
  }, [pathname]); // pathname değiştiğinde animasyonu tetikle
}
