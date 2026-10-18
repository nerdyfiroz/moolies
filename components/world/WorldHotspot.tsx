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
  accentColor?: string;
  soundType?: "chime" | "wood" | "water" | "pop";
}

interface WorldHotspotProps {
  hotspot: InteractiveHotspot;
  onClick: (id: string) => void;
  isActive?: boolean;
}

/**
 * 100% Invisible interactive section hotspot over the illustrated world artwork.
 * Zero borders, zero rings, zero popups/tooltips, zero shadows.
 * Only triggers cursor-pointer on hover and opens section details on click/tap.
 */
export const WorldHotspot: React.FC<WorldHotspotProps> = ({
  hotspot,
  onClick,
}) => {
  return (
    <button
      type="button"
      data-hotspot={hotspot.id}
      aria-label={`${hotspot.title} — ${hotspot.subtitle}`}
      title={hotspot.title}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(hotspot.id);
      }}
      style={{
        left: `${hotspot.left}%`,
        top: `${hotspot.top}%`,
        width: `${hotspot.width}%`,
        height: `${hotspot.height}%`,
      }}
      className={`absolute z-20 cursor-pointer bg-transparent border-0 ring-0 outline-none p-0 m-0 select-none focus:outline-none transition-none ${
        hotspot.borderRadius || ""
      }`}
    />
  );
};
