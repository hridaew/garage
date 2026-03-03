"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const items = ["🐕", "🎃", "👻", "🐩", "🦇", "🐾", "🕷️", "🧛"];

export default function EasterEgg() {
    const [clicks, setClicks] = useState(0);
    const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (clicks >= 1) {
            triggerAnimation();
            setClicks(0); // Reset after triggering
        }
    }, [clicks]);

    const handleClick = () => {
        setClicks((prev) => prev + 1);

        // Reset clicks if not clicked again within 1.5 seconds
        if (clickTimeout.current) {
            clearTimeout(clickTimeout.current);
        }
        clickTimeout.current = setTimeout(() => {
            setClicks(0);
        }, 1500);
    };

    const triggerAnimation = () => {
        if (!containerRef.current) return;

        const count = 30; // Number of floating items
        const elements: HTMLDivElement[] = [];

        for (let i = 0; i < count; i++) {
            const el = document.createElement("div");
            el.innerText = items[Math.floor(Math.random() * items.length)];
            el.style.position = "fixed";
            el.style.fontSize = `${Math.random() * 2 + 1.5}rem`;
            el.style.left = `${Math.random() * 100}vw`;
            el.style.top = "100vh";
            el.style.zIndex = "9999";
            el.style.pointerEvents = "none";
            el.style.userSelect = "none";
            containerRef.current.appendChild(el);
            elements.push(el);
        }

        elements.forEach((el) => {
            const duration = Math.random() * 3 + 2;
            const xOffset = (Math.random() - 0.5) * 200;

            gsap.to(el, {
                y: "-120vh",
                x: `+=${xOffset}`,
                rotation: Math.random() * 360 - 180,
                opacity: Math.random() * 0.5 + 0.5,
                duration: duration,
                ease: "power1.out",
                onComplete: () => {
                    if (containerRef.current?.contains(el)) {
                        containerRef.current.removeChild(el);
                    }
                },
            });
        });
    };

    return (
        <>
            <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />
            <span
                onClick={handleClick}
                className="cursor-pointer select-none"
                title="Double click... wait, click a few more times!"
            >
                1880
            </span>
        </>
    );
}
