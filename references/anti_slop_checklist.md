# The Anti-Slop Quality Control Checklist

Every AI model is naturally biased toward generating simplistic, PowerPoint-like animations when tasked with motion design.
**Before any Manim code is finalized or rendered, the agent MUST run this checklist against its code.**

---

## The 10 Deadly Sins (STRICTLY FORBIDDEN)

1. ❌ **Default Math Fonts:** Using LaTeX `Tex` or `MathTex` with default Computer Modern font for music lyrics. *Always use `Text` or `MarkupText` with specified typography stacks.*
2. ❌ **Center-Screen Monoliths:** Centering a static paragraph of text in the middle of the frame and letting it sit there for 4 seconds without micro-motion.
3. ❌ **Robotic Linear Transitions:** Using `rate_func=linear` or unconfigured default `smooth` for text entrances. *Always use aggressive cubic Béziers (`EASE_OUT_EXPO`) or physics springs (`EASE_SPRING`).*
4. ❌ **Unsynchronized Blocks:** Fading in entire sentences at once instead of staggering word-by-word reveals locked to the singer's vocal delivery.
5. ❌ **Frozen Camera Syndrome:** Leaving the camera completely motionless for more than 2 seconds. *Every scene must feature continuous subtle cinematic drift or dynamic reframing.*
6. ❌ **Pure Black & White PowerPoint Contrast:** Using stark raw `#000000` background with pure unstyled `#FFFFFF` text without depth, grain, ambient micro-elements, or editorial hierarchy.
7. ❌ **Audio-Visual Timing Drift:** Guessing timestamps (`self.wait(2)`) instead of using millisecond-accurate audio analysis.
8. ❌ **Devanagari Unicode Glitches:** Using LaTeX renderers that drop Hindi matras or produce question marks. *Always use Pango `Text` or `MarkupText` with verified Devanagari fonts.*
9. ❌ **Edge Collision & Safe-Zone Violations:** Allowing text or accents to touch or clip past the camera viewport.
10. ❌ **Lossy Audio Re-encoding:** Rendering Manim's internal basic sound engine instead of performing pristine, lossless FFmpeg stream muxing from the original master audio.

---

## The 10 Mandatory Quality Gates (MUST PASS ALL)

| Gate | Requirement | Verification Method |
| :--- | :--- | :--- |
| **1. Art System** | Archetype explicitly declared (e.g. Swiss Brutalist, Sufi Midnight). | Hex palette locked to 60-30-10 rule. |
| **2. Typography** | Explicit font specified from curated stack with weights. | Verified via `Text(font=..., weight=...)`. |
| **3. Micro-Timing** | Every word entrance is mapped to exact audio timestamps. | Audio sync offset verified < 30ms. |
| **4. Easing Physics** | All entrances use `EASE_OUT_EXPO`, `EASE_SPRING`, or `EASE_WHIP`. | No naked `smooth` or `linear` on text reveals. |
| **5. Kinetic Hierarchy**| Key emotional words have distinct weight/color/scale emphasis. | Emotional keywords visually pop on vocal crests. |
| **6. Camera Motion** | Camera breathes with continuous drift or whip-pans between stanzas. | `MovingCameraScene` used with active frame animators. |
| **7. Polish Layer** | Ambient dust, subtle editorial HUD, or film grain present. | Frame has editorial depth and texture. |
| **8. Modular Scenes** | Long tracks partitioned into 4–10 second discrete scene classes. | Prevents Manim OOM and allows instant re-renders. |
| **9. 60 FPS Master** | Rendered at `--fps 60` and at least `-qh` (1080p) or `-qk` (4K). | Fluid motion with zero frame stutter. |
| **10. Lossless Audio**| FFmpeg muxes original audio stream (`-c:a copy`) with video. | Original master fidelity preserved 100%. |
