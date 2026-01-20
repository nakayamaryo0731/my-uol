# CM1010 Midterm Project Planning Document

## Project Overview

**Project Title:** Running Data Visualisation App
**Template Used:** Data Visualisation Template
**Data Source:** Personal Garmin running data (April 2024 - December 2025)

### Why This Project?

I am training for the **Osaka Marathon (February 2025)** and have been tracking my runs with Garmin for nearly 2 years. This project visualises my running data to:
- Track monthly distance toward my goal of **100km/month**
- Monitor pace improvement toward my target of **6:00/km**
- Analyse the relationship between heart rate and performance

---

## Current Progress (Midterm)

### Completed Visualisations (4)

| Visualisation | Description | Technical Features |
|---------------|-------------|-------------------|
| **Monthly Distance** | Bar chart showing distance per month | Custom BarChart constructor, data aggregation by month |
| **Pace Progress** | Line chart showing pace over time | Moving average calculation, date handling |
| **Activity Types** | Pie chart of Run/Trail/Hiking distribution | Reuses existing PieChart constructor |
| **Heart Rate vs Pace** | Scatter plot with correlation analysis | Custom ScatterPlot constructor, linear regression, tooltips |

### New Code Components Created

1. **BarChart Constructor** (`bar-chart.js`)
   - Reusable bar chart similar to PieChart
   - Supports dynamic bar width calculation
   - Y-axis tick labels and grid lines

2. **ScatterPlot Constructor** (`scatter-plot.js`)
   - Reusable scatter plot for correlation analysis
   - Interactive tooltips on hover
   - Trend line calculation

### Technical Skills Demonstrated

- Constructor functions (2 new: BarChart, ScatterPlot)
- Arrays of objects for data storage
- Nested loops for data processing
- Data aggregation algorithms (monthly grouping)
- Date parsing and formatting
- Statistical calculations (moving average, correlation coefficient, linear regression)

---

## Time Management Plan

### Gantt Chart
link: https://docs.google.com/spreadsheets/d/1UUvllCrs3r8PXd2HClA4sF637ByEkRVAMjK6cBBNJ8A/edit?gid=0#gid=0

![alt text](gant_chart.png)

### Time Allocation Rationale

| Phase | Time | Reason |
|-------|------|--------|
| Midterm (Current) | 2 weeks | Basic visualisations + planning document |
| New Visualisations | 4 weeks | 4 new features, ~1 week each |
| UI Polish | 2 weeks | Consistent styling, better interactions |
| Testing & Docs | 1 week | Final testing and documentation |

---

## Final Project Plan (Extensions)

### New Visualisations to Add

#### 1. Goal Tracker (Monthly Distance Goal)
- **Purpose:** Track progress toward 100km/month goal
- **Visual:** Progress bar/gauge with current vs target
- **Technical:** Real-time calculation, visual feedback (colour change at milestones)

#### 2. Pace Zones Distribution
- **Purpose:** Show what percentage of runs meet the 6:00/km target
- **Visual:** Stacked bar chart or histogram of pace distribution
- **Technical:** Data binning, percentage calculations

#### 3. Cumulative Distance
- **Purpose:** Show total distance growth over time
- **Visual:** Area chart with animation
- **Technical:** Running total calculation, p5.js animation

#### 4. Marathon Readiness Dashboard
- **Purpose:** Single view of all key metrics for Osaka Marathon prep
- **Visual:** Multi-panel dashboard combining key stats
- **Technical:** Complex layout, multiple data sources

### Feature Enhancements

| Feature | Description | Complexity |
|---------|-------------|------------|
| Goal lines | Add target lines (100km, 6:00/km) to relevant charts | Low |
| Date filter | Slider to filter data by date range | Medium |
| Tooltips | Consistent hover information across all charts | Medium |
| Export | Save chart as image | Low |

---

## Originality Statement

This project is original because:

1. **Personal Data:** Uses my own Garmin running data, not publicly available datasets
2. **Real Goal:** Tied to my actual training for Osaka Marathon 2025
3. **Custom Constructors:** Created BarChart and ScatterPlot from scratch, following the pattern of the provided PieChart
4. **Statistical Analysis:** Added correlation coefficient and linear regression for Heart Rate vs Pace analysis
5. **Practical Use:** I will actually use this to monitor my training progress

### Inspiration Sources
- The provided PieChart constructor structure
- p5.js reference documentation for drawing functions

---

## External Sources

### Code References
- p5.js official reference (https://p5js.org/reference/)
- Template provided PieChart constructor (structure reference)

### LLM Usage
- Used Claude to help with:
  - Planning the project structure
  - Debugging data loading issues
  - Calculating correlation coefficient formula
  - Converting Japanese CSV headers to English

---

## Summary

**Midterm Status:** 4 of 8 planned visualisations complete
**Confidence Level:** High - core functionality working, clear plan for extensions
**Main Risk:** Dashboard complexity - may simplify if time is short
