/* Start of my own code */
function ScatterPlot(layout) {
  this.layout = layout;
  this.pointSize = 8;

  this.draw = function(xData, yData, xRange, yRange, colour, labels) {
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
      var isHovered = dist(mouseX, mouseY, x, y) < this.pointSize;

      if (isHovered) {
        fill(255, 100, 100);
        noStroke();
        ellipse(x, y, this.pointSize * 1.5, this.pointSize * 1.5);
        this.drawTooltip(x, y, xData[i], yData[i], labels ? labels[i] : null);
      } else {
        fill(colour);
        stroke(0);
        strokeWeight(0.5);
        ellipse(x, y, this.pointSize, this.pointSize);
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

  this.drawTooltip = function(x, y, xVal, yVal, label) {
    var tooltipWidth = 120;
    var tooltipHeight = 50;
    var tooltipX = x + 10;
    var tooltipY = y - tooltipHeight - 10;

    if (tooltipX + tooltipWidth > this.layout.rightMargin) {
      tooltipX = x - tooltipWidth - 10;
    }
    if (tooltipY < this.layout.topMargin) {
      tooltipY = y + 10;
    }

    fill(255, 255, 255, 230);
    stroke(100);
    strokeWeight(1);
    rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 5);

    fill(0);
    noStroke();
    textAlign('left', 'top');
    textSize(10);

    var yText = 'Pace: ' + this.formatPace(yVal) + '/km';
    var xText = 'HR: ' + xVal.toFixed(0) + ' bpm';

    text(xText, tooltipX + 5, tooltipY + 5);
    text(yText, tooltipX + 5, tooltipY + 20);

    if (label) {
      text(label, tooltipX + 5, tooltipY + 35);
    }
  };

  this.formatPace = function(paceMinutes) {
    var minutes = Math.floor(paceMinutes);
    var seconds = Math.round((paceMinutes - minutes) * 60);
    if (seconds < 10) {
      return minutes + ':0' + seconds;
    }
    return minutes + ':' + seconds;
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

      text(this.formatPace(value), this.layout.leftMargin - 8, y);

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
