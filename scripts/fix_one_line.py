from pathlib import Path

p = Path(r"E:\azure_Class_v1\azure_Class\src\components\concepts\SparkCachePersist.jsx")
lines = p.read_text(encoding="utf-8").splitlines()
for i, line in enumerate(lines):
    if "done ?" in line and "i + 1" in line:
        lines[i] = "                  }`}>{done ? '\u2713' : i + 1}</span>"
        print("fixed line", i + 1)
p.write_text("\n".join(lines) + "\n", encoding="utf-8")
