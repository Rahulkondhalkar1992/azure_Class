from pathlib import Path
import re

root = Path(r"E:\azure_Class_v1\azure_Class\src\components\concepts")

for p in root.glob("*.jsx"):
    t = p.read_text(encoding="utf-8")
    orig = t

    t = re.sub(r"// queue .+ process .+ done", "// queue -> process -> done", t)
    t = re.sub(
        r"\{b\.rows\} rows .+ \{b\.files\.length\} files",
        "{b.rows} rows / {b.files.length} files",
        t,
    )
    t = re.sub(
        r"\{ver\.time\} .+ \{ver\.rows\} rows",
        "{ver.time} / {ver.rows} rows",
        t,
    )
    t = re.sub(
        r"\+\{c\.add\} add / -\{c\.remove\} remove .+ \{c\.files\[0\]\}",
        "+{c.add} add / -{c.remove} remove -> {c.files[0]}",
        t,
    )

    if p.name == "DeltaLogBenefits.jsx":
        t = re.sub(
            r"const benefits = \[.*?\]\n",
            (
                "const benefits = [\n"
                "  { icon: 'T', title: 'Time Travel', desc: 'Query any past version' },\n"
                "  { icon: 'A', title: 'ACID Txn', desc: 'Atomic commits, no partial reads' },\n"
                "  { icon: 'L', title: 'Audit Log', desc: 'Full history of who changed what' },\n"
                "  { icon: 'R', title: 'Rollback', desc: 'RESTORE TABLE to any version' },\n"
                "]\n"
            ),
            t,
            count=1,
            flags=re.S,
        )

    # Replace any remaining high-bit mojibake sequences of form a + euro-like with simple ASCII
    # Narrow no shuffle etc - leave mostly
    # Fix ellipsis leftovers
    t = t.replace("\u2026", "...")

    if t != orig:
        p.write_text(t, encoding="utf-8", newline="\n")
        print("updated", p.name)

print("complete")
