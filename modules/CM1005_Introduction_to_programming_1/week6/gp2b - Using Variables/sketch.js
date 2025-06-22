var floorPos_y;

var gameChar_x;
var gameChar_y;

var treePos_x;
var treePos_y;

var canyon;
var collectable;

var mountain;
var cloud;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = 432; //NB. we are now using a variable for the floor position

	//NB. We are now using the built in variables height and width
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Initialize tree position - placed on the ground
	treePos_x = width/4;
	treePos_y = floorPos_y;

	// Initialize canyon position and width
	canyon = {x_pos: 700, width: 100};

	// Initialize collectable item position and size
	collectable = {x_pos: 400, y_pos: floorPos_y - 20, size: 50};

	// Initialize mountain position and size
	mountain = {x_pos: 500, y_pos: floorPos_y, height: 180, width: 200};

	// Initialize cloud position and size
	cloud = {x_pos: 200, y_pos: 100, width: 80, height: 50};
}

function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	// 1. Draw mountain (display at the very back)
	noStroke();
	fill(120, 120, 120);
	triangle(
		mountain.x_pos, mountain.y_pos - mountain.height, 
		mountain.x_pos - mountain.width/2, mountain.y_pos, 
		mountain.x_pos + mountain.width/2, mountain.y_pos
	);
	
	fill(80, 80, 80);
	triangle(
		mountain.x_pos + mountain.width/4, mountain.y_pos - mountain.height*0.8, 
		mountain.x_pos + mountain.width/2 + mountain.width/4, mountain.y_pos, 
		mountain.x_pos, mountain.y_pos
	);
	
	fill(220, 220, 220);
	triangle(
		mountain.x_pos, mountain.y_pos - mountain.height, 
		mountain.x_pos + mountain.width/10, mountain.y_pos - mountain.height*0.7, 
		mountain.x_pos - mountain.width/10, mountain.y_pos - mountain.height*0.7
	);

	// 2. Draw cloud
	noStroke();
	fill(255, 255, 255);
	ellipse(
		cloud.x_pos, 
		cloud.y_pos, 
		cloud.width*0.75, 
		cloud.height*0.8
	);
	
	ellipse(
		cloud.x_pos + cloud.width/2, 
		cloud.y_pos, 
		cloud.width*0.85, 
		cloud.height
	);
	
	ellipse(
		cloud.x_pos - cloud.width/4, 
		cloud.y_pos + cloud.height/5, 
		cloud.width*0.6, 
		cloud.height*0.6
	);

	// 3. Draw tree
	noStroke();
	fill(101, 67, 33);
	rect(treePos_x - 10, treePos_y - 86, 20, 86);
	
	fill(0, 100, 0);
	ellipse(treePos_x, treePos_y - 112, 80, 80);
	ellipse(treePos_x - 30, treePos_y - 92, 60, 60);
	ellipse(treePos_x + 30, treePos_y - 92, 60, 60);

	// 4. Draw canyon
	noStroke();
	fill(100, 70, 30);
	rect(canyon.x_pos, floorPos_y, canyon.width, height - floorPos_y);
	
	// Draw waterfall
	fill(100, 155, 255); // Blue water
	rect(canyon.x_pos + canyon.width/3, floorPos_y, canyon.width/3, height - floorPos_y);
	
	// Draw waterfall bubbles
	fill(255, 255, 255, 180); // Semi-transparent white
	for(let i = 0; i < 5; i++) {
		ellipse(
			canyon.x_pos + canyon.width/2, 
			floorPos_y + 30 + i * 25, 
			canyon.width/5, 
			10
		);
	}

	// 5. Draw collectable item
	noStroke();
	fill(255, 215, 0);
	ellipse(collectable.x_pos, collectable.y_pos, collectable.size/2, collectable.size/2);
	fill(255, 255, 0);
	ellipse(collectable.x_pos, collectable.y_pos, collectable.size/3, collectable.size/3);

	// 6. Draw character (display at the very front)
	drawCharacter(gameChar_x, gameChar_y);
}

/**
 * Function to draw the character
 * @param {number} x - Character's x-coordinate
 * @param {number} y - Character's y-coordinate
 */
function drawCharacter(x, y) {
	const pixelSize = 3;
	const bodyYOffset = -25;
	
	// Draw hair
	fill(0);
	rect(x - 4*pixelSize, y - 12*pixelSize + bodyYOffset, 8*pixelSize, 4*pixelSize);
	rect(x - 5*pixelSize, y - 11*pixelSize + bodyYOffset, 10*pixelSize, 3*pixelSize);
	rect(x - 6*pixelSize, y - 10*pixelSize + bodyYOffset, 12*pixelSize, 4*pixelSize);
	
	// Draw face
	fill(255, 212, 180);
	rect(x - 4*pixelSize, y - 8*pixelSize + bodyYOffset, 8*pixelSize, 4*pixelSize);
	rect(x - 3*pixelSize, y - 4*pixelSize + bodyYOffset, 6*pixelSize, 2*pixelSize);
	
	// White of eyes
	fill(255);
	rect(x - 3*pixelSize, y - 7*pixelSize + bodyYOffset, 2*pixelSize, 2*pixelSize);
	rect(x + 1*pixelSize, y - 7*pixelSize + bodyYOffset, 2*pixelSize, 2*pixelSize);
	
	// Pupils
	fill(0);
	rect(x - 2*pixelSize, y - 7*pixelSize + bodyYOffset, 1*pixelSize, 1*pixelSize);
	rect(x + 1*pixelSize, y - 7*pixelSize + bodyYOffset, 1*pixelSize, 1*pixelSize);
	
	// Red mouth
	fill(255, 0, 0);
	rect(x - 1*pixelSize, y - 2*pixelSize + bodyYOffset, 2*pixelSize, 1*pixelSize);
	
	// Blue jacket
	fill(0, 0, 190);
	rect(x - 3*pixelSize, y + bodyYOffset, 6*pixelSize, 4*pixelSize);
	
	// White shirt part
	fill(255);
	rect(x - 1*pixelSize, y + bodyYOffset, 2*pixelSize, 2*pixelSize);
	
	// Navy pants
	fill(0, 0, 128);
	rect(x - 3*pixelSize, y + 4*pixelSize + bodyYOffset, 6*pixelSize, 2*pixelSize);
	
	// Feet
	fill(0);
	const legOffset = y + 6*pixelSize + bodyYOffset;
	rect(x - 3*pixelSize, legOffset, 2*pixelSize, 2*pixelSize);
	rect(x + 1*pixelSize, legOffset, 2*pixelSize, 2*pixelSize);
}

function mousePressed()
{
	// Move character to the clicked position (both X and Y directions)
	gameChar_x = mouseX;
	gameChar_y = mouseY;
}
