/* Start of my own code */
function MonthlyDistance() {
  this.name = 'Monthly Distance';
  this.id = 'monthly-distance';
  this.loaded = false;

  var marginSize = 35;
  this.layout = {
    marginSize: marginSize,
    leftMargin: marginSize * 2,
    rightMargin: width - marginSize,
    topMargin: marginSize * 2,
    bottomMargin: height - marginSize * 3,
    pad: 5,
    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },
    plotHeight: function() {
      return this.bottomMargin - this.topMargin;
    },
    grid: true,
    numYTickLabels: 6
  };

  this.barChart = new BarChart(this.layout);

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
    this.monthlyData = this.aggregateByMonth();
  };

  this.destroy = function() {};

  this.aggregateByMonth = function() {
    var months = {};

    for (var i = 0; i < this.data.getRowCount(); i++) {
      var dateStr = this.data.getString(i, 'date');
      var distance = this.data.getNum(i, 'distance');
      var yearMonth = dateStr.substring(0, 7);

      if (months[yearMonth]) {
        months[yearMonth] += distance;
      } else {
        months[yearMonth] = distance;
      }
    }

    var sortedMonths = Object.keys(months).sort();
    var labels = [];
    var values = [];

    for (var j = 0; j < sortedMonths.length; j++) {
      var ym = sortedMonths[j];
      var parts = ym.split('-');
      var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var monthLabel = monthNames[parseInt(parts[1]) - 1] + ' ' + parts[0].substring(2);
      labels.push(monthLabel);
      values.push(months[ym]);
    }

    return { labels: labels, values: values };
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    fill(0);
    noStroke();
    textSize(20);
    textAlign('center', 'center');
    text('Monthly Running Distance',
         (this.layout.leftMargin + this.layout.rightMargin) / 2,
         this.layout.topMargin / 2);

    push();
    translate(this.layout.leftMargin / 3, height / 2);
    rotate(-PI / 2);
    textSize(14);
    text('Distance (km)', 0, 0);
    pop();

    stroke(0);
    strokeWeight(1);
    line(this.layout.leftMargin, this.layout.topMargin,
         this.layout.leftMargin, this.layout.bottomMargin);
    line(this.layout.leftMargin, this.layout.bottomMargin,
         this.layout.rightMargin, this.layout.bottomMargin);

    var maxDistance = max(this.monthlyData.values);
    this.barChart.drawYAxisTickLabels(0, maxDistance, this.layout.numYTickLabels, 0);

    var barColour = color(66, 133, 244);
    this.barChart.draw(
      this.monthlyData.values,
      this.monthlyData.labels,
      barColour,
      null
    );

    var totalDistance = this.monthlyData.values.reduce(function(a, b) {
      return a + b;
    }, 0);

    textSize(12);
    textAlign('left', 'top');
    fill(100);
    text('Total Distance: ' + totalDistance.toFixed(1) + ' km',
         this.layout.leftMargin,
         this.layout.bottomMargin + 60);
  };
}
/* End of my own code */
