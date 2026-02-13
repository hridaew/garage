"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Magnetic from "@/components/motion/Magnetic";

export interface PremiumButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "lilac";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  magnetic?: boolean;
  disabled?: boolean;
  tactile?: boolean;
  celebrateOnRelease?: boolean;
}

const variantClasses: Record<NonNullable<PremiumButtonProps["variant"]>, string> = {
  primary:
    "premium-btn--primary text-white hover:text-white active:text-white",
  ghost:
    "bg-white text-garage-black border border-garage-border hover:border-[#8f79dc] hover:bg-garage-lilacSoft",
  lilac:
    "bg-[#8f79dc] text-white border border-[#7f6aca] hover:bg-[#7f6aca] active:bg-[#715cbf]",
};

const sizeClasses: Record<NonNullable<PremiumButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm rounded-[0.8rem]",
  md: "px-6 py-3 text-sm md:text-base rounded-[0.9rem]",
  lg: "px-8 py-4 text-base md:text-lg rounded-[1rem]",
};

export default function PremiumButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className = "",
  magnetic = false,
  disabled = false,
  tactile = true,
  celebrateOnRelease = false,
}: PremiumButtonProps) {
  const [pressed, setPressed] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const sparks = useMemo(
    () => [
      { x: -18, y: -24, d: 0 },
      { x: 0, y: -30, d: 0.02 },
      { x: 18, y: -24, d: 0.04 },
      { x: -24, y: -8, d: 0.01 },
      { x: 24, y: -8, d: 0.03 },
      { x: 0, y: -14, d: 0.05 },
    ],
    []
  );

  const sparkles = useMemo(
    () => [
      { x: -28, y: -32, d: 0, color: "#c9a84c" },
      { x: 12, y: -38, d: 0.03, color: "#a28de8" },
      { x: 30, y: -20, d: 0.05, color: "#dbc872" },
      { x: -32, y: -14, d: 0.02, color: "#9177e8" },
      { x: 22, y: -30, d: 0.06, color: "#c9a84c" },
      { x: -10, y: -40, d: 0.04, color: "#a28de8" },
      { x: 34, y: -10, d: 0.07, color: "#dbc872" },
      { x: -22, y: -36, d: 0.01, color: "#9177e8" },
    ],
    []
  );

  const classes = `premium-btn relative inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-[transform,color,background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-garage-lilac focus-visible:ring-offset-2 focus-visible:ring-offset-garage-canvas disabled:opacity-60 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${pressed && tactile ? "scale-[0.97]" : ""} ${className}`;

  const triggerCelebrate = () => {
    if (!celebrateOnRelease || disabled) return;
    setBurstKey((prev) => prev + 1);
  };

  const handlePressStart = () => {
    if (!tactile || disabled) return;
    setPressed(true);
  };

  const handlePressEnd = () => {
    if (!tactile || disabled) return;
    setPressed(false);
  };

  const content = (
    <>
      {iconPosition === "left" ? <span className="btn-content text-current">{icon}</span> : null}
      <span className="btn-content">{children}</span>
      {iconPosition === "right" ? <span className="btn-content text-current">{icon}</span> : null}
    </>
  );

  const bursts = celebrateOnRelease ? (
    <span className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
      <span key={`ring-${burstKey}`} className="btn-burst-ring" />
      {sparks.map((spark, index) => (
        <span
          key={`spark-${burstKey}-${index}`}
          className="btn-burst-spark"
          style={{
            ["--spark-x" as string]: `${spark.x}px`,
            ["--spark-y" as string]: `${spark.y}px`,
            animationDelay: `${spark.d}s`,
          }}
        />
      ))}
      {sparkles.map((sparkle, index) => (
        <span
          key={`sparkle-${burstKey}-${index}`}
          className="btn-burst-sparkle"
          style={{
            ["--sparkle-x" as string]: `${sparkle.x}px`,
            ["--sparkle-y" as string]: `${sparkle.y}px`,
            ["--sparkle-color" as string]: sparkle.color,
            animationDelay: `${sparkle.d}s`,
          }}
        />
      ))}
    </span>
  ) : null;

  const element = href ? (
    <Link
      href={href}
      className={classes}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
        triggerCelebrate();
      }}
      onPointerDown={handlePressStart}
      onPointerUp={handlePressEnd}
      onPointerCancel={handlePressEnd}
      onPointerLeave={handlePressEnd}
      onBlur={handlePressEnd}
    >
      {content}
      {bursts}
    </Link>
  ) : (
    <button
      type={type}
      onClick={(event) => {
        onClick?.(event);
        triggerCelebrate();
      }}
      className={classes}
      disabled={disabled}
      onPointerDown={handlePressStart}
      onPointerUp={handlePressEnd}
      onPointerCancel={handlePressEnd}
      onPointerLeave={handlePressEnd}
      onBlur={handlePressEnd}
    >
      {content}
      {bursts}
    </button>
  );

  return magnetic ? <Magnetic>{element}</Magnetic> : element;
}
