import { useMemo } from "react";
import { staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";

export interface AudioVisualizationData {
  frequencies: number[];
  bassEnergy: number;      // 0.0 - 1.0 (sub-bass & kick drum pulse)
  midEnergy: number;       // 0.0 - 1.0 (vocals, chords, body)
  highEnergy: number;      // 0.0 - 1.0 (hi-hats, air, transients)
  overallEnergy: number;   // 0.0 - 1.0 (composite volume)
  isAudioLoaded: boolean;
}

/**
 * Custom hook that analyzes the active audio track frame-by-frame,
 * extracting frequency bands and rhythmic energies for audio-reactive motion design.
 */
export const useAudioVisualization = (
  audioSrc?: string,
  numberOfSamples: 16 | 32 | 64 | 128 | 256 = 64
): AudioVisualizationData => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Resolve audio path
  const resolvedSrc = useMemo(() => {
    if (!audioSrc) return undefined;
    if (audioSrc.startsWith("http://") || audioSrc.startsWith("https://") || audioSrc.startsWith("data:")) {
      return audioSrc;
    }
    const cleanPath = audioSrc.startsWith("/") ? audioSrc.slice(1) : audioSrc;
    return staticFile(cleanPath);
  }, [audioSrc]);

  // Decode audio data via Remotion Web Audio API
  const audioData = useAudioData(resolvedSrc || "");

  return useMemo(() => {
    if (!audioData) {
      // Elegant rhythmic fallback while audio decodes
      const t = frame / fps;
      const beat1 = Math.abs(Math.sin(t * Math.PI * 2 * 1.8)); // ~108 BPM pulse
      const beat2 = Math.abs(Math.cos(t * Math.PI * 2 * 0.9));
      const fallbackFrequencies = Array.from({ length: numberOfSamples }).map((_, i) => {
        const norm = (i - numberOfSamples / 2) / (numberOfSamples / 2);
        const env = Math.exp(-norm * norm * 2.0);
        return Math.max(0.08, (beat1 * 0.6 + beat2 * 0.4) * env);
      });

      const avg = (beat1 + beat2) * 0.35;
      return {
        frequencies: fallbackFrequencies,
        bassEnergy: Math.min(1, beat1 * 0.7),
        midEnergy: Math.min(1, avg * 0.6),
        highEnergy: Math.min(1, beat2 * 0.5),
        overallEnergy: Math.min(1, avg),
        isAudioLoaded: false,
      };
    }

    try {
      const frequencies = visualizeAudio({
        fps,
        frame,
        audioData,
        numberOfSamples,
      });

      // Split into frequency ranges
      const sampleCount = frequencies.length;
      const bassCount = Math.max(2, Math.floor(sampleCount * 0.12));
      const midCount = Math.floor(sampleCount * 0.45);

      const bassSlice = frequencies.slice(0, bassCount);
      const midSlice = frequencies.slice(bassCount, bassCount + midCount);
      const highSlice = frequencies.slice(bassCount + midCount);

      const calcAvg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

      const bassEnergy = Math.min(1, calcAvg(bassSlice) * 1.4);
      const midEnergy = Math.min(1, calcAvg(midSlice) * 1.5);
      const highEnergy = Math.min(1, calcAvg(highSlice) * 1.8);
      const overallEnergy = Math.min(1, (bassEnergy * 0.5 + midEnergy * 0.35 + highEnergy * 0.15));

      return {
        frequencies,
        bassEnergy,
        midEnergy,
        highEnergy,
        overallEnergy,
        isAudioLoaded: true,
      };
    } catch {
      // In case of any timing boundary issue
      return {
        frequencies: Array.from({ length: numberOfSamples }).fill(0.1) as number[],
        bassEnergy: 0.2,
        midEnergy: 0.15,
        highEnergy: 0.1,
        overallEnergy: 0.18,
        isAudioLoaded: false,
      };
    }
  }, [audioData, frame, fps, numberOfSamples]);
};
