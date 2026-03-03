/* Start of my own code */
// Goal Tracker: Semicircular gauge displaying monthly distance progress
// toward a 100 km goal. Uses trigonometric functions (cos/sin) for polar
// coordinate positioning along a 270-degree arc, with a five-tier colour
// system (red → green) for visual feedback.
function GoalTracker() {
  this.name = 'Goal Tracker';
  this.id = 'goal-tracker';
  this.title = 'Monthly Distance Goal';
  this.loaded = false;

  // Goal: 100km per month
  this.monthlyGoal = 100;

  // Gauge settings
  this.gaugeX = width / 2;
  this.gaugeY = height / 2 - 30;
  this.gaugeRadius = 150;
  this.gaugeWeight = 25;

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

    this.monthlyData = this.calculateMonthlyDistances();
    this.currentMonth = this.getCurrentMonthKey();

    // Create month selector
    this.select = createSelect();
    this.select.position(420, 40);

    var months = Object.keys(this.monthlyData).sort().reverse();
    for (var i = 0; i < months.length; i++) {
      this.select.option(this.formatMonthLabel(months[i]), months[i]);
    }
    this.select.selected(this.currentMonth);
  };

  this.destroy = function() {
    this.select.remove();
  };

  this.getCurrentMonthKey = function() {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    return year + '-' + month;
  };

  this.formatMonthLabel = function(yearMonth) {
    var parts = yearMonth.split('-');
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[parseInt(parts[1]) - 1] + ' ' + parts[0];
  };

  this.calculateMonthlyDistances = function() {
    var months = {};

    for (var i = 0; i < this.data.getRowCount(); i++) {
      var dateStr = this.data.getString(i, 'date');
      var distance = this.data.getNum(i, 'distance');
      var yearMonth = dateStr.substring(0, 7);

      if (months[yearMonth]) {
        months[yearMonth].total += distance;
        months[yearMonth].runs.push({
          date: dateStr,
          distance: distance
        });
      } else {
        months[yearMonth] = {
          total: distance,
          runs: [{
            date: dateStr,
            distance: distance
          }]
        };
      }
    }

    return months;
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    var selectedMonth = this.select.value();
    var monthData = this.monthlyData[selectedMonth];

    if (!monthData) {
      fill(0);
      textAlign('center', 'center');
      textSize(16);
      text('No data for selected month', width / 2, height / 2);
      return;
    }

    var currentDistance = monthData.total;
    var progress = currentDistance / this.monthlyGoal;
    var progressPercent = Math.min(progress * 100, 100);

    // Draw title
    fill(0);
    noStroke();
    textAlign('center', 'center');
    textSize(20);
    text(this.title, width / 2, 40);

    textSize(14);
    fill(100);
    text('Target: ' + this.monthlyGoal + ' km/month', width / 2, 65);

    // Draw gauge
    this.drawGauge(progressPercent, currentDistance);

    // Draw stats
    this.drawStats(monthData, currentDistance, progress);

    // Draw recent runs
    this.drawRecentRuns(monthData.runs);
  };

  this.drawGauge = function(percent, distance) {
    var startAngle = PI * 0.75;
    var endAngle = PI * 2.25;
    var totalArc = endAngle - startAngle;

    // Background arc
    noFill();
    stroke(230);
    strokeWeight(this.gaugeWeight);
    strokeCap(ROUND);
    arc(this.gaugeX, this.gaugeY, this.gaugeRadius * 2, this.gaugeRadius * 2,
        startAngle, endAngle);

    // Progress arc with color based on progress
    var progressAngle = startAngle + (totalArc * Math.min(percent / 100, 1));
    var gaugeColor = this.getProgressColor(percent);
    stroke(gaugeColor);
    strokeWeight(this.gaugeWeight);
    arc(this.gaugeX, this.gaugeY, this.gaugeRadius * 2, this.gaugeRadius * 2,
        startAngle, progressAngle);

    // Center text
    noStroke();
    fill(0);
    textAlign('center', 'center');
    textSize(42);
    textStyle(BOLD);
    text(distance.toFixed(1), this.gaugeX, this.gaugeY - 10);

    textSize(16);
    textStyle(NORMAL);
    fill(100);
    text('km', this.gaugeX, this.gaugeY + 20);

    // Percentage
    textSize(18);
    fill(gaugeColor);
    text(percent.toFixed(0) + '%', this.gaugeX, this.gaugeY + 50);

    // Goal markers
    this.drawGoalMarkers(startAngle, totalArc);
  };

  this.drawGoalMarkers = function(startAngle, totalArc) {
    var markers = [0, 25, 50, 75, 100];
    var markerRadius = this.gaugeRadius + 25;

    fill(100);
    noStroke();
    textSize(10);
    textAlign('center', 'center');

    for (var i = 0; i < markers.length; i++) {
      var angle = startAngle + (totalArc * markers[i] / 100);
      var x = this.gaugeX + cos(angle) * markerRadius;
      var y = this.gaugeY + sin(angle) * markerRadius;
      text(markers[i] + 'km', x, y);
    }
  };

  this.getProgressColor = function(percent) {
    if (percent >= 100) {
      return color(46, 204, 113); // Green - goal achieved
    } else if (percent >= 75) {
      return color(52, 152, 219); // Blue - on track
    } else if (percent >= 50) {
      return color(241, 196, 15); // Yellow - halfway
    } else if (percent >= 25) {
      return color(230, 126, 34); // Orange - needs effort
    } else {
      return color(231, 76, 60); // Red - just started
    }
  };

  this.drawStats = function(monthData, currentDistance, progress) {
    var statsX = 80;
    var statsY = height - 140;

    fill(0);
    noStroke();
    textAlign('left', 'top');
    textSize(14);
    textStyle(BOLD);
    text('Statistics', statsX, statsY);

    textSize(12);
    textStyle(NORMAL);
    fill(60);

    var remaining = Math.max(0, this.monthlyGoal - currentDistance);
    var numRuns = monthData.runs.length;
    var avgPerRun = numRuns > 0 ? currentDistance / numRuns : 0;

    text('Total runs: ' + numRuns, statsX, statsY + 25);
    text('Average per run: ' + avgPerRun.toFixed(1) + ' km', statsX, statsY + 45);
    text('Remaining: ' + remaining.toFixed(1) + ' km', statsX, statsY + 65);

    if (progress >= 1) {
      fill(46, 204, 113);
      textStyle(BOLD);
      text('Goal achieved!', statsX, statsY + 90);
    } else {
      fill(100);
      var runsNeeded = Math.ceil(remaining / avgPerRun);
      if (avgPerRun > 0 && runsNeeded > 0) {
        text('~' + runsNeeded + ' more runs needed (at current avg)', statsX, statsY + 90);
      }
    }
  };

  this.drawRecentRuns = function(runs) {
    var listX = width - 250;
    var listY = height - 140;

    fill(0);
    noStroke();
    textAlign('left', 'top');
    textSize(14);
    textStyle(BOLD);
    text('Recent Runs', listX, listY);

    textSize(11);
    textStyle(NORMAL);
    fill(60);

    // Sort by date descending and show last 5
    var sortedRuns = runs.slice().sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    var displayCount = Math.min(5, sortedRuns.length);
    for (var i = 0; i < displayCount; i++) {
      var run = sortedRuns[i];
      var dateFormatted = this.formatDate(run.date);
      text(dateFormatted + ': ' + run.distance.toFixed(1) + ' km',
           listX, listY + 25 + (i * 18));
    }
  };

  this.formatDate = function(dateStr) {
    var date = new Date(dateStr);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()] + ' ' + date.getDate();
  };
}
/* End of my own code */
