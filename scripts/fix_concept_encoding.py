from pathlib import Path

root = Path(r"E:\azure_Class_v1\azure_Class\src\components\concepts")
# mojibake sequences as latin-1 misread of utf-8
repls = {
    "â€¢": "•",
    "â€¦": "…",
    "âœ“": "✓",
    "â€”": "—",
    "â€“": "–",
}
for p in root.glob("*.jsx"):
    raw = p.read_bytes()
    try:
        t = raw.decode("utf-8")
    except UnicodeDecodeError:
        t = raw.decode("utf-8", errors="replace")
    orig = t
    for a, b in repls.items():
        t = t.replace(a, b)
    # also replace literal bytes mis-decoded patterns if still present via cp1252 roundtrip
    if "â" in t:
        # try fix common 3-byte utf-8 sequences that were interpreted as latin1 then stored
        t = t.encode("latin-1", errors="ignore").decode("utf-8", errors="ignore") if False else t
    if t != orig:
        p.write_text(t, encoding="utf-8", newline="\n")
        print("cleaned", p.name)
    else:
        # check remaining
        if "â€" in t or "âœ" in t:
            print("still dirty", p.name)
print("done")
