/* Start of my own code */
// ScatterPlot: Reusable scatter plot constructor that renders data points
// on a 2D plane. Uses composition with a Tooltip instance for hover
// interaction. Accepts layout, data arrays, and axis ranges as parameters.
function ScatterPlot(layout) {
  this.layout = layout;
  this.pointSize = 8;
  this.tooltip = new Tooltip();

  // sizes: optional array of per-point diameters (bubble chart mode)
  this.draw = function(xData, yData, xRange, yRange, colour, labels, sizes) {
    if (xData.length == 0 || yData.length == 0) {
      console.log('Data has length zero!');
      return;
    }

    if (xData.length != yData.length) {
      console.log('X and Y data arrays must be the same length!');
      return;
    }

    for (var i = 0; i < xData.length; i++) {
      var x = this.mapToX(xData[i], xRange.min, xRange.max);
      var y = this.mapToY(yData[i], yRange.min, yRange.max);
      var currentSize = (sizes && i < sizes.length) ? sizes[i] : this.pointSize;
      var isHovered = dist(mouseX, mouseY, x, y) < currentSize;

      if (isHovered) {
        fill(255, 100, 100);
        noStroke();
        ellipse(x, y, currentSize * 1.5, currentSize * 1.5);

        // Build tooltip lines using shared formatPace from helper-functions.js
        var lines = [
          'HR: ' + xData[i].toFixed(0) + ' bpm',
          'Pace: ' + formatPace(yData[i]) + '/km'
        ];
        if (labels && labels[i]) {
          lines.push(labels[i]);
        }
        this.tooltip.draw(x, y, lines, this.layout);
      } else {
        fill(colour);
        stroke(0);
        strokeWeight(0.5);
        ellipse(x, y, currentSize, currentSize);
      }
    }
  };

  this.mapToX = function(value, minVal, maxVal) {
    return map(value, minVal, maxVal,
               this.layout.leftMargin,
               this.layout.rightMargin);
  };

  this.mapToY = function(value, minVal, maxVal) {
    return map(value, minVal, maxVal,
               this.layout.bottomMargin,
               this.layout.topMargin);
  };

  this.drawXAxisTicks = function(minVal, maxVal, numTicks, label) {
    var range = maxVal - minVal;
    var step = range / numTicks;

    fill(0);
    noStroke();
    textAlign('center', 'top');
    textSize(10);

    for (var i = 0; i <= numTicks; i++) {
      var value = minVal + (i * step);
      var x = this.mapToX(value, minVal, maxVal);

      stroke(0);
      line(x, this.layout.bottomMargin, x, this.layout.bottomMargin + 5);

      noStroke();
      text(value.toFixed(0), x, this.layout.bottomMargin + 8);

      stroke(220);
      line(x, this.layout.topMargin, x, this.layout.bottomMargin);
    }

    textSize(12);
    text(label,
         (this.layout.leftMargin + this.layout.rightMargin) / 2,
         this.layout.bottomMargin + 30);
  };

  this.drawYAxisTicks = function(minVal, maxVal, numTicks, label) {
    var range = maxVal - minVal;
    var step = range / numTicks;

    fill(0);
    noStroke();
    textAlign('right', 'center');
    textSize(10);

    for (var i = 0; i <= numTicks; i++) {
      var value = minVal + (i * step);
      var y = this.mapToY(value, minVal, maxVal);

      text(formatPace(value), this.layout.leftMargin - 8, y);

      stroke(220);
      line(this.layout.leftMargin, y, this.layout.rightMargin, y);
    }

    push();
    translate(this.layout.leftMargin - 45, height / 2);
    rotate(-PI / 2);
    textAlign('center', 'center');
    textSize(12);
    text(label, 0, 0);
    pop();
  };
}
/* End of my own code */
