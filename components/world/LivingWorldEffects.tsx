"use client";

import React from "react";
import { CinematicClouds } from "@/components/world/CinematicClouds";
import { RealisticRiverWater } from "@/components/world/RealisticRiverWater";
import { LivingButterflies } from "@/components/world/LivingButterflies";
import { LivingWorld3DAtmosphere } from "@/components/world/LivingWorld3DAtmosphere";

/**
 * LivingWorldEffects
 * Assembles the full suite of alive, 2.5D animated atmospheric elements:
 * 1. Cinematic Clouds drifting continuously Left to Right across the sky.
 * 2. Realistic River Water: 60fps HTML5 fluid sine wave caustics, sun glints & interactive ripples.
 * 3. Living Butterflies: All 5 butterflies flying with 3D wing-flapping and flight paths.
 * 4. 3D Atmosphere: Volumetric sunbeams from the sun, drifting pollen motes, and falling leaves.
 */
export const LivingWorldEffects: React.FC = () => {
  return (
    <>
      {/* 1. Clouds drifting Left to Right across the sky */}
      <CinematicClouds />

      {/* 2. Realistic River Water with fluid caustics and ripples */}
      <RealisticRiverWater />

      {/* 3. All 5 flying butterflies fluttering across the world */}
      <LivingButterflies />

      {/* 4. 3D Atmosphere: Sunbeams, floating sun pollen & drifting leaves */}
      <LivingWorld3DAtmosphere />
    </>
  );
};
