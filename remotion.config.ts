import { Config } from "@remotion/cli/config";
import os from "os";

// ============================================================================
// REMOTION ULTRA-PERFORMANCE & MAXIMUM QUALITY ENGINE CONFIGURATION
// ============================================================================

// ----------------------------------------------------------------------------
// 1. MAXIMUM SPEED OPTIMIZATIONS (Frame Capture & Multi-Processing)
// ----------------------------------------------------------------------------
// JPEG quality 96 uses SIMD-accelerated libjpeg-turbo in Chromium,
// rendering 2x-3x faster than uncompressed synchronous PNG canvas captures.
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(96);
Config.setStillImageFormat("png"); // Still preview exports retain lossless PNG

// Concurrency 8 strikes the sweet spot on 12-thread CPUs:
// 8 parallel Chromium render tabs + 4 threads for FFmpeg and disk I/O.
Config.setConcurrency(8);

// Enable Linux multi-process Chromium architecture
Config.setChromiumMultiProcessOnLinux(true);
Config.setChromiumOpenGlRenderer("angle");
Config.setChromiumDisableWebSecurity(true);
Config.setChromiumHeadlessMode(true);
Config.setDelayRenderTimeoutInMilliseconds(45000);

// Enable bundle & dependency caching
Config.setCachingEnabled(true);

// ----------------------------------------------------------------------------
// 2. MAXIMUM VISUAL & ACOUSTIC QUALITY (Broadcast-Grade Encoding)
// ----------------------------------------------------------------------------
// Video Codec & Compression:
// CRF 16 = Visually Lossless H.264 (eliminates macroblocking on dark gradients)
Config.setCodec("h264");
Config.setCrf(16);
Config.setX264Preset("veryfast");
Config.setPixelFormat("yuv420p"); // Universal playback compatibility (Apple/Android/Web)

// Color Matrix:
// Enforce Rec.709 (BT.709) standard broadcast color space to prevent gamma shifts
Config.setColorSpace("bt709");

// Audio Fidelity:
// Studio Master 320 kbps AAC stereo encoding with lossless stream copy preference
Config.setAudioBitrate("320k");
Config.setPreferLosslessAudio(true);

Config.setOverwriteOutput(true);
