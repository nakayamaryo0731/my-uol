#!/usr/bin/env python3
"""Generate code-pdf.html from all own-code JavaScript source files."""

import html
import os

BASE = os.path.dirname(os.path.abspath(__file__))
PROJECT = os.path.join(BASE, "project")

# Files in order, with descriptions
FILES = [
    ("index.html", "HTML entry point — script loading order and own-code markers", None),
    ("sketch.js", "Main sketch — Gallery registration of all 7 visualisations", None),
    ("helper-functions.js", "Shared pace helper functions (own code: lines 42-63)",
     (42, 63)),
    ("tooltip.js", "Reusable tooltip component (composition pattern)", None),
    ("bar-chart.js", "Reusable bar chart constructor", None),
    ("scatter-plot.js", "Reusable scatter plot constructor with bubble chart support", None),
    ("monthly-distance.js", "Monthly Distance — bar chart of distance per month", None),
    ("pace-progress.js", "Pace Progress — moving average and pace zone backgrounds", None),
    ("activity-types.js", "Activity Types — pie chart with dropdown switcher", None),
    ("heartrate-vs-pace.js", "Heart Rate vs Pace — scatter plot with statistical analysis", None),
    ("goal-tracker.js", "Goal Tracker — semicircular gauge with trigonometry", None),
    ("training-heatmap.js", "Training Heatmap — GitHub-style calendar grid", None),
    ("marathon-radar.js", "Marathon Readiness Radar — spider chart with 5 normalised metrics", None),
    ("tests.js", "Unit and integration tests (TestRunner, black-box testing)", None),
]

def read_file(filename):
    path = os.path.join(PROJECT, filename)
    with open(path, "r") as f:
        return f.read()

def make_numbered_code(source, start_line=1):
    """Return HTML for numbered code lines."""
    lines = source.split("\n")
    # Remove trailing empty line
    if lines and lines[-1].strip() == "":
        lines = lines[:-1]
    parts = []
    for i, line in enumerate(lines, start=start_line):
        escaped = html.escape(line)
        parts.append(f'<span class="ln">{i:>4}</span> {escaped}')
    return "\n".join(parts)

# Build HTML
sections = []
toc_items = []

for idx, (filename, desc, line_range) in enumerate(FILES, 1):
    source = read_file(filename)

    if line_range:
        # Extract specific lines
        lines = source.split("\n")
        start, end = line_range
        extracted = "\n".join(lines[start - 1 : end])
        code_html = make_numbered_code(extracted, start_line=start)
        note_before = f'<p class="template-note">Lines 1–{start-1}: template code (not shown)</p>'
        note_after = f'<p class="template-note">Lines {end+1}–{len(lines)}: template code (not shown)</p>'
    else:
        code_html = make_numbered_code(source)
        note_before = ""
        note_after = ""

    section = f"""<section class="file-section">
<h2>{idx}. {html.escape(filename)}</h2>
<p class="file-desc">{html.escape(desc)}</p>
{note_before}
<pre><code>{code_html}</code></pre>
{note_after}
</section>"""
    sections.append(section)
    toc_items.append(f'<li><strong>{html.escape(filename)}</strong> — {html.escape(desc)}</li>')

toc_html = "\n".join(toc_items)
sections_html = "\n\n".join(sections)

HTML = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Running Data Visualisation — Annotated Source Code</title>
<style>
@page {{
  size: A4;
  margin: 15mm 12mm 15mm 12mm;
}}
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
body {{
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 10pt;
  line-height: 1.45;
  color: #1a1a1a;
}}
.title-page {{
  text-align: center;
  padding-top: 80px;
  page-break-after: always;
}}
.title-page h1 {{
  font-size: 22pt;
  margin-bottom: 8px;
}}
.title-page .subtitle {{
  font-size: 14pt;
  color: #555;
  margin-bottom: 30px;
}}
.title-page .meta {{
  font-size: 12pt;
  color: #666;
  margin-bottom: 40px;
}}
.toc {{
  page-break-after: always;
  padding: 20px;
}}
.toc h2 {{
  font-size: 16pt;
  margin-bottom: 12px;
  border-bottom: 2px solid #333;
  padding-bottom: 6px;
}}
.toc ol {{
  padding-left: 24px;
  font-size: 10.5pt;
  line-height: 1.8;
}}
.file-section {{
  page-break-before: always;
  padding: 0 8px;
}}
.file-section:first-of-type {{
  page-break-before: auto;
}}
h2 {{
  font-size: 13pt;
  color: #2c3e50;
  border-bottom: 1.5px solid #2c3e50;
  padding-bottom: 4px;
  margin-bottom: 4px;
}}
.file-desc {{
  font-size: 9.5pt;
  color: #555;
  font-style: italic;
  margin-bottom: 8px;
}}
.template-note {{
  font-size: 9pt;
  color: #888;
  font-style: italic;
  margin: 4px 0;
  padding: 3px 8px;
  background: #f5f5f5;
  border-left: 3px solid #ccc;
}}
pre {{
  font-family: "Consolas", "Monaco", "Courier New", monospace;
  font-size: 8.5pt;
  line-height: 1.35;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 8px 4px;
  overflow-x: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
}}
code {{
  font-family: inherit;
}}
.ln {{
  color: #999;
  user-select: none;
  display: inline-block;
  width: 3.5em;
  text-align: right;
  margin-right: 8px;
  border-right: 1px solid #ddd;
  padding-right: 6px;
}}
@media print {{
  body {{ padding: 0; }}
  pre {{
    page-break-inside: auto;
    border: 0.5px solid #ccc;
    background: #fafafa !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}
  .template-note {{
    background: #f0f0f0 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}
}}
@media screen {{
  body {{
    max-width: 210mm;
    margin: 0 auto;
    padding: 15mm;
  }}
  .file-section {{
    border-top: 1px dashed #ccc;
    padding-top: 15px;
    margin-top: 15px;
  }}
}}
</style>
</head>
<body>

<div class="title-page">
  <h1>Running Data Visualisation</h1>
  <div class="subtitle">Annotated Source Code</div>
  <div class="meta">
    CM1010 Introduction to Programming II<br>
    Ryo Nakayama (250151349) — March 2026
  </div>
</div>

<div class="toc">
  <h2>Table of Contents</h2>
  <ol>
    {toc_html}
  </ol>
</div>

{sections_html}

</body>
</html>
"""

output_path = os.path.join(BASE, "code-pdf.html")
with open(output_path, "w") as f:
    f.write(HTML)

print(f"Generated: {output_path}")
print(f"Files included: {len(FILES)}")
