# Midterm Submission Drafts (English Version)

---

## 1. Project Outline (400 words)

**Template Selected: Data Visualisation App**

I chose the Data Visualisation template because I am a runner who has been tracking running data with a Garmin watch for nearly 2 years. I am currently training for the Osaka Marathon in February 2025, and I wanted to visualise my personal data to monitor progress toward my goals.

**Extensions I am adding:**

1. **Monthly Distance** - Bar chart displaying distance per month. Helps track progress toward my 100km/month goal.

2. **Pace Progress** - Line chart showing pace changes over time. Includes a moving average trend line to visualise long-term improvement.

3. **Activity Types** - Pie chart showing distribution of Run, Trail Run, and Hiking activities. Dropdown allows switching between count and distance views.

4. **Heart Rate vs Pace** - Scatter plot analysing correlation between heart rate and pace. Features linear regression trend line and interactive tooltips.

**Complex coding techniques used:**

- **Constructor functions**: Created two new reusable constructors (BarChart and ScatterPlot)
- **Arrays of objects**: Data aggregation and grouping operations
- **Nested loops**: Monthly aggregation, data filtering
- **Statistical calculations**: Moving average, correlation coefficient, linear regression

**Expected challenges:**

- Converting Japanese CSV column headers to English
- Parsing pace data from "min:sec" format to numerical values
- Implementing interactive tooltips on scatter plot

---

## 2. Progress Report (400 words) - PDF submission

**Design work and research:**

Before starting implementation, I conducted the following design work:

1. **Data Analysis**: Analysed 168 activity records exported from Garmin and identified suitable metrics for visualisation (distance, pace, heart rate, activity type).

2. **Template Study**: Examined the structure of the provided PieChart constructor and designed BarChart and ScatterPlot following the same pattern.

3. **UI Sketches**: Sketched layouts for each visualisation on paper, determining placement of axis labels, titles, and legends.

**Code written so far:**

- `bar-chart.js` (~100 lines): Reusable bar chart constructor
- `scatter-plot.js` (~150 lines): Scatter plot constructor with tooltips
- `monthly-distance.js` (~130 lines): Monthly distance visualisation
- `pace-progress.js` (~250 lines): Pace progress visualisation
- `activity-types.js` (~120 lines): Activity types visualisation
- `heartrate-vs-pace.js` (~250 lines): Heart rate vs pace visualisation

Total: approximately 1,000 lines of new code created.

**What I intend to do next:**

For the final submission, I plan to add the following extensions:

1. Goal Tracker - Progress gauge toward 100km/month goal
2. Pace Zones - Visualisation of target pace (6:00/km) achievement rate
3. Cumulative Distance - Animated area chart of total distance
4. Marathon Dashboard - Comprehensive view of Osaka Marathon preparation status

---

## 3. Time Management Plan (200 words) - PDF submission

The attached Gantt chart shows the schedule for the entire project.

**Until midterm submission (Week 2 of December):**
Allocated 2 weeks for planning, basic implementation, and testing. Focused on completing 4 main visualisations.

**Until final submission (March 9th):**

- **Dec W3 - Jan W2 (4 weeks)**: Add 4 new visualisations. Approximately 1 week allocated per feature. Goal Tracker and Pace Zones are relatively simple, so they will be implemented first.
- **Jan W3 - Feb W1 (3 weeks)**: UI improvements and interaction enhancements. Apply consistent styling across all charts.
- **Feb W2 - W3 (2 weeks)**: Testing, bug fixes, and documentation.
- **Feb W4 - Mar W2**: Final review and submission (deadline: March 9th).

This plan aims to complete the main features before the Osaka Marathon (end of February).

---

## 4. External Sources List

**Code references:**
- Used the provided PieChart constructor structure as reference for designing BarChart and ScatterPlot
- p5.js official reference (https://p5js.org/reference/) - for drawing function usage

**Libraries used:**
- p5.js (included in the template)

**LLM usage:**
Asked Claude (Anthropic) the following questions:
1. "How to draw a bar chart in p5.js" - Used as reference for BarChart constructor structure
2. "How to calculate correlation coefficient in JavaScript" - Used for scatter plot statistical analysis
3. "Converting Japanese CSV column names to English" - Data preprocessing work
4. "Moving average calculation algorithm" - Trend line for pace progress chart

---

## 7. Originality Statement (100 words)

This project is original because:

1. **Personal data**: Uses my own Garmin running data collected over nearly 2 years. No one else has this exact dataset.

2. **Real goal connection**: Designed as a training management tool for my specific goal - the Osaka Marathon 2025.

3. **New constructors**: Created BarChart and ScatterPlot constructors following the PieChart pattern but with original implementation.

4. **Statistical analysis**: Incorporated correlation coefficient and linear regression to analyse the relationship between heart rate and performance.

---

## Submission Checklist

- [ ] 1. Project Outline (text input) - max 400 words
- [ ] 2. Progress Report PDF (with diagrams) - max 400 words
- [ ] 3. Time Management Plan PDF (Gantt chart) - max 200 words
- [ ] 4. External Sources List (text input)
- [ ] 5. Project ZIP file
- [ ] 6. Code PDF (mark your own code)
- [ ] 7. Originality Statement (text input) - max 100 words
