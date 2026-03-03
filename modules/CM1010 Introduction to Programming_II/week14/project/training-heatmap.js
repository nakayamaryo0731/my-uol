/* Start of my own code */
// Training Heatmap: GitHub-style contribution calendar for running data.
// Displays daily running distances on a weekly calendar grid using
// nested loops (weeks x weekdays) and distance-to-colour mapping.
function TrainingHeatmap() {
  this.name = 'Training Heatmap';
  this.id = 'training-heatmap';
  this.title = 'Training Consistency Heatmap';
  this.loaded = false;

  // Grid layout settings
  this.cellSize = 13;
  this.cellGap = 2;
  this.startX = 105;
  this.startY = 110;

  // GitHub-inspired green colour scale
  this.colors = [
    [235, 237, 240],  // Level 0: No activity (light gray)
    [155, 233, 168],  // Level 1: Short distance (light green)
    [64, 196, 99],    // Level 2: Medium distance
    [48, 161, 78],    // Level 3: High distance
    [33, 110, 57]     // Level 4: Very high distance (dark green)
  ];

  this.tooltip = new Tooltip();

  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/running/activities.csv', 'csv', 'header',
      function(table) {
        self.loaded = true;
      });
  };

  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    this.dailyData = this.processDailyData();
    this.years = Object.keys(this.dailyData).sort().reverse();

    // Create year selector dropdown
    this.select = createSelect();
    this.select.position(420, 40);
    for (var i = 0; i < this.years.length; i++) {
      this.select.option(this.years[i]);
    }
  };

  this.destroy = function() {
    this.select.remove();
  };

  // Aggregate daily distances grouped by year and date
  this.processDailyData = function() {
    var data = {};

    for (var i = 0; i < this.data.getRowCount(); i++) {
      var dateStr = this.data.getString(i, 'date');
      var distance = this.data.getNum(i, 'distance');
      var year = dateStr.substring(0, 4);

      if (!data[year]) {
        data[year] = {};
      }

      if (data[year][dateStr]) {
        data[year][dateStr] += distance;
      } else {
        data[year][dateStr] = distance;
      }
    }

    return data;
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    var selectedYear = this.select.value();
    var yearData = this.dailyData[selectedYear] || {};

    // Title
    fill(0);
    noStroke();
    textAlign('center', 'center');
    textSize(20);
    text(this.title, width / 2, 40);

    textSize(14);
    fill(100);
    text(selectedYear, width / 2, 65);

    // Draw calendar components
    this.drawWeekdayLabels();
    this.drawMonthLabels(parseInt(selectedYear));
    var hoveredCell = this.drawCalendarGrid(parseInt(selectedYear), yearData);
    this.drawLegend();
    this.drawYearStats(yearData);

    // Draw tooltip last so it appears on top of all cells
    if (hoveredCell) {
      this.tooltip.draw(mouseX, mouseY, hoveredCell.lines, null);
    }
  };

  // Draw weekday labels (Mon, Wed, Fri only to avoid crowding)
  this.drawWeekdayLabels = function() {
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    fill(100);
    noStroke();
    textSize(9);
    textAlign('right', 'center');

    for (var d = 0; d < 7; d++) {
      if (d == 1 || d == 3 || d == 5) {
        var y = this.startY + d * (this.cellSize + this.cellGap) + this.cellSize / 2;
        text(days[d], this.startX - 8, y);
      }
    }
  };

  // Draw month labels along the top of the grid
  this.drawMonthLabels = function(year) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var jan1 = new Date(year, 0, 1);
    var startDayOfWeek = jan1.getDay();

    fill(100);
    noStroke();
    textSize(9);
    textAlign('left', 'bottom');

    for (var m = 0; m < 12; m++) {
      var firstOfMonth = new Date(year, m, 1);
      var dayOfYear = Math.floor((firstOfMonth - jan1) / (24 * 60 * 60 * 1000));
      var weekNum = Math.floor((dayOfYear + startDayOfWeek) / 7);

      var x = this.startX + weekNum * (this.cellSize + this.cellGap);
      text(months[m], x, this.startY - 5);
    }
  };

  // Draw the calendar grid using nested loops (weeks x weekdays).
  // O(W * 7) where W = number of weeks (~53), so O(365) per frame.
  // Returns hovered cell info for tooltip rendering.
  this.drawCalendarGrid = function(year, yearData) {
    var jan1 = new Date(year, 0, 1);
    var startDayOfWeek = jan1.getDay();

    // Calculate max distance for colour scaling
    var maxDist = 0;
    var allDistances = Object.values(yearData);
    for (var d = 0; d < allDistances.length; d++) {
      if (allDistances[d] > maxDist) {
        maxDist = allDistances[d];
      }
    }
    if (maxDist === 0) {
      maxDist = 1;
    }

    var hoveredCell = null;
    var isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    var totalDays = isLeapYear ? 366 : 365;

    // Nested loop: iterate through each week and each day within that week
    var totalWeeks = Math.ceil((totalDays + startDayOfWeek) / 7);

    for (var week = 0; week < totalWeeks; week++) {
      for (var dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        var dayIndex = week * 7 + dayOfWeek - startDayOfWeek;

        // Skip cells before Jan 1 and after Dec 31
        if (dayIndex < 0 || dayIndex >= totalDays) {
          continue;
        }

        var cellDate = new Date(year, 0, 1 + dayIndex);
        var dateStr = this.formatDateStr(cellDate);
        var distance = yearData[dateStr] || 0;

        var x = this.startX + week * (this.cellSize + this.cellGap);
        var y = this.startY + dayOfWeek * (this.cellSize + this.cellGap);

        // Map distance to colour
        var c = this.getDistanceColor(distance, maxDist);
        fill(c[0], c[1], c[2]);
        noStroke();
        rect(x, y, this.cellSize, this.cellSize, 2);

        // Check if mouse hovers over this cell
        if (mouseX >= x && mouseX <= x + this.cellSize &&
            mouseY >= y && mouseY <= y + this.cellSize) {
          // Highlight hovered cell
          noFill();
          stroke(0);
          strokeWeight(1);
          rect(x, y, this.cellSize, this.cellSize, 2);

          var lines = [dateStr];
          if (distance > 0) {
            lines.push(distance.toFixed(1) + ' km');
          } else {
            lines.push('Rest day');
          }
          hoveredCell = { lines: lines };
        }
      }
    }

    return hoveredCell;
  };

  // Format a Date object to "YYYY-MM-DD" string
  this.formatDateStr = function(date) {
    var y = date.getFullYear();
    var m = (date.getMonth() + 1).toString().padStart(2, '0');
    var d = date.getDate().toString().padStart(2, '0');
    return y + '-' + m + '-' + d;
  };

  // Map distance to colour level using quartile-based thresholds
  this.getDistanceColor = function(distance, maxDist) {
    if (distance === 0) {
      return this.colors[0];
    }

    var ratio = distance / maxDist;
    if (ratio <= 0.25) return this.colors[1];
    if (ratio <= 0.50) return this.colors[2];
    if (ratio <= 0.75) return this.colors[3];
    return this.colors[4];
  };

  // Draw colour legend (Less → More)
  this.drawLegend = function() {
    var legendX = width - 220;
    var legendY = this.startY + 7 * (this.cellSize + this.cellGap) + 30;

    fill(100);
    noStroke();
    textSize(10);
    textAlign('right', 'center');
    text('Less', legendX - 5, legendY + this.cellSize / 2);

    for (var i = 0; i < this.colors.length; i++) {
      var c = this.colors[i];
      fill(c[0], c[1], c[2]);
      noStroke();
      rect(legendX + i * (this.cellSize + 2), legendY, this.cellSize, this.cellSize, 2);
    }

    fill(100);
    textAlign('left', 'center');
    text('More', legendX + this.colors.length * (this.cellSize + 2) + 5,
         legendY + this.cellSize / 2);
  };

  // Draw year summary statistics below the grid
  this.drawYearStats = function(yearData) {
    var totalDist = 0;
    var activeDays = 0;
    var maxSingleRun = 0;
    var allDistances = Object.values(yearData);

    for (var i = 0; i < allDistances.length; i++) {
      totalDist += allDistances[i];
      activeDays++;
      if (allDistances[i] > maxSingleRun) {
        maxSingleRun = allDistances[i];
      }
    }

    var statsX = this.startX;
    var statsY = this.startY + 7 * (this.cellSize + this.cellGap) + 25;

    fill(0);
    noStroke();
    textSize(13);
    textAlign('left', 'top');
    textStyle(BOLD);
    text('Year Summary', statsX, statsY);

    textStyle(NORMAL);
    textSize(12);
    fill(60);
    text('Total distance: ' + totalDist.toFixed(1) + ' km', statsX, statsY + 22);
    text('Active days: ' + activeDays, statsX, statsY + 40);
    text('Average per active day: ' +
         (activeDays > 0 ? (totalDist / activeDays).toFixed(1) : '0') + ' km',
         statsX, statsY + 58);
    text('Longest run: ' + maxSingleRun.toFixed(1) + ' km', statsX, statsY + 76);
  };
}
/* End of my own code */
