import json

with open("rough_copy_sync.json") as f:
    d = json.load(f)

words = d.get("words", [])
print(f"Total words: {len(words)}")
for i in range(0, len(words), 8):
    chunk = " ".join([f"{w['word']}({w['start']:.1f}s)" for w in words[i:i+8]])
    print(chunk)
