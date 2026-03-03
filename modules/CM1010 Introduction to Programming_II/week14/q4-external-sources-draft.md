# Q4 External Sources List — Final Version

## Code References

- **p5.js official reference** (https://p5js.org/reference/) — Used for drawing functions (arc, ellipse, rect, beginShape/vertex/endShape), trigonometric functions (cos, sin), and DOM functions (createSelect)

- **p5.js PieChart constructor (template)** — Used the provided PieChart pattern as structural reference for designing BarChart and ScatterPlot constructors

- **Pearson correlation coefficient formula** — Implemented from the mathematical definition: r = (nΣxy − ΣxΣy) / √((nΣx² − (Σx)²)(nΣy² − (Σy)²)). Reference: https://en.wikipedia.org/wiki/Pearson_correlation_coefficient

- **Linear regression (least squares method)** — Implemented slope and intercept calculations from the standard formulae. Reference: https://en.wikipedia.org/wiki/Simple_linear_regression

- **GitHub contribution graph** — Visual inspiration for the Training Heatmap calendar layout. No code was copied; the grid layout concept was adapted for running distance data.

## Libraries Used

- **p5.js** (included in the template) — No additional external libraries were used. All chart types and statistical calculations were implemented from scratch.

## LLM Usage (Claude, Anthropic)

Each prompt was entered into Claude (claude.ai). Below are the prompts and a summary of the responses received.

1. **Prompt:** "How to structure a reusable bar chart constructor in p5.js"
   **Response summary:** Suggested a constructor function with `draw()`, axis methods, and dynamic bar width calculation. I adapted the structure to match the existing PieChart pattern in the template.

2. **Prompt:** "Pearson correlation coefficient calculation in JavaScript"
   **Response summary:** Provided the mathematical formula r = (nΣxy − ΣxΣy) / √((nΣx² − (Σx)²)(nΣy² − (Σy)²)) and a reference implementation. I implemented it as a single-pass O(n) algorithm and verified against manual calculations.

3. **Prompt:** "How to calculate moving average in JavaScript"
   **Response summary:** Explained trailing vs centred moving average approaches. I chose trailing (window = 10) for the Pace Progress trend line as it only uses past data.

4. **Prompt:** "Converting Japanese CSV column names to English"
   **Response summary:** Provided translations for Garmin's Japanese export headers. Used for data preprocessing.

5. **Prompt:** "How to draw a radar/spider chart using trigonometry"
   **Response summary:** Explained placing axes at equal angular intervals using cos/sin, with normalised data mapped to radius. I implemented the polygon drawing and normalisation independently.

6. **Prompt:** "Separation of concerns pattern — extracting a reusable component"
   **Response summary:** Discussed composition vs inheritance. I chose composition: ScatterPlot holds a Tooltip instance rather than duplicating rendering logic.

7. **Prompt:** "GitHub contribution calendar layout algorithm"
   **Response summary:** Described mapping day-of-year to (week, weekday) grid coordinates. I implemented the nested loop and date calculation independently.

8. **Prompt:** "How to write unit tests for p5.js without a testing framework"
   **Response summary:** Suggested creating a simple assertion-based runner. I designed TestRunner with assertEquals/assertAlmostEqual to validate functions using black-box testing.

## Originality Statement

All visualisation logic, statistical calculations (Pearson's correlation, linear regression, moving average), chart rendering, and data processing were implemented independently. Claude was used for conceptual guidance and formula references; no code was copied directly from any response.
