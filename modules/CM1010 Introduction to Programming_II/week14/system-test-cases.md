# System Test Cases — Running Data Visualisation App

## Test Environment
- Browser: Google Chrome (latest)
- Resolution: 1024 × 576 canvas
- Data: activities.csv (185 records, April 2024 – February 2026)

---

## TC-01: Gallery Navigation

| Field | Detail |
|--|--|
| **Description** | All 7 visualisations appear in the navigation menu and can be selected |
| **Steps** | 1. Open index.html in Chrome 2. Check the navigation menu displays all 7 items 3. Click each menu item in sequence |
| **Expected Result** | Each visualisation loads without errors; previous visualisation is properly destroyed |
| **Actual Result** | All 7 menu items displayed correctly. Each visualisation loaded on click and the previous one was properly destroyed (e.g. dropdowns removed when switching away from Activity Types and Goal Tracker). |
| **Pass/Fail** | Pass |

## TC-02: Monthly Distance — Bar Chart Rendering

| Field | Detail |
|--|--|
| **Description** | Monthly Distance displays correct bar chart with axis labels |
| **Steps** | 1. Select "Monthly Distance" from menu 2. Verify bars are displayed for each month 3. Check Y-axis labels show distance values 4. Check X-axis labels show month names |
| **Expected Result** | Bars visible for months with data; axis labels readable; no visual overlaps |
| **Actual Result** | Bar chart rendered with bars for each month. Y-axis shows distance values, X-axis shows month labels (e.g. "Apr 24", "May 24"). Total distance displayed at bottom. No visual overlaps. |
| **Pass/Fail** | Pass |

## TC-03: Pace Progress — Moving Average

| Field | Detail |
|--|--|
| **Description** | Pace Progress shows data points with pace zone backgrounds and a smooth moving average trend line |
| **Steps** | 1. Select "Pace Progress" 2. Verify colour-coded pace zone backgrounds appear (Fast, Moderate, Easy) 3. Verify blue dots appear for individual runs 4. Verify red line (10-run moving average) overlays the dots 5. Check legend displays correctly |
| **Expected Result** | Pace zone bands visible behind data; dots and trend line visible; trend line is smoother than raw data; "Lower pace = faster" note shown |
| **Actual Result** | Three pace zone backgrounds displayed (green=Fast, yellow=Moderate, orange=Easy) with labels. Blue dots visible for individual runs. Red moving average line overlays the data and is visibly smoother. Legend shows "Individual runs" and "10-run moving avg". Note "Lower pace = faster running" displayed at bottom. |
| **Pass/Fail** | Pass |

## TC-04: Activity Types — Dropdown Switching

| Field | Detail |
|--|--|
| **Description** | Activity Types pie chart switches between count and distance views |
| **Steps** | 1. Select "Activity Types" 2. Verify pie chart shows "By Count" view by default 3. Change dropdown to "By Distance" 4. Verify pie chart updates to show distance proportions 5. Switch back to "By Count" |
| **Expected Result** | Pie chart re-renders correctly for each view; proportions differ between count and distance |
| **Actual Result** | Pie chart displayed "By Count" by default. Switching to "By Distance" updated the chart with different proportions (distance view shows Run as larger proportion). Statistics panel updated correctly for both views. Switching back to "By Count" restored the original view. |
| **Pass/Fail** | Pass |

## TC-05: Heart Rate vs Pace — Scatter Plot and Tooltip

| Field | Detail |
|--|--|
| **Description** | Scatter plot displays distance-proportional data points (bubble chart) with interactive tooltips and regression line |
| **Steps** | 1. Select "Heart Rate vs Pace" 2. Verify scatter plot shows data points with varying sizes (larger = longer distance) 3. Verify red regression trend line is visible 4. Hover over a data point 5. Check tooltip displays HR, pace, and date information 6. Verify correlation info box shows r-value |
| **Expected Result** | Points vary in size by distance; trend line and correlation visible; tooltip follows mouse; tooltip repositions at edges |
| **Actual Result** | Scatter plot displayed with blue data points sized proportionally to running distance (bubble chart effect). Red regression trend line visible. Hovering over a point showed tooltip with HR (bpm), pace (min/km), and date information. Tooltip repositioned correctly when near chart edges. Correlation info box showed r-value with interpretation. |
| **Pass/Fail** | Pass |

## TC-06: Goal Tracker — Gauge and Month Selector

| Field | Detail |
|--|--|
| **Description** | Goal Tracker gauge reflects selected month's distance toward 100km goal |
| **Steps** | 1. Select "Goal Tracker" 2. Check gauge displays for the default month 3. Change month using dropdown 4. Verify gauge updates (arc length, colour, percentage) 5. Select a month where goal was achieved (if any) 6. Select a month with low distance |
| **Expected Result** | Gauge colour changes with progress (red→orange→yellow→blue→green); stats update correctly |
| **Actual Result** | Gauge displayed for default month with correct arc length and colour. Changing months via dropdown updated the gauge arc, colour, percentage, and statistics panel. Colour changed according to progress level (red for low, green for high). Recent runs list updated per month. |
| **Pass/Fail** | Pass |

## TC-07: Training Heatmap — Calendar Grid

| Field | Detail |
|--|--|
| **Description** | Heatmap displays a GitHub-style calendar with distance-based colouring |
| **Steps** | 1. Select "Training Heatmap" 2. Verify calendar grid appears with weekday labels (Mon, Wed, Fri) and month labels 3. Verify green cells appear on active days 4. Verify grey cells appear on rest days 5. Hover over a green cell — check tooltip shows date and distance 6. Hover over a grey cell — check tooltip shows "Rest day" 7. Switch year and verify grid updates |
| **Expected Result** | 365/366 cells rendered; colour intensity reflects distance; tooltip accurate; year switch works |
| **Actual Result** | Calendar grid rendered with weekday and month labels. Green cells appeared on active days with colour intensity reflecting distance. Grey cells on rest days. Tooltip showed date and distance for active days, "Rest day" for inactive days. Year selector switched between years correctly with grid updating. |
| **Pass/Fail** | Pass |

## TC-08: Marathon Readiness Radar — Spider Chart

| Field | Detail |
|--|--|
| **Description** | Radar chart displays five normalised metrics with polygon and concentric grid |
| **Steps** | 1. Select "Marathon Readiness" 2. Verify 5 axes with labels are visible 3. Verify concentric pentagons (20%-100%) are drawn 4. Verify blue filled polygon connects data points 5. Check raw values displayed under each label 6. Check readiness score at bottom-left 7. Switch month and verify polygon shape changes |
| **Expected Result** | 5 axes at equal angles; polygon shape reflects metric values; score updates on month change |
| **Actual Result** | Five axes displayed at equal angular intervals with metric labels. Concentric pentagons drawn as reference grid. Blue filled polygon connected normalised data points. Raw values shown under labels. Readiness score displayed. Month selector changed the polygon shape and updated all values. |
| **Pass/Fail** | Pass |

## TC-09: Tooltip Reusability

| Field | Detail |
|--|--|
| **Description** | Tooltip component works consistently across scatter plot and heatmap |
| **Steps** | 1. Open "Heart Rate vs Pace" and hover over a point — note tooltip style 2. Switch to "Training Heatmap" and hover over a cell — note tooltip style 3. Compare visual consistency (background, border, text size) |
| **Expected Result** | Both tooltips use the same visual style (white bg, gray border, rounded corners) |
| **Actual Result** | Both visualisations use the shared Tooltip class. Visual style is consistent: white background, gray border, rounded corners. Boundary repositioning works in both contexts. |
| **Pass/Fail** | Pass |

## TC-10: Data Integrity — No Console Errors

| Field | Detail |
|--|--|
| **Description** | Application runs without JavaScript errors in the browser console |
| **Steps** | 1. Open Chrome DevTools (F12) → Console tab 2. Load index.html 3. Navigate through all 7 visualisations 4. Check console for any error messages |
| **Expected Result** | No JavaScript errors in the console; warnings (if any) are non-critical |
| **Actual Result** | No JavaScript errors in the console. All 7 visualisations loaded and rendered without errors. CSV data loaded successfully for all visualisations. |
| **Pass/Fail** | Pass |

---

## Test Summary

| Test ID | Description | Pass/Fail |
|--|--|--|
| TC-01 | Gallery Navigation | Pass |
| TC-02 | Monthly Distance | Pass |
| TC-03 | Pace Progress | Pass |
| TC-04 | Activity Types Dropdown | Pass |
| TC-05 | HR vs Pace Tooltip | Pass |
| TC-06 | Goal Tracker Gauge | Pass |
| TC-07 | Training Heatmap | Pass |
| TC-08 | Marathon Radar | Pass |
| TC-09 | Tooltip Reusability | Pass |
| TC-10 | No Console Errors | Pass |

**Total Passed:** 10 / 10
**Tested By:** Ryo Nakayama (250151349)
**Date:** 2 March 2026
