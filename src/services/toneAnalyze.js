import { DEPTH_BUCKETS, UNDERTONES } from "../models/types";

export function rgbToLab({ r, g, b }) {
  const [nr, ng, nb] = [r, g, b].map((v) => {
    const c = v / 255;
    return c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
  });
  const x = (nr * 0.4124 + ng * 0.3576 + nb * 0.1805) / 0.95047;
  const y = (nr * 0.2126 + ng * 0.7152 + nb * 0.0722) / 1.0;
  const z = (nr * 0.0193 + ng * 0.1192 + nb * 0.9505) / 1.08883;

  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const fx = f(x);
  const fy = f(y);
  const fz = f(z);

  return {
    L: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

function iqrTrim(values) {
  if (!values.length) return values;
  const sorted = [...values].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;
  const min = q1 - 1.5 * iqr;
  const max = q3 + 1.5 * iqr;
  return sorted.filter((v) => v >= min && v <= max);
}

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export function depthToBucket(depth) {
  return (
    DEPTH_BUCKETS.find((bucket) => depth >= bucket.min && depth <= bucket.max) ||
    DEPTH_BUCKETS[DEPTH_BUCKETS.length - 1]
  );
}

export function computeUndertone({ a, b }) {
  const warmScore = b;
  const coolScore = -b + a * 0.2;
  const oliveScore = -a * 0.6 + b * 0.3;
  const neutralScore = -Math.abs(b) * 0.2 + -Math.abs(a) * 0.1;

  const scores = [
    { tone: "warm", score: warmScore },
    { tone: "cool", score: coolScore },
    { tone: "olive", score: oliveScore },
    { tone: "neutral", score: neutralScore },
  ];
  scores.sort((x, y) => y.score - x.score);
  const [best, second] = scores;
  const confidence = Math.min(1, Math.max(0.35, (best.score - second.score) / 40 + 0.6));
  return { tone: best.tone, confidence };
}

export function analyzeTone(samples, lightingScore = 0.8) {
  if (!samples || samples.length < 10) {
    return {
      depth: 50,
      depthBucket: depthToBucket(50),
      undertone: "neutral",
      undertoneConfidence: 0.4,
      explanation: "Not enough sample data; using neutral fallback.",
    };
  }

  const labs = samples.map(rgbToLab);
  const trimmedL = iqrTrim(labs.map((lab) => lab.L));
  const trimmedA = iqrTrim(labs.map((lab) => lab.a));
  const trimmedB = iqrTrim(labs.map((lab) => lab.b));

  const L = median(trimmedL);
  const a = median(trimmedA);
  const b = median(trimmedB);

  const depth = Math.round(100 - (L / 100) * 100);
  const depthBucket = depthToBucket(depth);
  const { tone, confidence } = computeUndertone({ a, b });

  const confidenceBoost = Math.min(1, Math.max(0.4, lightingScore));
  const undertoneConfidence = Math.round(confidence * confidenceBoost * 100) / 100;

  return {
    depth,
    depthBucket,
    undertone: UNDERTONES.includes(tone) ? tone : "neutral",
    undertoneConfidence,
    explanation: `Median L* ${L.toFixed(1)} mapped to depth. a* ${a.toFixed(1)} / b* ${b.toFixed(1)} used for undertone.`
  };
}
