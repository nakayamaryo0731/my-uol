/* Start of my own code */
// Reusable tooltip component using composition pattern.
// Extracted from ScatterPlot to enable reuse across visualisations.
function Tooltip() {
  this.width = 120;
  this.padding = 5;
  this.lineHeight = 15;
  this.cornerRadius = 5;

  this.draw = function(x, y, lines, layout) {
    var tooltipHeight = this.lineHeight * lines.length + this.padding * 2;
    var tooltipX = x + 10;
    var tooltipY = y - tooltipHeight - 10;

    // Boundary detection: reposition if tooltip would go off-screen
    if (layout) {
      if (tooltipX + this.width > layout.rightMargin) {
        tooltipX = x - this.width - 10;
      }
      if (tooltipY < layout.topMargin) {
        tooltipY = y + 10;
      }
    }

    // Background
    fill(255, 255, 255, 230);
    stroke(100);
    strokeWeight(1);
    rect(tooltipX, tooltipY, this.width, tooltipHeight, this.cornerRadius);

    // Text lines
    fill(0);
    noStroke();
    textAlign('left', 'top');
    textSize(10);

    for (var i = 0; i < lines.length; i++) {
      text(lines[i], tooltipX + this.padding, tooltipY + this.padding + (i * this.lineHeight));
    }
  };
}
/* End of my own code */
