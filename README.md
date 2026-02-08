# ToneMatch (MVP Prototype)

ToneMatch is a privacy-first, cross-platform (Expo React Native) prototype that suggests makeup shades, trending looks, and outfit colors based on a single selfie taken with no makeup and no filter. The MVP runs all analysis locally in JS and uses curated JSON data for palettes and looks.

## Key principles
- **Privacy-first:** process on-device where possible. No storage of biometrics or identity inference.
- **No sensitive inference:** tone depth + undertone only (no race/ethnicity, age, attractiveness).
- **Transparency:** confidence score + manual adjustment screen.
- **Lighting robustness:** quality checks + retake guidance.

## Tech stack
- React Native (Expo SDK 51)
- React Navigation
- Local JSON datasets for palettes + trending looks

## Running the app
```bash
npm install
npm run start
```

> **Note:** The current build uses a demo capture pipeline (no live camera). Replace `src/services/camera.js` and `src/services/faceDetect.js` with real camera + landmark integrations (e.g., MediaPipe via native modules) for production.

## App flow
1. **Onboarding** → privacy + photo guidance
2. **Capture** → quality checks + analysis
3. **Results** → tone depth + undertone + palette + makeup families
4. **Adjust** → manual overrides
5. **Trending looks** → curated looks by tone
6. **Stencil** → guided overlay prototype

## Architecture
```
src/
  components/      (Swatch UI)
  data/            (palettes.json, looks.json)
  models/          (types)
  screens/         (Onboarding, Capture, Results, Adjust, Trending, Stencil)
  services/        (camera, qualityCheck, faceDetect, toneAnalyze, paletteEngine, lookEngine)
```

## Analysis approach (MVP heuristic)
1. Detect face + landmarks (stubbed).
2. Sample cheek + jawline pixels (mocked sample data).
3. Trim outliers with IQR.
4. Convert RGB → Lab.
5. **Depth** = normalized inverse of L*.
6. **Undertone** from a*/b* heuristics.
7. **Confidence** = undertone separation × lighting score.

## Tests
```bash
npm test
```

## TODO (v2)
- Replace mock camera pipeline with live capture + landmark detection.
- Add exposure/color cast correction and white balance calibration.
- Provide brand-specific foundation matching (opt-in).
- Save looks/favorites with local storage.
- Add user accounts (opt-in) and sync.
- Support multiple selfies and seasonal palettes.
- Improve AR overlay with face mesh.

## Privacy + guardrails
- Photos should be processed on-device.
- If a server is ever used, require explicit consent, HTTPS upload, and immediate deletion.
- Avoid definitive language; use "your photo suggests".
