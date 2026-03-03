# Project Logs — Running Data Visualisation App

---

## Log Entry 1

| Field | Detail |
|--|--|
| **Project Title** | Running Data Visualisation App |
| **Date** | Week 1 (Dec 2025) |
| **Topic** | Initial planning, data analysis, and template study |
| **Progress** | Exported 167 activity records from Garmin. Studied the Gallery and PieChart constructor patterns in the template. Sketched layouts for four visualisations (Monthly Distance, Pace Progress, Activity Types, Heart Rate vs Pace). Designed BarChart and ScatterPlot constructors following the PieChart structure. |
| **Problems** | Garmin export had Japanese column headers — needed to translate. Pace data stored as "6:30" string format required a custom parser to convert to decimal minutes. |
| **Plans** | Implement BarChart constructor and Monthly Distance visualisation. Begin Pace Progress with moving average. |
| **On target?** | Yes — planning phase complete on schedule. |

---

## Log Entry 2

| Field | Detail |
|--|--|
| **Project Title** | Running Data Visualisation App |
| **Date** | Week 3 (Dec 2025) |
| **Topic** | Core visualisations implementation |
| **Progress** | Completed all four planned visualisations: Monthly Distance (bar chart), Pace Progress (line chart + moving average), Activity Types (pie chart + dropdown), Heart Rate vs Pace (scatter plot + correlation + regression). Implemented Pearson's correlation coefficient and linear regression from mathematical formulae. Total new code: approximately 1,000 lines. |
| **Problems** | The scatter plot tooltips were difficult to position correctly — they would go off-screen near edges. Solved by adding boundary detection that repositions the tooltip. The correlation and regression calculations required careful research to implement correctly without a statistics library. |
| **Plans** | Submit midterm. Plan Goal Tracker for next phase. |
| **On target?** | Yes — midterm submission ready with four complete extensions. |

---

## Log Entry 3

| Field | Detail |
|--|--|
| **Project Title** | Running Data Visualisation App |
| **Date** | Week 6 (Jan 2026) |
| **Topic** | Code quality improvements and new visualisation design |
| **Progress** | Addressed reviewer feedback: extracted tooltip rendering into a reusable Tooltip class (separation of concerns), fixed missing `let` declarations in loop counters, and consolidated duplicate `paceToMinutes()` function into helper-functions.js. Completed Goal Tracker with trigonometric gauge. Redesigned the remaining extensions — replaced Pace Zones (too similar to existing chart) with a Training Heatmap inspired by GitHub's contribution calendar. |
| **Problems** | Original plan had Pace Zones and Cumulative Distance, but Pace Zones overlapped with Pace Progress. Decided to pivot to more original visualisations. The code refactoring took longer than expected as the tooltip was tightly coupled to ScatterPlot. |
| **Plans** | Implement Training Heatmap and Marathon Readiness Radar. Begin system testing. |
| **On target?** | Slightly behind on new features due to refactoring, but the code quality is significantly improved. |

---

## Log Entry 4

| Field | Detail |
|--|--|
| **Project Title** | Running Data Visualisation App |
| **Date** | Week 9 (Feb 2026) |
| **Topic** | New visualisations, testing, and final documentation |
| **Progress** | Completed Training Heatmap (GitHub-style calendar with nested loops, date calculations, colour mapping) and Marathon Readiness Radar (spider chart with trigonometry, 5 normalised metrics, polygon drawing). Created 10 system test cases covering all visualisations. Drafted all report sections (Q1-Q4, Q7). |
| **Problems** | The radar chart required trigonometric calculations (sin/cos at 72-degree intervals) and normalisation of five different metric types to a 0-1 scale. Had to carefully handle edge cases where heart rate data was missing for some activities. |
| **Plans** | Run all system tests in Chrome. Finalise report writing. Create annotated code PDF. Package and submit. |
| **On target?** | Yes — all major features complete with time for testing and documentation before deadline. |

---

**Note:** These log entries follow the project log template format provided in Week 17. Transfer to the official .docx template before submission.
