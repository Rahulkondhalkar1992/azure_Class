from pathlib import Path
import re

root = Path(r"E:\azure_Class_v1\azure_Class\src\components\concepts")

# Replace bare -> inside JSX text (break esbuild) with word "to"
# Also strip remaining mojibake icon blobs to simple markers

for p in root.glob("*.jsx"):
    t = p.read_text(encoding="utf-8")
    orig = t

    # Fix remove -> {c.files
    t = t.replace("remove -> {c.files[0]}", "remove, file {c.files[0]}")
    t = t.replace("Secure â†’ Govern â†’ Discover â†’ Share", "Secure > Govern > Discover > Share")
    t = t.replace("â†’", ">")
    t = t.replace("â†", "<")

    # Replace remaining emoji mojibake in quotes with simple labels
    t = re.sub(r"'ðŸ[^']*'", "'*'", t)
    t = re.sub(r">ðŸ[^<]*<", ">*<", t)
    t = re.sub(r"\{isOld \? 'ðŸ[^']*' : 'ðŸ[^']*'\}", "{isOld ? 'OLD' : 'NEW'}", t)
    t = re.sub(r"\{isDetected \? '✓' : 'ðŸ[^']*'\}", "{isDetected ? 'OK' : 'NEW'}", t)
    t = re.sub(r"\{l\.mem \? 'ðŸ[^']*' : '— No mem'\}", "{l.mem ? 'Memory' : 'No mem'}", t)
    t = re.sub(r"\{l\.disk \? 'ðŸ[^']*' : '— No disk'\}", "{l.disk ? 'Disk' : 'No disk'}", t)
    t = t.replace("<p>ðŸ“ _delta_log/</p>", "<p>_delta_log/</p>")
    t = t.replace("Compute once â†’ reuse many times!", "Compute once, reuse many times!")
    t = t.replace("Action 1: count() â† cached", "Action 1: count() from cache")
    t = t.replace("Action 2: write() â† cached", "Action 2: write() from cache")
    t = t.replace("id=2 MATCHED â†’ UPDATE", "id=2 MATCHED => UPDATE")
    t = t.replace("id=4 NOT MATCHED â†’ INSERT", "id=4 NOT MATCHED => INSERT")
    t = t.replace("city: Mumbai â†’ ", "city: Mumbai => ")

    # Any remaining -> in JSX text nodes that aren't in comments/strings carefully:
    # Fix known broken line pattern
    t = t.replace("remove -> ", "remove, ")

    if t != orig:
        p.write_text(t, encoding="utf-8", newline="\n")
        print("fixed", p.name)

print("done")
