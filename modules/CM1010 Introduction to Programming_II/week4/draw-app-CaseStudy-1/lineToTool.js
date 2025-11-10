function LineToTool(){
	//set an icon and a name for the object
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	//store where the line starts when user clicks
	//-1 means we haven't started drawing yet
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	this.draw = function(){

		if(mouseIsPressed){
			//first click - record the starting point
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current canvas state so we can show a preview
				loadPixels();
			}
			//drawing - show preview line from start to current position
			else{
				//restore canvas to saved state (clears old preview)
				updatePixels();
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}
		//mouse released - finish the line
		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
