#!/usr/bin/env python3
"""
PeerMusic Engine Benchmark Suite
================================
Measures render speed, bundler throughput, memory consumption,
and frame capture latency.
"""

import sys
import os
import time
import subprocess
import json
import argparse


def run_benchmark(composition: str = "RoughCopy-Landscape", frames: str = "1100-1280") -> dict:
    print(f"\n=======================================================")
    print(f"🚀 Running PeerMusic Benchmark on {composition} (Frames {frames})")
    print(f"=======================================================")

    out_file = "out/benchmark_test.mp4"
    os.makedirs("out", exist_ok=True)

    cmd = [
        "npx", "remotion", "render",
        "src/index.ts",
        composition,
        out_file,
        f"--frames={frames}",
        "--overwrite"
    ]

    start_time = time.time()
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    total_time = time.time() - start_time

    output = result.stdout
    print(output)

    success = result.returncode == 0
    if not success:
        print("[-] Benchmark render failed.")
        return {"success": False}

    file_size_kb = os.path.getsize(out_file) / 1024 if os.path.exists(out_file) else 0

    num_frames = 1
    if "-" in frames:
        s, e = map(int, frames.split("-"))
        num_frames = e - s + 1

    fps_rendered = num_frames / total_time

    print(f"\n📊 Benchmark Results:")
    print(f"  • Total Time:      {total_time:.2f}s")
    print(f"  • Frames Rendered: {num_frames} frames")
    print(f"  • Render Rate:     {fps_rendered:.2f} FPS")
    print(f"  • Output Size:     {file_size_kb:.1f} KB")
    print(f"  • Video Output:    {out_file}")

    return {
        "success": True,
        "total_time": round(total_time, 2),
        "frames": num_frames,
        "render_fps": round(fps_rendered, 2),
        "file_size_kb": round(file_size_kb, 1)
    }


def main():
    parser = argparse.ArgumentParser(description="Benchmark PeerMusic Remotion Engine")
    parser.add_argument("--comp", "-c", default="RoughCopy-Landscape", help="Composition ID to benchmark")
    parser.add_argument("--frames", "-f", default="1100-1280", help="Frame range (e.g. 1100-1280)")
    args = parser.parse_args()

    res = run_benchmark(composition=args.comp, frames=args.frames)
    sys.exit(0 if res.get("success") else 1)


if __name__ == "__main__":
    main()
