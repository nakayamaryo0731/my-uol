/* Start of my own code */
// Marathon Readiness Radar: spider chart plotting five normalised training
// metrics using trigonometry (sin/cos at 72-degree intervals).
// Provides a multi-dimensional readiness assessment in a single view.
function MarathonRadar() {
  this.name = 'Marathon Readiness';
  this.id = 'marathon-radar';
  this.title = 'Marathon Readiness Radar';
  this.loaded = false;

  // Radar chart settings
  this.centerX = width / 2;
  this.centerY = height / 2 + 10;
  this.radius = 170;
  this.numAxes = 5;
  // 72 degrees between each axis (360 / 5 = 72)
  this.angleStep = TWO_PI / this.numAxes;
  // Start from top (-PI/2) so first axis points upward
  this.startAngle = -PI / 2;

  // Five training metrics with labels and targets
  this.metrics = [
    { label: 'Monthly\nDistance', unit: 'km', target: 100 },
    { label: 'Average\nPace', unit: 'min/km', target: 6.0 },
    { label: 'Training\nConsistency', unit: 'days', target: 30 },
    { label: 'Long Runs\n(10km+)', unit: 'runs', target: 4 },
    { label: 'Heart Rate\nEfficiency', unit: 'bpm', target: 140 }
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

    this.monthlyMetrics = this.calculateAllMonthlyMetrics();
    this.months = Object.keys(this.monthlyMetrics).sort().reverse();

    // Create month selector
    this.select = createSelect();
    this.select.position(420, 40);

    for (var i = 0; i < this.months.length; i++) {
      this.select.option(this.formatMonthLabel(this.months[i]), this.months[i]);
    }
  };

  this.destroy = function() {
    this.select.remove();
  };

  this.formatMonthLabel = function(yearMonth) {
    var parts = yearMonth.split('-');
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[parseInt(parts[1]) - 1] + ' ' + parts[0];
  };

  // Calculate all five metrics for each month
  this.calculateAllMonthlyMetrics = function() {
    var months = {};

    for (var i = 0; i < this.data.getRowCount(); i++) {
      var activityType = this.data.getString(i, 'activity_type');
      if (activityType !== 'Run') continue;

      var dateStr = this.data.getString(i, 'date');
      var distance = this.data.getNum(i, 'distance');
      var paceStr = this.data.getString(i, 'avg_pace');
      var heartRate = this.data.getNum(i, 'avg_heart_rate');
      var yearMonth = dateStr.substring(0, 7);

      if (!months[yearMonth]) {
        months[yearMonth] = {
          totalDistance: 0,
          paces: [],
          activeDays: {},
          longRuns: 0,
          heartRates: []
        };
      }

      months[yearMonth].totalDistance += distance;

      var pace = paceToMinutes(paceStr);
      if (pace > 0) {
        months[yearMonth].paces.push(pace);
      }

      months[yearMonth].activeDays[dateStr] = true;

      if (distance >= 10) {
        months[yearMonth].longRuns++;
      }

      if (heartRate > 0) {
        months[yearMonth].heartRates.push(heartRate);
      }
    }

    // Normalise each metric to 0-1 scale
    var result = {};
    var monthKeys = Object.keys(months);

    for (var m = 0; m < monthKeys.length; m++) {
      var key = monthKeys[m];
      var raw = months[key];

      var avgPace = 0;
      if (raw.paces.length > 0) {
        var paceSum = 0;
        for (var p = 0; p < raw.paces.length; p++) {
          paceSum += raw.paces[p];
        }
        avgPace = paceSum / raw.paces.length;
      }

      var avgHR = 0;
      if (raw.heartRates.length > 0) {
        var hrSum = 0;
        for (var h = 0; h < raw.heartRates.length; h++) {
          hrSum += raw.heartRates[h];
        }
        avgHR = hrSum / raw.heartRates.length;
      }

      var activeDayCount = Object.keys(raw.activeDays).length;

      result[key] = {
        raw: [
          raw.totalDistance,
          avgPace,
          activeDayCount,
          raw.longRuns,
          avgHR
        ],
        normalised: [
          // 1. Monthly distance: 0-100km → 0-1 (capped at 1)
          Math.min(raw.totalDistance / 100, 1),
          // 2. Average pace: 6:00 = perfect (1.0), 9:00 = worst (0.0)
          avgPace > 0 ? Math.max(0, Math.min(1, 1 - (avgPace - 6.0) / 3.0)) : 0,
          // 3. Consistency: active days / 30
          Math.min(activeDayCount / 30, 1),
          // 4. Long runs: count / target of 4
          Math.min(raw.longRuns / 4, 1),
          // 5. Heart rate efficiency: lower avg HR = better
          // 130 bpm = perfect (1.0), 170 bpm = worst (0.0)
          avgHR > 0 ? Math.max(0, Math.min(1, 1 - (avgHR - 130) / 40)) : 0
        ]
      };
    }

    return result;
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    var selectedMonth = this.select.value();
    var monthData = this.monthlyMetrics[selectedMonth];

    // Title
    fill(0);
    noStroke();
    textAlign('center', 'center');
    textSize(20);
    text(this.title, width / 2, 40);

    textSize(14);
    fill(100);
    text(this.formatMonthLabel(selectedMonth), width / 2, 65);

    if (!monthData) {
      textSize(16);
      text('No running data for selected month', width / 2, height / 2);
      return;
    }

    // Draw radar chart components
    this.drawGridLines();
    this.drawAxes();
    this.drawDataPolygon(monthData.normalised);
    this.drawAxisLabels(monthData);
    this.drawScorecard(monthData);
  };

  // Draw concentric pentagons as reference grid (20%, 40%, 60%, 80%, 100%)
  this.drawGridLines = function() {
    var levels = [0.2, 0.4, 0.6, 0.8, 1.0];

    for (var lvl = 0; lvl < levels.length; lvl++) {
      var r = this.radius * levels[lvl];

      stroke(220);
      strokeWeight(0.5);
      noFill();
      beginShape();

      for (var i = 0; i < this.numAxes; i++) {
        var angle = this.startAngle + i * this.angleStep;
        var x = this.centerX + cos(angle) * r;
        var y = this.centerY + sin(angle) * r;
        vertex(x, y);
      }

      endShape(CLOSE);

      // Percentage label on first axis
      if (lvl < levels.length) {
        fill(180);
        noStroke();
        textSize(8);
        textAlign('center', 'bottom');
        var labelY = this.centerY - r - 2;
        text(Math.round(levels[lvl] * 100) + '%', this.centerX, labelY);
      }
    }
  };

  // Draw the five axes from center to edge
  this.drawAxes = function() {
    stroke(200);
    strokeWeight(1);

    for (var i = 0; i < this.numAxes; i++) {
      var angle = this.startAngle + i * this.angleStep;
      var x = this.centerX + cos(angle) * this.radius;
      var y = this.centerY + sin(angle) * this.radius;
      line(this.centerX, this.centerY, x, y);
    }
  };

  // Draw the filled data polygon connecting all five metric values
  this.drawDataPolygon = function(values) {
    // Filled polygon
    fill(66, 133, 244, 80);
    stroke(66, 133, 244);
    strokeWeight(2);
    beginShape();

    for (var i = 0; i < this.numAxes; i++) {
      var angle = this.startAngle + i * this.angleStep;
      var r = this.radius * values[i];
      var x = this.centerX + cos(angle) * r;
      var y = this.centerY + sin(angle) * r;
      vertex(x, y);
    }

    endShape(CLOSE);

    // Data points at each vertex
    for (var j = 0; j < this.numAxes; j++) {
      var pointAngle = this.startAngle + j * this.angleStep;
      var pointR = this.radius * values[j];
      var px = this.centerX + cos(pointAngle) * pointR;
      var py = this.centerY + sin(pointAngle) * pointR;

      fill(66, 133, 244);
      noStroke();
      ellipse(px, py, 8, 8);
    }
  };

  // Draw metric labels at the end of each axis
  this.drawAxisLabels = function(monthData) {
    var labelOffset = 30;

    for (var i = 0; i < this.numAxes; i++) {
      var angle = this.startAngle + i * this.angleStep;
      var x = this.centerX + cos(angle) * (this.radius + labelOffset);
      var y = this.centerY + sin(angle) * (this.radius + labelOffset);

      fill(0);
      noStroke();
      textSize(10);
      textStyle(BOLD);
      textAlign('center', 'center');

      // Split label into multiple lines
      var labelLines = this.metrics[i].label.split('\n');
      for (var l = 0; l < labelLines.length; l++) {
        text(labelLines[l], x, y + (l * 13) - 6);
      }

      // Show raw value below label
      textStyle(NORMAL);
      textSize(9);
      fill(100);
      var rawVal = monthData.raw[i];
      var displayVal;

      if (i === 0) {
        displayVal = rawVal.toFixed(1) + ' km';
      } else if (i === 1) {
        displayVal = formatPace(rawVal) + '/km';
      } else if (i === 2) {
        displayVal = rawVal + ' days';
      } else if (i === 3) {
        displayVal = rawVal + ' runs';
      } else {
        displayVal = rawVal > 0 ? rawVal.toFixed(0) + ' bpm' : 'N/A';
      }

      text(displayVal, x, y + labelLines.length * 13 - 2);
    }
  };

  // Draw overall readiness score and interpretation
  this.drawScorecard = function(monthData) {
    var values = monthData.normalised;
    var totalScore = 0;
    for (var i = 0; i < values.length; i++) {
      totalScore += values[i];
    }
    var avgScore = totalScore / values.length;
    var percent = Math.round(avgScore * 100);

    var cardX = 30;
    var cardY = height - 90;

    fill(0);
    noStroke();
    textAlign('left', 'top');
    textSize(14);
    textStyle(BOLD);
    text('Readiness Score', cardX, cardY);

    // Color-coded score
    if (percent >= 75) {
      fill(46, 204, 113);
    } else if (percent >= 50) {
      fill(52, 152, 219);
    } else if (percent >= 25) {
      fill(241, 196, 15);
    } else {
      fill(231, 76, 60);
    }
    textSize(28);
    text(percent + '%', cardX, cardY + 22);

    // Interpretation
    textStyle(NORMAL);
    textSize(11);
    fill(100);
    var interpretation;
    if (percent >= 75) {
      interpretation = 'Excellent - Ready for marathon';
    } else if (percent >= 50) {
      interpretation = 'Good - On track, keep training';
    } else if (percent >= 25) {
      interpretation = 'Fair - More training needed';
    } else {
      interpretation = 'Low - Significant work needed';
    }
    text(interpretation, cardX, cardY + 60);
  };
}
/* End of my own code */
