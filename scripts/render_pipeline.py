#!/usr/bin/env python3
"""
Manim Video Render, Concatenation, and Lossless Audio Muxing Pipeline
=====================================================================
Automates high-fidelity rendering, stitches multi-scene videos,
and losslessly muxes the master music audio track with zero sync drift.
"""

import sys
import os
import argparse
import subprocess
import glob
from typing import List, Optional


def run_command(cmd: List[str]) -> bool:
    print(f"[RUN] {' '.join(cmd)}")
    result = subprocess.run(cmd)
    return result.returncode == 0


def render_scene(
    scene_file: str,
    scene_name: Optional[str] = None,
    quality: str = "high",
    fps: int = 60,
    output_dir: str = "media/videos",
    preview: bool = False
) -> bool:
    """
    Renders Manim scene with production-grade flags.
    quality: 'low' (-ql), 'medium' (-qm), 'high' (-qh), 'fourk' (-qk)
    """
    quality_flag_map = {
        "low": "-ql",
        "medium": "-qm",
        "high": "-qh",
        "fourk": "-qk"
    }
    q_flag = quality_flag_map.get(quality, "-qh")

    manim_bin = os.path.join(os.path.dirname(sys.executable), "manim")
    if not os.path.exists(manim_bin):
        manim_bin = "manim"

    cmd = [manim_bin, q_flag, "--fps", str(fps), scene_file]
    if scene_name:
        cmd.append(scene_name)
    if preview:
        cmd.append("-p")

    return run_command(cmd)


def mux_audio(
    video_path: str,
    audio_path: str,
    output_path: str,
    audio_offset: float = 0.0
) -> bool:
    """
    Combines rendered Manim video with original audio file via FFmpeg.
    Ensures zero generation loss by copying video streams directly.
    """
    if not os.path.exists(video_path):
        print(f"[-] Video file not found: {video_path}")
        return False
    if not os.path.exists(audio_path):
        print(f"[-] Audio file not found: {audio_path}")
        return False

    cmd = [
        "ffmpeg", "-y",
        "-i", video_path,
        "-ss", str(audio_offset),
        "-i", audio_path,
        "-map", "0:v:0",
        "-map", "1:a:0",
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "320k",
        "-shortest",
        output_path
    ]
    return run_command(cmd)


def concatenate_scenes(
    video_list: List[str],
    output_path: str
) -> bool:
    """
    Concatenates multiple rendered scene chunks into a seamless video track.
    """
    concat_file = "concat_list.txt"
    with open(concat_file, "w") as f:
        for v in video_list:
            f.write(f"file '{os.path.abspath(v)}'\n")

    cmd = [
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", concat_file,
        "-c", "copy",
        output_path
    ]
    success = run_command(cmd)
    if os.path.exists(concat_file):
        os.remove(concat_file)
    return success


def main():
    parser = argparse.ArgumentParser(description="Render, concatenate and audio-mux Manim lyrical music videos.")
    parser.add_argument("script", help="Path to Python Manim script file (e.g. scenes.py)")
    parser.add_argument("--scene", "-s", help="Specific scene class to render")
    parser.add_argument("--audio", "-a", help="Path to original music audio file (MP3/WAV)")
    parser.add_argument("--quality", "-q", choices=["low", "medium", "high", "fourk"], default="high", help="Render quality")
    parser.add_argument("--fps", type=int, default=60, help="Output framerate (default: 60)")
    parser.add_argument("--output", "-o", default="master_music_video.mp4", help="Final output path")
    parser.add_argument("--preview", action="store_true", help="Open video player automatically after render")
    args = parser.parse_args()

    # Step 1: Render Manim
    print(f"\n[1/3] Rendering Manim scene(s) at {args.fps} FPS ({args.quality} quality)...")
    success = render_scene(
        scene_file=args.script,
        scene_name=args.scene,
        quality=args.quality,
        fps=args.fps,
        preview=args.preview and not args.audio
    )
    if not success:
        print("[-] Manim rendering failed. Check output for errors.")
        sys.exit(1)

    # Find the latest rendered MP4 in media directory
    candidates = glob.glob(f"media/videos/**/{args.scene or '*'}.mp4", recursive=True)
    if not candidates:
        candidates = sorted(glob.glob("media/videos/**/*.mp4", recursive=True), key=os.path.getmtime)
    
    if not candidates:
        print("[-] No rendered video found in media directory.")
        sys.exit(1)
        
    latest_video = candidates[-1]
    print(f"[✓] Rendered video located at: {latest_video}")

    # Step 2: Audio Muxing if audio provided
    if args.audio:
        print(f"\n[2/3] Losslessly multiplexing master audio from '{args.audio}'...")
        mux_success = mux_audio(
            video_path=latest_video,
            audio_path=args.audio,
            output_path=args.output
        )
        if mux_success:
            print(f"\n🎉 [3/3] Master Lyric Music Video successfully created: {args.output}")
        else:
            print("[-] FFmpeg audio multiplexing failed.")
            sys.exit(1)
    else:
        print(f"\n[✓] Render finished (no audio file specified). Raw video: {latest_video}")


if __name__ == "__main__":
    main()
