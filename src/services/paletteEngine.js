import palettes from "../data/palettes.json";
import { depthToBucket } from "./toneAnalyze";

export function getPaletteForTone({ undertone, depth }) {
  const bucket = depthToBucket(depth);
  const undertoneData = palettes.undertone[undertone] || palettes.undertone.neutral;
  const matched = undertoneData.depthBuckets.find((b) => b.id === bucket.id);
  return {
    undertone,
    depth,
    depthBucket: bucket,
    recommendedColors: matched?.recommendedColors || [],
    makeupFamilies: matched?.makeupFamilies || {},
  };
}
