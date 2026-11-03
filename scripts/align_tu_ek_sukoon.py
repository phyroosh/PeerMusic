import stable_whisper
import json
import subprocess
import os

model = stable_whisper.load_model("base")
audio = "public/audio/tu_ek_sukoon_sa_lagta_hai.mp3"

sections = [
    {
        "id": "scene_01_intro",
        "name": "Intro – Soft Piano & Rain Sounds",
        "start": 0.0,
        "end": 28.5,
        "text": """हम्म्म... आआ...
धीरे-धीरे...
रात कहे कुछ, सुन ले ज़रा...
खो जा कहीं... तू भी यहाँ..."""
    },
    {
        "id": "scene_02_verse_1",
        "name": "Verse 1 – Chaand Bhi Aaj Dheema Lage",
        "start": 28.5,
        "end": 53.0,
        "text": """चाँद भी आज कुछ धीमा लगे,
तारों में कोई सपना जगे,
खिड़की पे बैठी ये ठंडी हवा,
तेरा ही नाम मुझसे कहे...
ना कोई मंज़िल, ना रास्ता,
ना कोई शिकवा, ना फ़ासला,
बस कुछ ख़ामोशी, थोड़ी सी रात,
और तेरी यादों का सिलसिला..."""
    },
    {
        "id": "scene_03_chorus_1",
        "name": "Chorus 1 – Tu Ek Sukoon Sa Lagta Hai",
        "start": 53.0,
        "end": 87.0,
        "text": """तू... एक सुकून सा लगता है,
जैसे कोई ख़्वाब ठहरता है,
इस भागती सी दुनिया में,
दिल तेरे पास ही रहता है...
ओ ओ ओ... धीरे बहने दे,
इन लम्हों को यहीं रहने दे,
कुछ ना कहें, कुछ ना सुनें,
बस रात को रात रहने दे..."""
    },
    {
        "id": "scene_04_verse_2",
        "name": "Verse 2 – Coffee Ki Khushboo, Dheemi Si Dhun",
        "start": 93.0,
        "end": 118.5,
        "text": """कॉफ़ी की ख़ुशबू, धीमी सी धुन,
आँखों में आधा सा चाँद और जुनून,
सड़कों पे सोई हैं सारी रोशनियाँ,
दिल में जगी हैं कुछ मीठी कहानियाँ...
वक़्त भी जैसे रुकने लगा,
दिल भी कहीं अब झुकने लगा,
जो भी था कल, उसे भूल जा,
आज की हवा में घुलने लगा..."""
    },
    {
        "id": "scene_05_chorus_2",
        "name": "Chorus 2 – Tu Ek Sukoon Sa Lagta Hai",
        "start": 118.5,
        "end": 146.5,
        "text": """तू... एक सुकून सा लगता है,
जैसे कोई ख़्वाब ठहरता है,
इस भागती सी दुनिया में,
दिल तेरे पास ही रहता है...
ओ ओ ओ... धीरे बहने दे,
इन लम्हों को यहीं रहने दे,
कुछ ना कहें, कुछ ना सुनें,
बस रात को रात रहने दे..."""
    },
    {
        "id": "scene_06_bridge",
        "name": "Bridge – Agar Kabhi Thak Jaaye Dil",
        "start": 146.5,
        "end": 173.5,
        "text": """अगर कभी थक जाए दिल,
तो आँखें बंद कर लेना...
मैं मिलूँगा उन ख़्वाबों में,
बस थोड़ा सा सो लेना...
ना कल की फ़िक्र हो,
ना कल का कोई डर...
बस साँसों में घुल जाए,
ये चाँदनी रात भर..."""
    },
    {
        "id": "scene_07_outro",
        "name": "Outro – Piano, Rain & Soft Vinyl Crackle",
        "start": 173.5,
        "end": 227.167,
        "text": """हम्म्म...
धीरे-धीरे रात ढले...
ख़्वाबों के कुछ फूल खिलें...
तू...
एक सुकून सा लगता है...
हम्म्म... आआ..."""
    }
]

aligned_scenes = []
for sec in sections:
    sid = sec["id"]
    chunk_path = f"/tmp/{sid}.wav"
    cmd = ["ffmpeg", "-y", "-ss", str(sec["start"]), "-to", str(sec["end"]), "-i", audio, chunk_path]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    
    clean_text = "\n".join([l.strip() for l in sec["text"].splitlines() if l.strip()])
    res = model.align(chunk_path, clean_text, language="hi")
    
    words = []
    for s in res.segments:
        for w in s.words:
            words.append({
                "word": w.word.strip(),
                "start": round(sec["start"] + w.start, 3),
                "end": round(sec["start"] + w.end, 3),
                "probability": round(w.probability, 3)
            })
    aligned_scenes.append({
        "id": sec["id"],
        "name": sec["name"],
        "startSec": sec["start"],
        "endSec": sec["end"],
        "text": sec["text"],
        "words": words
    })
    print(f"[✓] Aligned {sid}: {len(words)} words aligned ({sec['start']}s -> {sec['end']}s)")

out_path = "src/songs/tu-ek-sukoon-sa-lagta-hai/section_alignments.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(aligned_scenes, f, indent=2, ensure_ascii=False)
print(f"[✓] All {len(aligned_scenes)} sections aligned and saved to {out_path}!")
