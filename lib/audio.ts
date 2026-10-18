// Procedural Sound Engine - Muted/Disabled per user request
// All sounds removed. Safe no-op methods provided to avoid broken imports.

class SilentSoundEngine {
  public toggleMute(): boolean {
    return true;
  }

  public getIsPlaying(): boolean {
    return false;
  }

  public playPop(): void {}
  public playChime(): void {}
  public playWoodKnock(): void {}
  public playWaterSplash(): void {}
  public startAmbient(): void {}
  public stopAmbient(): void {}
}

export const soundEngine = new SilentSoundEngine();
export default soundEngine;
