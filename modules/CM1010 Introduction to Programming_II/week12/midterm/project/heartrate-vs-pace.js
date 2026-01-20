/* Start of my own code */
function HeartRateVsPace() {
  this.name = 'Heart Rate vs Pace';
  this.id = 'heartrate-vs-pace';
  this.title = 'Heart Rate vs Running Pace';

  var marginSize = 35;
  this.layout = {
    marginSize: marginSize,
    leftMargin: marginSize * 2.5,
    rightMargin: width - marginSize,
    topMargin: marginSize * 2,
    bottomMargin: height - marginSize * 2.5,
    pad: 5,
    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },
    plotHeight: function() {
      return this.bottomMargin - this.topMargin;
    },
    grid: true,
    numXTickLabels: 6,
    numYTickLabels: 6
  };

  this.scatterPlot = new ScatterPlot(this.layout);
  this.loaded = false;

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

    this.processedData = this.processData();

    this.xRange = {
      min: Math.floor(min(this.processedData.heartRates) / 10) * 10 - 5,
      max: Math.ceil(max(this.processedData.heartRates) / 10) * 10 + 5
    };

    this.yRange = {
      min: Math.floor(min(this.processedData.paces) * 2) / 2 - 0.5,
      max: Math.ceil(max(this.processedData.paces) * 2) / 2 + 0.5
    };
  };

  this.destroy = function() {};

  this.paceToMinutes = function(paceStr) {
    var parts = paceStr.split(':');
    if (parts.length == 2) {
      return parseInt(parts[0]) + parseInt(parts[1]) / 60;
    }
    return 0;
  };

  this.processData = function() {
    var heartRates = [];
    var paces = [];
    var labels = [];

    for (var i = 0; i < this.data.getRowCount(); i++) {
      var activityType = this.data.getString(i, 'activity_type');

      if (activityType === 'Run') {
        var heartRate = this.data.getNum(i, 'avg_heart_rate');
        var paceStr = this.data.getString(i, 'avg_pace');
        var distance = this.data.getNum(i, 'distance');
        var date = this.data.getString(i, 'date');

        if (heartRate > 0 && distance >= 3) {
          var paceMinutes = this.paceToMinutes(paceStr);

          if (paceMinutes >= 5 && paceMinutes <= 9) {
            heartRates.push(heartRate);
            paces.push(paceMinutes);
            labels.push(date + ' - ' + distance.toFixed(1) + 'km');
          }
        }
      }
    }

    return {
      heartRates: heartRates,
      paces: paces,
      labels: labels
    };
  };

  // Pearson correlation coefficient: measures linear relationship between two variables
  this.calculateCorrelation = function(x, y) {
    var n = x.length;
    var sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

    for (var i = 0; i < n; i++) {
      sumX += x[i];
      sumY += y[i];
      sumXY += x[i] * y[i];
      sumX2 += x[i] * x[i];
      sumY2 += y[i] * y[i];
    }

    var numerator = (n * sumXY) - (sumX * sumY);
    var denominator = Math.sqrt(((n * sumX2) - (sumX * sumX)) *
                                 ((n * sumY2) - (sumY * sumY)));

    if (denominator === 0) return 0;
    return numerator / denominator;
  };

  // Least squares linear regression: finds best fit line y = mx + b
  this.calculateRegression = function(x, y) {
    var n = x.length;
    var sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    for (var i = 0; i < n; i++) {
      sumX += x[i];
      sumY += y[i];
      sumXY += x[i] * y[i];
      sumX2 += x[i] * x[i];
    }

    var slope = ((n * sumXY) - (sumX * sumY)) / ((n * sumX2) - (sumX * sumX));
    var intercept = (sumY - (slope * sumX)) / n;

    return { slope: slope, intercept: intercept };
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    fill(0);
    noStroke();
    textAlign('center', 'center');
    textSize(18);
    text(this.title,
         (this.layout.leftMargin + this.layout.rightMargin) / 2,
         this.layout.topMargin / 2);

    stroke(0);
    strokeWeight(1);
    line(this.layout.leftMargin, this.layout.topMargin,
         this.layout.leftMargin, this.layout.bottomMargin);
    line(this.layout.leftMargin, this.layout.bottomMargin,
         this.layout.rightMargin, this.layout.bottomMargin);

    this.scatterPlot.drawXAxisTicks(this.xRange.min, this.xRange.max,
                                     this.layout.numXTickLabels,
                                     'Average Heart Rate (bpm)');
    this.scatterPlot.drawYAxisTicks(this.yRange.min, this.yRange.max,
                                     this.layout.numYTickLabels,
                                     'Pace (min/km)');

    var regression = this.calculateRegression(
      this.processedData.heartRates,
      this.processedData.paces
    );
    this.drawTrendLine(regression);

    var pointColour = color(66, 133, 244, 180);
    this.scatterPlot.draw(
      this.processedData.heartRates,
      this.processedData.paces,
      this.xRange,
      this.yRange,
      pointColour,
      this.processedData.labels
    );

    this.drawCorrelationInfo();

    fill(100);
    textSize(10);
    textAlign('left', 'top');
    text('Hover over points to see details',
         this.layout.leftMargin,
         this.layout.bottomMargin + 50);
  };

  this.drawTrendLine = function(regression) {
    var x1 = this.xRange.min;
    var x2 = this.xRange.max;
    var y1 = regression.slope * x1 + regression.intercept;
    var y2 = regression.slope * x2 + regression.intercept;

    y1 = constrain(y1, this.yRange.min, this.yRange.max);
    y2 = constrain(y2, this.yRange.min, this.yRange.max);

    var screenX1 = this.scatterPlot.mapToX(x1, this.xRange.min, this.xRange.max);
    var screenY1 = this.scatterPlot.mapToY(y1, this.yRange.min, this.yRange.max);
    var screenX2 = this.scatterPlot.mapToX(x2, this.xRange.min, this.xRange.max);
    var screenY2 = this.scatterPlot.mapToY(y2, this.yRange.min, this.yRange.max);

    stroke(220, 20, 60);
    strokeWeight(2);
    line(screenX1, screenY1, screenX2, screenY2);
  };

  this.drawCorrelationInfo = function() {
    var correlation = this.calculateCorrelation(
      this.processedData.heartRates,
      this.processedData.paces
    );

    var infoX = this.layout.rightMargin - 180;
    var infoY = this.layout.topMargin + 10;

    fill(255, 255, 255, 200);
    stroke(200);
    strokeWeight(1);
    rect(infoX - 10, infoY - 5, 180, 70, 5);

    fill(0);
    noStroke();
    textAlign('left', 'top');
    textSize(11);

    text('Correlation: ' + correlation.toFixed(3), infoX, infoY);
    text('Data points: ' + this.processedData.heartRates.length, infoX, infoY + 16);

    textSize(10);
    fill(100);
    var interpretation;
    if (correlation < -0.3) {
      interpretation = 'Negative correlation: higher HR,';
      text(interpretation, infoX, infoY + 36);
      text('faster pace (lower number)', infoX, infoY + 48);
    } else if (correlation > 0.3) {
      interpretation = 'Positive correlation: higher HR,';
      text(interpretation, infoX, infoY + 36);
      text('slower pace', infoX, infoY + 48);
    } else {
      text('Weak correlation', infoX, infoY + 36);
    }
  };
}
/* End of my own code */
