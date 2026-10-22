"use client";

import React from "react";

export interface InteractiveHotspot {
  id: string;
  title: string;
  subtitle: string;
  actionText?: string;
  left: number; // percentage (0 to 100)
  top: number; // percentage (0 to 100)
  width: number; // percentage (0 to 100)
  height: number; // percentage (0 to 100)
  borderRadius?: string;
  badgeText?: string;
  accentColor?: string;
  soundType?: "chime" | "wood" | "water" | "pop";
}

interface WorldHotspotProps {
  hotspot: {
    id: string;
    title: string;
    subtitle: string;
    left: number;
    top: number;
    width: number;
    height: number;
    borderRadius?: string;
    badgeText?: string;
    accentColor?: string;
  };
  onClick: (id: string) => void;
  isActive?: boolean;
}

/**
 * WorldHotspot
 * Interactive hotspot over artwork landmarks.
 * When active, remains sharply unblurred with subtle highlight.
 */
export const WorldHotspot = ({
  hotspot,
  onClick,
  isActive = false,
}: WorldHotspotProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(hotspot.id);
  };

  return (
    <button
      type="button"
      data-hotspot={hotspot.id}
      style={{
        left: `${hotspot.left}%`,
        top: `${hotspot.top}%`,
        width: `${hotspot.width}%`,
        height: `${hotspot.height}%`,
      }}
      className={`absolute z-20 cursor-pointer select-none outline-none p-0 m-0 focus:outline-none transition-all duration-300 ${
        hotspot.borderRadius || "rounded-2xl"
      } ${
        isActive
          ? "filter-none ring-2 ring-purple-300/80 bg-purple-500/20 shadow-[0_0_30px_rgba(217,70,239,0.7)]"
          : "bg-transparent border-0 ring-0"
      }`}
      onClick={handleClick}
      aria-label={`${hotspot.title} — ${hotspot.subtitle}`}
      title={hotspot.title}
    />
  );
};
