// Game environment constants
const GRAVITY = 2;
const JUMP_AMOUNT = 100;
const MOVE_SPEED = 5;

// Character style constants
const PIXEL_SIZE = 3;
const STANDING_Y_OFFSET = -25;
const JUMPING_Y_OFFSET = -35;

// Color constants
const SKY_COLOR = [100, 155, 255];
const GROUND_COLOR = [0, 155, 0];
const SKIN_COLOR = [255, 212, 180];
const JACKET_COLOR = [0, 0, 190];
const PANTS_COLOR = [0, 0, 128];
const MOUTH_COLOR = [255, 0, 0];

// Game variables
var gameChar_x;
var gameChar_y;
var floorPos_y;

// Variables for character interaction
var isLeft;
var isRight;
var isFalling;
var isPlummeting;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
}

function draw()
{
	background(SKY_COLOR); // Sky

	noStroke();
	fill(GROUND_COLOR);
	rect(0, floorPos_y, width, height - floorPos_y); // Ground

	// Draw the game character
	drawGameCharacter();
	
	// Handle character movement
	handleCharacterMovement();
}

function drawGameCharacter() {
	// Select the appropriate character state based on movement flags
	let direction = 'front';
	let yOffset = STANDING_Y_OFFSET;
	let isJumping = false;
	let isDiagonal = false;
	
	if (isLeft && isFalling) {
		direction = 'left';
		yOffset = JUMPING_Y_OFFSET;
		isJumping = true;
		isDiagonal = true;
	}
	else if (isRight && isFalling) {
		direction = 'right';
		yOffset = JUMPING_Y_OFFSET;
		isJumping = true;
		isDiagonal = true;
	}
	else if (isLeft) {
		direction = 'left';
	}
	else if (isRight) {
		direction = 'right';
	}
	else if (isFalling || isPlummeting) {
		yOffset = JUMPING_Y_OFFSET;
		isJumping = true;
	}
	
	// Draw the character
	drawCharacter(gameChar_x, gameChar_y, yOffset, direction, isJumping, isDiagonal);
}

function handleCharacterMovement() {
	// Left and right movement
	if(isLeft) {
		gameChar_x -= MOVE_SPEED;
	}
	
	if(isRight) {
		gameChar_x += MOVE_SPEED;
	}
	
	// Apply gravity
	if(gameChar_y < floorPos_y) {
		gameChar_y += GRAVITY;
		isFalling = true;
	} else {
		isFalling = false;
	}
	
	// Handle canyon plummeting if implemented
	if(isPlummeting) {
		gameChar_y += GRAVITY * 2;
	}
}

/**
 * Unified function to handle key events (both pressed and released)
 */
function keyControl(event) {
	// Log key information
	console.log(event.type + ": " + key + " (" + keyCode + ")");
	
	// Handle key based on event type and key pressed
	const isKeyPressed = event.type === 'keydown';
	
	switch(key) {
		case 'a':
			isLeft = isKeyPressed;
			break;
		case 'd':
			isRight = isKeyPressed;
			break;
		case 'w':
			// Only jump on key press (not release) and prevent double jumping
			if(isKeyPressed && !isFalling && !isPlummeting) {
				gameChar_y -= JUMP_AMOUNT;
			}
			break;
	}
}

// Assign the unified function to both keyPressed and keyReleased
function keyPressed() {
	keyControl({ type: 'keydown' });
}

function keyReleased() {
	keyControl({ type: 'keyup' });
}

/**
 * Function to draw the game character
 * @param {number} x - Character's x position
 * @param {number} y - Character's y position
 * @param {number} yOffset - Vertical offset for positioning
 * @param {string} direction - Direction character is facing ('front', 'left', 'right')
 * @param {boolean} isJumping - Whether character is jumping
 * @param {boolean} isDiagonal - Whether character is jumping diagonally
 */
function drawCharacter(x, y, yOffset, direction, isJumping, isDiagonal) {
	drawHair(x, y, yOffset, direction);
	drawFace(x, y, yOffset, direction);
	drawClothes(x, y, yOffset, direction);
	drawLegs(x, y, yOffset, direction);
}

/**
 * Draw character's hair
 */
function drawHair(x, y, yOffset, direction) {
	fill(0);
	
	if (direction === 'front') {
		rect(x - 4*PIXEL_SIZE, y - 12*PIXEL_SIZE + yOffset, 8*PIXEL_SIZE, 4*PIXEL_SIZE);
		rect(x - 5*PIXEL_SIZE, y - 11*PIXEL_SIZE + yOffset, 10*PIXEL_SIZE, 3*PIXEL_SIZE);
		rect(x - 6*PIXEL_SIZE, y - 10*PIXEL_SIZE + yOffset, 12*PIXEL_SIZE, 4*PIXEL_SIZE);
	} 
	else if (direction === 'left') {
		rect(x - 6*PIXEL_SIZE, y - 13*PIXEL_SIZE + yOffset, 8*PIXEL_SIZE, 4*PIXEL_SIZE);
		rect(x - 7*PIXEL_SIZE, y - 12*PIXEL_SIZE + yOffset, 9*PIXEL_SIZE, 3*PIXEL_SIZE);
		rect(x - 8*PIXEL_SIZE, y - 11*PIXEL_SIZE + yOffset, 10*PIXEL_SIZE, 4*PIXEL_SIZE);
	}
	else if (direction === 'right') {
		rect(x - 2*PIXEL_SIZE, y - 13*PIXEL_SIZE + yOffset, 8*PIXEL_SIZE, 4*PIXEL_SIZE);
		rect(x - 2*PIXEL_SIZE, y - 12*PIXEL_SIZE + yOffset, 9*PIXEL_SIZE, 3*PIXEL_SIZE);
		rect(x - 2*PIXEL_SIZE, y - 11*PIXEL_SIZE + yOffset, 10*PIXEL_SIZE, 4*PIXEL_SIZE);
	}
}

/**
 * Draw character's face
 */
function drawFace(x, y, yOffset, direction) {
	// Skin-colored face
	fill(SKIN_COLOR);
	
	if (direction === 'front') {
		rect(x - 4*PIXEL_SIZE, y - 8*PIXEL_SIZE + yOffset, 8*PIXEL_SIZE, 4*PIXEL_SIZE);
		rect(x - 3*PIXEL_SIZE, y - 4*PIXEL_SIZE + yOffset, 6*PIXEL_SIZE, 2*PIXEL_SIZE);
		
		// Eyes
		fill(255);
		rect(x - 3*PIXEL_SIZE, y - 7*PIXEL_SIZE + yOffset, 2*PIXEL_SIZE, 2*PIXEL_SIZE);
		rect(x + 1*PIXEL_SIZE, y - 7*PIXEL_SIZE + yOffset, 2*PIXEL_SIZE, 2*PIXEL_SIZE);
		
		fill(0);
		rect(x - 2*PIXEL_SIZE, y - 7*PIXEL_SIZE + yOffset, 1*PIXEL_SIZE, 1*PIXEL_SIZE);
		rect(x + 1*PIXEL_SIZE, y - 7*PIXEL_SIZE + yOffset, 1*PIXEL_SIZE, 1*PIXEL_SIZE);
		
		// Mouth
		fill(MOUTH_COLOR);
		rect(x - 1*PIXEL_SIZE, y - 2*PIXEL_SIZE + yOffset, 2*PIXEL_SIZE, 1*PIXEL_SIZE);
	}
	else if (direction === 'left') {
		rect(x - 7*PIXEL_SIZE, y - 9*PIXEL_SIZE + yOffset, 7*PIXEL_SIZE, 4*PIXEL_SIZE);
		rect(x - 6*PIXEL_SIZE, y - 5*PIXEL_SIZE + yOffset, 5*PIXEL_SIZE, 2*PIXEL_SIZE);
		
		fill(255);
		rect(x - 6*PIXEL_SIZE, y - 8*PIXEL_SIZE + yOffset, 2*PIXEL_SIZE, 2*PIXEL_SIZE);
		
		fill(0);
		rect(x - 5*PIXEL_SIZE, y - 8*PIXEL_SIZE + yOffset, 1*PIXEL_SIZE, 1*PIXEL_SIZE);
		
		fill(MOUTH_COLOR);
		rect(x - 4*PIXEL_SIZE, y - 3*PIXEL_SIZE + yOffset, 2*PIXEL_SIZE, 1*PIXEL_SIZE);
	}
	else if (direction === 'right') {
		rect(x, y - 9*PIXEL_SIZE + yOffset, 7*PIXEL_SIZE, 4*PIXEL_SIZE);
		rect(x + 1*PIXEL_SIZE, y - 5*PIXEL_SIZE + yOffset, 5*PIXEL_SIZE, 2*PIXEL_SIZE);
		
		fill(255);
		rect(x + 4*PIXEL_SIZE, y - 8*PIXEL_SIZE + yOffset, 2*PIXEL_SIZE, 2*PIXEL_SIZE);
		
		fill(0);
		rect(x + 4*PIXEL_SIZE, y - 8*PIXEL_SIZE + yOffset, 1*PIXEL_SIZE, 1*PIXEL_SIZE);
		
		fill(MOUTH_COLOR);
		rect(x + 2*PIXEL_SIZE, y - 3*PIXEL_SIZE + yOffset, 2*PIXEL_SIZE, 1*PIXEL_SIZE);
	}
}

/**
 * Draw character's clothes
 */
function drawClothes(x, y, yOffset, direction) {
	// Blue jacket
	fill(JACKET_COLOR);
	
	if (direction === 'front') {
		rect(x - 3*PIXEL_SIZE, y + yOffset, 6*PIXEL_SIZE, 4*PIXEL_SIZE);
		
		// White shirt
		fill(255);
		rect(x - 1*PIXEL_SIZE, y + yOffset, 2*PIXEL_SIZE, 2*PIXEL_SIZE);
		
		// Pants
		fill(PANTS_COLOR);
		rect(x - 3*PIXEL_SIZE, y + 4*PIXEL_SIZE + yOffset, 6*PIXEL_SIZE, 2*PIXEL_SIZE);
	}
	else if (direction === 'left') {
		rect(x - 6*PIXEL_SIZE, y - 1*PIXEL_SIZE + yOffset, 6*PIXEL_SIZE, 4*PIXEL_SIZE);
		
		fill(255);
		rect(x - 4*PIXEL_SIZE, y - 1*PIXEL_SIZE + yOffset, 2*PIXEL_SIZE, 2*PIXEL_SIZE);
		
		fill(PANTS_COLOR);
		rect(x - 6*PIXEL_SIZE, y + 3*PIXEL_SIZE + yOffset, 6*PIXEL_SIZE, 2*PIXEL_SIZE);
	}
	else if (direction === 'right') {
		rect(x, y - 1*PIXEL_SIZE + yOffset, 6*PIXEL_SIZE, 4*PIXEL_SIZE);
		
		fill(255);
		rect(x + 2*PIXEL_SIZE, y - 1*PIXEL_SIZE + yOffset, 2*PIXEL_SIZE, 2*PIXEL_SIZE);
		
		fill(PANTS_COLOR);
		rect(x, y + 3*PIXEL_SIZE + yOffset, 6*PIXEL_SIZE, 2*PIXEL_SIZE);
	}
}

/**
 * Draw character's legs
 */
function drawLegs(x, y, yOffset, direction) {
	fill(0);
	
	const legOffset = y + 6*PIXEL_SIZE + yOffset;
	
	if (direction === 'front') {
		rect(x - 3*PIXEL_SIZE, legOffset, 2*PIXEL_SIZE, 2*PIXEL_SIZE);
		rect(x + 1*PIXEL_SIZE, legOffset, 2*PIXEL_SIZE, 2*PIXEL_SIZE);
	}
	else if (direction === 'left') {
		rect(x - 6*PIXEL_SIZE, legOffset, 2*PIXEL_SIZE, 2*PIXEL_SIZE);
		rect(x - 1*PIXEL_SIZE, legOffset, 2*PIXEL_SIZE, 2*PIXEL_SIZE);
	}
	else if (direction === 'right') {
		rect(x - 1*PIXEL_SIZE, legOffset, 2*PIXEL_SIZE, 2*PIXEL_SIZE);
		rect(x + 4*PIXEL_SIZE, legOffset, 2*PIXEL_SIZE, 2*PIXEL_SIZE);
	}
}
