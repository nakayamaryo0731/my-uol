/**
 * LineToTool Constructor
 *
 * A drawing tool that allows users to draw straight lines from a starting point
 * to an ending point. The line is drawn when the mouse is pressed and dragged.
 * The tool provides visual feedback by showing the line dynamically as the mouse moves.
 */
function LineToTool(){
	// Icon displayed in the toolbar for this tool
	this.icon = "assets/lineTo.jpg";

	// Name of the tool used for identification in the toolbox
	this.name = "LineTo";

	// Starting X coordinate of the line (-1 indicates no line is being drawn)
	var startMouseX = -1;

	// Starting Y coordinate of the line (-1 indicates no line is being drawn)
	var startMouseY = -1;

	// Flag to track whether a line is currently being drawn
	var drawing = false;

	/**
	 * Draw method - called continuously while this tool is selected
	 *
	 * This method handles the line drawing logic:
	 * 1. When mouse is first pressed, it records the starting position
	 * 2. While dragging, it shows a preview of the line
	 * 3. When mouse is released, the line is finalized
	 */
	this.draw = function(){

		// Check if the mouse button is currently pressed
		if(mouseIsPressed){
			// If this is the first frame of the mouse press (no start point yet)
			if(startMouseX == -1){
				// Record the starting position
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;

				// loadPixels() reads the current canvas pixels into the pixels[] array
				// This saves the current state so we can restore it each frame
				// while showing the line preview
				loadPixels();
			}

			else{
				// updatePixels() restores the pixels from the pixels[] array
				// This removes the previous frame's line preview, preventing
				// multiple preview lines from appearing on screen
				updatePixels();

				// Draw a line from the starting point to the current mouse position
				// This creates a live preview as the user drags the mouse
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

		// If mouse is released and we were drawing a line
		else if(drawing){
			// Reset the drawing state for the next line
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
