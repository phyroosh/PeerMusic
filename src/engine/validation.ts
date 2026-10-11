import { TimelineData, SceneConfig, LyricWord } from "./types";

export interface ValidationError {
  type: "ERROR" | "WARNING";
  path: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  timeline: TimelineData;
}

/**
 * Applies unique ID-based manual overrides and strictly validates
 * the timeline structure and temporal ordering.
 */
export function applyOverridesAndValidate(rawTimeline: TimelineData): ValidationResult {
  const errors: ValidationError[] = [];
  const wordIdMap = new Map<string, { word: LyricWord; scene: SceneConfig }>();

  // Deep clone timeline to avoid mutating original
  const timeline: TimelineData = JSON.parse(JSON.stringify(rawTimeline));

  // 1. Index all words by unique ID and check for duplicates
  for (const scene of timeline.scenes) {
    if (scene.startFrame >= scene.endFrame) {
      errors.push({
        type: "ERROR",
        path: `scenes[${scene.id}]`,
        message: `Scene '${scene.id}' has invalid frames: startFrame (${scene.startFrame}) >= endFrame (${scene.endFrame})`,
      });
    }

    for (const line of scene.lines) {
      for (const word of line.words) {
        if (!word.id) {
          errors.push({
            type: "ERROR",
            path: `scenes[${scene.id}].lines[${line.id}].words`,
            message: `Word '${word.text}' is missing a unique 'id'`,
          });
          continue;
        }

        if (wordIdMap.has(word.id)) {
          errors.push({
            type: "ERROR",
            path: `word[${word.id}]`,
            message: `Duplicate word ID detected: '${word.id}'`,
          });
        } else {
          wordIdMap.set(word.id, { word, scene });
        }
      }
    }
  }

  // 2. Apply manual overrides by unique ID
  if (timeline.overrides) {
    for (const [overrideId, overrideData] of Object.entries(timeline.overrides)) {
      const entry = wordIdMap.get(overrideId);
      if (!entry) {
        errors.push({
          type: "WARNING",
          path: `overrides.${overrideId}`,
          message: `Override references unknown word ID: '${overrideId}'`,
        });
        continue;
      }

      if (overrideData.startFrame !== undefined) {
        entry.word.startFrame = overrideData.startFrame;
      }
      if (overrideData.endFrame !== undefined) {
        entry.word.endFrame = overrideData.endFrame;
      }
      if (overrideData.accent !== undefined) {
        entry.word.accent = overrideData.accent;
      }
      if (overrideData.color !== undefined) {
        entry.word.color = overrideData.color;
      }
    }
  }

  // 3. Validate temporal boundaries for words within scenes
  for (const [id, { word, scene }] of wordIdMap.entries()) {
    if (word.startFrame >= word.endFrame) {
      errors.push({
        type: "ERROR",
        path: `word[${id}]`,
        message: `Word '${word.text}' (${id}) has startFrame (${word.startFrame}) >= endFrame (${word.endFrame})`,
      });
    }

    if (word.startFrame < scene.startFrame) {
      errors.push({
        type: "ERROR",
        path: `word[${id}]`,
        message: `Word '${word.text}' (${id}) starts before parent scene: ${word.startFrame} < ${scene.startFrame}`,
      });
    }

    if (word.endFrame > scene.endFrame) {
      errors.push({
        type: "WARNING",
        path: `word[${id}]`,
        message: `Word '${word.text}' (${id}) ends after parent scene: ${word.endFrame} > ${scene.endFrame}`,
      });
    }
  }

  const hasFatalErrors = errors.some((e) => e.type === "ERROR");

  return {
    valid: !hasFatalErrors,
    errors,
    timeline,
  };
}
