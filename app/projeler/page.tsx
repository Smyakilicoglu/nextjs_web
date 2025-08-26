"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import Markalar from "@/components/Markalar";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import Copy from "@/components/Copy";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Tarvina", img: "/tarvina.png" },
  { title: "Balerion", img: "/balerion.png" },
  { title: "Emsal", img: "/emsal.png" },
  { title: "Reborn Fitness", img: "/balerion.png" },
  { title: "Tasvip", img: "/tarvip.png" },
  { title: "Tahsilate", img: "/tahsilate.png" },
];

export default function Projeler() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (heroImgRef.current) {
      gsap.to(heroImgRef.current, {
        y: 200, 
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top+=200",
          scrub: true,
        },
      });
    }

    cardsRef.current.forEach((card) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 100, rotateX: -20 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        }
      );

      const btn = card.querySelector<HTMLDivElement>(".proje-button");
      if (!btn) return;
      gsap.fromTo(
        btn,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: 0.4,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
          },
        }
      );
    });
  }, []);

  return (
    <>
      <div className="revealer"></div>
      <section className="hero relative w-full h-[80vh] overflow-hidden">
        <div className="hero-img absolute inset-0">
          <img
            ref={heroImgRef}
            src="/projeler.jpeg"
            alt="Hero Image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hero-text relative z-10 flex justify-center items-center h-full">
          <Copy>
            <h1 className="text-[4.25rem] font-semibold tracking-[-0.1rem] leading-[1]">
              Projeler
            </h1>
          </Copy>
        </div>
      </section>

      <section>
        <div className="relative min-h-screen py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
            {projects.map((proje, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                className="proje relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl 
                           bg-white cursor-pointer group perspective
                           transition-all duration-500 ease-out hover:bg-brand"
              >
                <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
                  <img
                    src={proje.img}
                    alt={proje.title}
                    className="max-h-[82%] w-auto object-cover scale-105 group-hover:scale-110 transition-all duration-700 ease-out"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div
                  className="relative z-10 flex flex-col justify-end items-center h-full p-6
                             bg-black/30 backdrop-blur-[2px] transition-all duration-700 ease-out
                             group-hover:bg-black/0 group-hover:backdrop-blur-0"
                >
                  <h2 className="text-2xl font-bold mb-4 transition-colors duration-300 group-hover:text-white">
                    {proje.title}
                  </h2>
                  <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
                                  transition-all duration-500 ease-out">
                    <Button className="mt-3 flex items-center gap-2 bg-primary text-black">
                      <Link href="/" className="flex items-center gap-2">
                        İncele <ChevronsRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mt-32 mb-32">
        <Markalar />
      </section>
    </>
  );
}
