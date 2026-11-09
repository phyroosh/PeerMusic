# PeerMusic Remotion Cover Studio Standard

## Creative source of truth

Every official PeerMusic thumbnail and single cover is an original Remotion composition. Do not use Nano Banana, `generate_image`, external image-generation APIs, externally AI-generated cover art, or a video-frame grab as the cover's final visual base.

This is not a limitation—it is an art-direction standard. Covers must carry the same authored visual language as the lyric film: controlled light, material, motion-aware composition, intentional typography, and a single clear emotional idea.

## Required song artifact

Create `src/songs/<slug>/cover/cover-plan.md` before writing the cover component. Record:

| Field | Required decision |
| --- | --- |
| Editorial idea | The one image/metaphor that makes the song identifiable at a glance |
| Focal hierarchy | What the eye sees first, second, and third |
| Palette and material | Exact colors, light sources, texture, depth, and grade |
| Type layout | Title/subtitle locations and negative-space logic |
| 16:9 composition | Native thumbnail framing—never a crop target |
| 1:1 composition | Native streaming-cover framing—never a crop of 16:9 |
| Brand treatment | Whether/how the circular PeerMusic badge supports the composition |

## Implementation contract

1. Create `src/songs/<slug>/cover/<Slug>Cover.tsx` using SVG, CSS, Remotion primitives, authored typography, and any user-supplied/licensed assets.
2. Register `<Slug>-Cover-16x9` at 1920×1080 and `<Slug>-Cover-1x1` at 1500×1500. Both must be art-directed separately.
3. Render with `npx remotion still` to:
   - `out/<slug>_cover_16x9.png`
   - `out/<slug>_cover_1x1.png`
4. Use `scripts/artwork_pipeline.py` only for non-creative conformance and JPEG compression after the Remotion export. It must not add type, generate visual concepts, or call external image generation.
5. Synchronize `studio/metadata.json` with `"thumbnail": "<slug>_thumb.jpg"`.

## Cover quality gate

- **Originality:** The cover is a purpose-built editorial composition, not an external generated image, generic gradient, stock mockup, or video screenshot.
- **Hierarchy:** One immediate focal idea; no busy collage competing with the title.
- **Typography:** Native Remotion SVG/CSS type, readable at mobile thumbnail size, integrated with the scene's light and shadow, and never stamped over the focal subject.
- **Material depth:** Build depth through layered silhouette, light, shadow, bloom, controlled texture, and atmospheric separation. Avoid flat shapes that read as a presentation slide.
- **Aspect integrity:** 16:9 and 1:1 compositions both feel intentionally composed at their target size.
- **Verification:** Inspect the final stills at 100% and at a small thumbnail scale. Iterate until they feel like a music release, not a render test.
