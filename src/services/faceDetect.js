export async function detectFace() {
  return {
    faceCount: 1,
    faceSizeRatio: 0.35,
    landmarks: {
      leftCheek: { x: 0.35, y: 0.55 },
      rightCheek: { x: 0.65, y: 0.55 },
      jawline: { x: 0.5, y: 0.75 },
    },
  };
}
