function LineToTool() {
	//Line image for tool icon
	this.icon = "assets/lineTo.jpg";
	//Naming the line tool
	this.name = "LineTo";

	//Initialise value such that line is drawn at the mouse
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	this.draw = function () {
		//Draw if mouse is pressed
		if (mouseIsPressed) {
			//Straighten the line
			if (startMouseX == -1) {
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//Keep the line after drawing
				loadPixels();
			}

			else {
				// updatePixels();
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

		else if (drawing) {
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
