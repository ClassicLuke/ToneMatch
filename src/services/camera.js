export async function captureSamplePixels() {
  const samples = [];
  for (let i = 0; i < 60; i += 1) {
    samples.push({
      r: 180 + Math.floor(Math.random() * 20),
      g: 140 + Math.floor(Math.random() * 15),
      b: 120 + Math.floor(Math.random() * 10),
    });
  }
  return samples;
}

export function mockHistogram() {
  return Array.from({ length: 256 }, (_, i) => (i > 30 && i < 220 ? 10 : 1));
}
