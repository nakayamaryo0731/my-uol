/**
 * SprayCanTool Constructor
 *
 * A drawing tool that simulates a spray can effect by drawing multiple
 * random points around the mouse cursor position when the mouse is pressed.
 */
function SprayCanTool() {
	// Name of the tool used for identification in the toolbox
	this.name = "sprayCanTool";

	// Icon displayed in the toolbar for this tool
	this.icon = "assets/sprayCan.jpg";

	// Number of paint points to draw for each frame while mouse is pressed
	this.points = 13;

	// How far the paint spreads from the mouse pointer (in pixels)
	this.spread = 10;

	/**
	 * Draw method - called continuously while this tool is selected
	 *
	 * Creates a spray paint effect by drawing random points around
	 * the mouse cursor when the mouse button is pressed.
	 */
	this.draw = function(){
		// If the mouse is pressed, paint on the canvas
		// spread describes how far to spread the paint from the mouse pointer
		// points holds how many pixels of paint for each mouse press.
		if(mouseIsPressed){
			// Draw multiple points to create spray effect
			for(var i = 0; i < this.points; i++){
				// Each point is placed at a random position within the spread area
				point(random(mouseX-this.spread, mouseX + this.spread),
					random(mouseY-this.spread, mouseY+this.spread));
			}
		}
	};
}
