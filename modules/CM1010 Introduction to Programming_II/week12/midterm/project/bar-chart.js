/* Start of my own code */
function BarChart(layout) {
  this.layout = layout;
  this.barWidth = 30;
  this.barGap = 10;

  this.draw = function(data, labels, colours, title) {
    if (data.length == 0) {
      console.log('Data has length zero!');
      return;
    }

    if (labels.length != data.length) {
      console.log('Data and labels arrays must be the same length!');
      return;
    }

    var plotWidth = this.layout.rightMargin - this.layout.leftMargin;
    var plotHeight = this.layout.bottomMargin - this.layout.topMargin;
    this.barWidth = (plotWidth - (data.length + 1) * this.barGap) / data.length;
    var maxValue = max(data);

    if (title) {
      noStroke();
      fill(0);
      textAlign('center', 'center');
      textSize(16);
      text(title,
           (this.layout.leftMargin + this.layout.rightMargin) / 2,
           this.layout.topMargin - 20);
    }

    for (var i = 0; i < data.length; i++) {
      var x = this.layout.leftMargin + this.barGap + i * (this.barWidth + this.barGap);
      var barHeight = map(data[i], 0, maxValue, 0, plotHeight);
      var y = this.layout.bottomMargin - barHeight;

      if (Array.isArray(colours)) {
        fill(colours[i % colours.length]);
      } else {
        fill(colours);
      }

      stroke(0);
      strokeWeight(1);
      rect(x, y, this.barWidth, barHeight);

      noStroke();
      fill(0);
      textAlign('center', 'bottom');
      textSize(10);
      text(data[i].toFixed(1), x + this.barWidth / 2, y - 5);

      push();
      translate(x + this.barWidth / 2, this.layout.bottomMargin + 10);
      rotate(radians(-45));
      textAlign('right', 'center');
      textSize(10);
      text(labels[i], 0, 0);
      pop();
    }
  };

  this.drawYAxisTickLabels = function(minValue, maxValue, numTicks, decimalPlaces) {
    var range = maxValue - minValue;
    var tickStep = range / numTicks;

    fill(0);
    noStroke();
    textAlign('right', 'center');
    textSize(12);

    for (var i = 0; i <= numTicks; i++) {
      var value = minValue + (i * tickStep);
      var y = map(value, minValue, maxValue,
                  this.layout.bottomMargin,
                  this.layout.topMargin);

      text(value.toFixed(decimalPlaces),
           this.layout.leftMargin - 10,
           y);

      stroke(220);
      strokeWeight(1);
      line(this.layout.leftMargin, y,
           this.layout.rightMargin, y);
    }
  };
}
/* End of my own code */
