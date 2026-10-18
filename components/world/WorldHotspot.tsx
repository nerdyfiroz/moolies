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
 * Clean, seamless interactive hotspot over artwork landmarks.
 * No hover glows or colored outline boxes. Triggers modal opening on click/tap with cursor: pointer.
 */
export const WorldHotspot: React.FC<WorldHotspotProps> = ({
  hotspot,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
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
      className={`absolute z-20 cursor-pointer select-none bg-transparent border-0 ring-0 outline-none p-0 m-0 focus:outline-none transition-none ${
        hotspot.borderRadius || "rounded-2xl"
      }`}
      onClick={handleClick}
      aria-label={`${hotspot.title} — ${hotspot.subtitle}`}
      title={hotspot.title}
    />
  );
};
