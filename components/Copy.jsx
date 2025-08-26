"use client";
import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { use } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Copy({children, animateOnScroll = true, delay = 0, duration = 1, stagger = 0.1, scrollStart = "top 75%", useObserver = false}) {
    const containerRef = useRef(null);
    const elementRef = useRef([]);
    const splitRef = useRef([]);
    const lines = useRef([]);


    const [observerActive, setObserverActive] = useState(!useObserver);

    useEffect(() => {
        if (!useObserver) return;
        if (!containerRef.current) return;

        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setObserverActive(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [useObserver]);

    useLayoutEffect(() => {
        if (!containerRef.current) return;
        splitRef.current = [];
        elementRef.current = [];
        lines.current = [];

        let elements = [];
        if (containerRef.current.hasAttribute("data-copy-wrapper")) {
            elements = Array.from(containerRef.current.children);
        } else {
            elements = [containerRef.current];
        }

        elements.forEach((element) => {
            elementRef.current.push(element);
            const split = new SplitText(element, { type: "lines", mask: "lines", linesClass: "lines++" });
            splitRef.current.push(split);
            const computedStyle = window.getComputedStyle(element);
            const textIndent = computedStyle.textIndent;
            if (textIndent && textIndent !== "0px") {
                if (split.lines.length > 0) {
                    split.lines[0].style.padding = textIndent;
                }
                element.style.textIndent = "0";
            }
            lines.current.push(...split.lines);
        });
        gsap.set(lines.current, { y: "100%" });
        return () => {
            splitRef.current.forEach((split) => {
                if (split) split.revert();
            });
        };
    }, []);

    useGSAP(() => {
        if (!containerRef.current || (useObserver && !observerActive)) return;
        const animationProps = {
            y: "0%",
            duration,
            stagger,
            ease: "power4.out",
            delay: delay,
        };
        if(animateOnScroll && !useObserver) {
            gsap.to(lines.current, {
                ...animationProps, scrollTrigger: {
                    trigger: containerRef.current,
                    start: scrollStart,
                    once: true,
                },
            });
        } else if (useObserver && observerActive) {
            gsap.to(lines.current, animationProps);
        } else if (!animateOnScroll) {
            gsap.to(lines.current, animationProps);
        }
    }, [animateOnScroll, delay, observerActive, useObserver]);

   if (React.Children.count(children) === 1) {
    return React.cloneElement(children, { ref: containerRef });
  }

    return (
        <div ref={containerRef} data-copy-wrapper="true">
            {children}
        </div>
    );
}