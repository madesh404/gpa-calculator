# GPA Calculator

A lightweight web-based GPA calculator built for Toronto Metropolitan University students. Upload a CSV of your courses and instantly see your weighted GPA on the 4.33 scale. Toggle a retake on any course and pick a target grade to simulate how it would affect your GPA.

## Features

- Parses a CSV of your courses, eliminating tedious manual entry
- Calculates weighted GPA on TMU's 4.33 scale
- Skips pass/fail grades (e.g. PSD) automatically
- Retake simulator: toggle any course and pick a target grade to see the projected GPA update live
- Highlights retake rows and color-codes GPA changes (green = improvement, red = drop)

## Getting Started

No build tools or dependencies required. Just a browser.

1. Clone or download this repo
2. Open `index.html` in your browser
3. Upload your CSV file

## CSV Format

Your CSV should have three columns with no header required (a header row is automatically detected and skipped):

```
course,credits,grade
COE608,3,A-
ELE639,3,C-
MTH140,3,C
```

| Column | Description | Example |
|--------|-------------|---------|
| `course` | Course code | `COE608` |
| `credits` | Credit weight | `3` |
| `grade` | Letter grade | `A-` |

Supported grades: `A+`, `A`, `A-`, `B+`, `B`, `B-`, `C+`, `C`, `C-`, `D+`, `D`, `D-`, `F`

Pass/fail grades like `PSD` are skipped and excluded from the GPA calculation.

## TMU's 4.33 Grade Scale

| Grade | Points |
|-------|--------|
| A+    | 4.33   |
| A     | 4.00   |
| A-    | 3.67   |
| B+    | 3.33   |
| B     | 3.00   |
| B-    | 2.67   |
| C+    | 2.33   |
| C     | 2.00   |
| C-    | 1.67   |
| D+    | 1.33   |
| D     | 1.00   |
| D-    | 0.67   |
| F     | 0.00   |

## Project Structure

```
gpa-calculator/
├── index.html   # markup and layout
├── style.css    # styling
├── app.js       # CSV parsing, GPA logic, retake simulator
└── README.md
```

## How It Was Built

Built incrementally in vanilla HTML, CSS, and JavaScript, no frameworks or dependencies:

1. CSV parser with grade validation
2. Weighted GPA calculation using TMU's 4.33 scale
3. Dynamic table rendering
4. Live retake simulator with projected GPA
5. Styling and upload UX