export function checkFacePresence(faceCount, faceSizeRatio) {
  if (faceCount < 1) {
    return { ok: false, message: "No face detected. Center your face in frame." };
  }
  if (faceSizeRatio < 0.2) {
    return { ok: false, message: "Face too small. Move closer to the camera." };
  }
  return { ok: true };
}

export function checkExposure(histogram) {
  const total = histogram.reduce((sum, v) => sum + v, 0) || 1;
  const highlights = histogram.slice(-20).reduce((sum, v) => sum + v, 0) / total;
  const shadows = histogram.slice(0, 20).reduce((sum, v) => sum + v, 0) / total;
  if (highlights > 0.35) {
    return { ok: false, message: "Too bright. Find softer, indirect light." };
  }
  if (shadows > 0.35) {
    return { ok: false, message: "Too dark. Move to brighter, even lighting." };
  }
  return { ok: true };
}

export function checkColorCast(avgRgb) {
  const { r, g, b } = avgRgb;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max - min > 50) {
    return { ok: false, message: "Strong color cast detected. Try neutral lighting." };
  }
  return { ok: true };
}

export function checkBlur(laplacianVariance) {
  if (laplacianVariance < 80) {
    return { ok: false, message: "Photo is blurry. Hold still and retake." };
  }
  return { ok: true };
}

export function runQualityChecks({ faceCount, faceSizeRatio, histogram, avgRgb, laplacianVariance }) {
  const checks = [
    checkFacePresence(faceCount, faceSizeRatio),
    checkExposure(histogram),
    checkColorCast(avgRgb),
    checkBlur(laplacianVariance),
  ];
  const failures = checks.filter((check) => !check.ok).map((check) => check.message);
  return {
    ok: failures.length === 0,
    failures,
  };
}
