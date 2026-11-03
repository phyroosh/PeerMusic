import json

with open("src/songs/kore-margin/timeline.json") as f:
    data = json.load(f)

# Radio cut ends at 176.5s = 10590 frames
radio_fps = 60
radio_end_f = int(round(176.5 * radio_fps))

filtered_scenes = []
for s in data["scenes"]:
    if s["startFrame"] >= radio_end_f:
        continue
    sc = dict(s)
    if sc["endFrame"] > radio_end_f:
        sc["endFrame"] = radio_end_f
        # filter lines
        sc["lines"] = [l for l in sc.get("lines", []) if l["startFrame"] < radio_end_f]
        for l in sc["lines"]:
            if l["endFrame"] > radio_end_f:
                l["endFrame"] = radio_end_f
                l["words"] = [w for w in l.get("words", []) if w["startFrame"] < radio_end_f]
                for w in l["words"]:
                    if w["endFrame"] > radio_end_f:
                        w["endFrame"] = radio_end_f
    filtered_scenes.append(sc)

radio_data = dict(data)
radio_data["totalFrames"] = radio_end_f
radio_data["durationSeconds"] = 176.5
radio_data["audioFile"] = "audio/kore_margin_radio.mp3"
radio_data["scenes"] = filtered_scenes

with open("src/songs/kore-margin/timeline_radio.json", "w", encoding="utf-8") as f:
    json.dump(radio_data, f, indent=2, ensure_ascii=False)

print("[✓] Saved timeline_radio.json with 10590 frames (176.5s)!")
