import { analyzeTone, rgbToLab } from "../src/services/toneAnalyze";

const warmSamples = Array.from({ length: 40 }, () => ({ r: 190, g: 150, b: 120 }));
const coolSamples = Array.from({ length: 40 }, () => ({ r: 170, g: 160, b: 185 }));

describe("tone analysis", () => {
  it("converts RGB to Lab", () => {
    const lab = rgbToLab({ r: 255, g: 255, b: 255 });
    expect(lab.L).toBeGreaterThan(90);
  });

  it("detects warmer undertone", () => {
    const result = analyzeTone(warmSamples, 0.9);
    expect(result.undertone).toBe("warm");
  });

  it("detects cool undertone", () => {
    const result = analyzeTone(coolSamples, 0.9);
    expect(result.undertone).toBe("cool");
  });
});
