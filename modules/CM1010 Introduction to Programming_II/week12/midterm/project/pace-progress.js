/* Start of my own code */
function PaceProgress() {
  this.name = 'Pace Progress';
  this.id = 'pace-progress';
  this.title = 'Running Pace Progress Over Time';
  this.xAxisLabel = 'Date';
  this.yAxisLabel = 'Pace (min/km)';

  var marginSize = 35;
  this.layout = {
    marginSize: marginSize,
    leftMargin: marginSize * 2,
    rightMargin: width - marginSize,
    topMargin: marginSize * 2,
    bottomMargin: height - marginSize * 2,
    pad: 5,
    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },
    plotHeight: function() {
      return this.bottomMargin - this.topMargin;
    },
    grid: true,
    numXTickLabels: 8,
    numYTickLabels: 8
  };

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
    this.startDate = this.processedData.dates[0];
    this.endDate = this.processedData.dates[this.processedData.dates.length - 1];
    this.minPace = Math.floor(min(this.processedData.paces)) - 0.5;
    this.maxPace = Math.ceil(max(this.processedData.paces)) + 0.5;
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
    var dates = [];
    var paces = [];
    var distances = [];

    for (var i = 0; i < this.data.getRowCount(); i++) {
      var activityType = this.data.getString(i, 'activity_type');

      if (activityType === 'Run') {
        var dateStr = this.data.getString(i, 'date');
        var paceStr = this.data.getString(i, 'avg_pace');
        var distance = this.data.getNum(i, 'distance');

        if (distance >= 3) {
          var paceMinutes = this.paceToMinutes(paceStr);

          if (paceMinutes >= 4 && paceMinutes <= 10) {
            dates.push(new Date(dateStr));
            paces.push(paceMinutes);
            distances.push(distance);
          }
        }
      }
    }

    var combined = [];
    for (var j = 0; j < dates.length; j++) {
      combined.push({
        date: dates[j],
        pace: paces[j],
        distance: distances[j]
      });
    }
    combined.sort(function(a, b) {
      return a.date - b.date;
    });

    var sortedDates = [];
    var sortedPaces = [];
    var sortedDistances = [];
    for (var k = 0; k < combined.length; k++) {
      sortedDates.push(combined[k].date);
      sortedPaces.push(combined[k].pace);
      sortedDistances.push(combined[k].distance);
    }

    return {
      dates: sortedDates,
      paces: sortedPaces,
      distances: sortedDistances
    };
  };

  // Moving average smooths out short-term fluctuations
  this.calculateMovingAverage = function(data, windowSize) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
      var start = Math.max(0, i - windowSize + 1);
      var sum = 0;
      var count = 0;
      for (var j = start; j <= i; j++) {
        sum += data[j];
        count++;
      }
      result.push(sum / count);
    }
    return result;
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    this.drawTitle();

    drawYAxisTickLabels(this.minPace,
                        this.maxPace,
                        this.layout,
                        this.mapPaceToHeight.bind(this),
                        1);

    drawAxis(this.layout);
    drawAxisLabels(this.xAxisLabel, this.yAxisLabel, this.layout);

    var dates = this.processedData.dates;
    var paces = this.processedData.paces;

    for (var i = 0; i < dates.length; i++) {
      var x = this.mapDateToWidth(dates[i]);
      var y = this.mapPaceToHeight(paces[i]);

      fill(100, 149, 237, 150);
      noStroke();
      ellipse(x, y, 6, 6);
    }

    var movingAvg = this.calculateMovingAverage(paces, 10);
    stroke(220, 20, 60);
    strokeWeight(2);
    noFill();
    beginShape();
    for (var j = 0; j < dates.length; j++) {
      var trendX = this.mapDateToWidth(dates[j]);
      var trendY = this.mapPaceToHeight(movingAvg[j]);
      vertex(trendX, trendY);
    }
    endShape();

    this.drawXAxisLabels();
    this.drawLegend();

    fill(100);
    noStroke();
    textSize(10);
    textAlign('left', 'top');
    text('Note: Lower pace = faster running',
         this.layout.leftMargin,
         this.layout.bottomMargin + 45);
  };

  this.drawTitle = function() {
    fill(0);
    noStroke();
    textAlign('center', 'center');
    textSize(18);
    text(this.title,
         (this.layout.plotWidth() / 2) + this.layout.leftMargin,
         this.layout.topMargin / 2);
  };

  this.drawXAxisLabels = function() {
    var dates = this.processedData.dates;
    var numLabels = Math.min(this.layout.numXTickLabels, dates.length);
    var step = Math.floor(dates.length / numLabels);

    fill(0);
    noStroke();
    textSize(10);
    textAlign('center', 'top');

    for (var i = 0; i < dates.length; i += step) {
      var x = this.mapDateToWidth(dates[i]);
      var dateLabel = this.formatDate(dates[i]);

      stroke(0);
      line(x, this.layout.bottomMargin, x, this.layout.bottomMargin + 5);

      noStroke();
      text(dateLabel, x, this.layout.bottomMargin + 8);
    }
  };

  this.formatDate = function(date) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()] + ' ' + (date.getFullYear() % 100);
  };

  this.drawLegend = function() {
    var legendX = this.layout.rightMargin - 150;
    var legendY = this.layout.topMargin + 10;

    fill(100, 149, 237);
    noStroke();
    ellipse(legendX, legendY, 6, 6);
    fill(0);
    textAlign('left', 'center');
    textSize(11);
    text('Individual runs', legendX + 10, legendY);

    stroke(220, 20, 60);
    strokeWeight(2);
    line(legendX - 10, legendY + 20, legendX + 10, legendY + 20);
    noStroke();
    fill(0);
    text('10-run moving avg', legendX + 15, legendY + 20);
  };

  this.mapDateToWidth = function(date) {
    var startTime = this.startDate.getTime();
    var endTime = this.endDate.getTime();
    return map(date.getTime(),
               startTime,
               endTime,
               this.layout.leftMargin,
               this.layout.rightMargin);
  };

  this.mapPaceToHeight = function(value) {
    return map(value,
               this.minPace,
               this.maxPace,
               this.layout.topMargin,
               this.layout.bottomMargin);
  };
}
/* End of my own code */
