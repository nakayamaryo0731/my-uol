/**
 * Game Character Interaction
 * CM1005 - gp3b
 */

// Game environment constants
const GRAVITY = 2;
const JUMP_AMOUNT = 100;
const MOVE_SPEED = 5;
const CHAR_WIDTH = 24;  // Character hitbox width

// Character style constants
const PIXEL_SIZE = 3;
const STANDING_Y_OFFSET = -25;
const JUMPING_Y_OFFSET = -35;

// Collision detection constants
const COIN_COLLECT_DISTANCE = 45;
const CANYON_SIDE_WIDTH = 5;

// Color constants
const SKY_COLOR = [100, 155, 255];
const GROUND_COLOR = [0, 155, 0];
const SKIN_COLOR = [255, 212, 180];
const JACKET_COLOR = [0, 0, 190];
const PANTS_COLOR = [0, 0, 128];
const MOUTH_COLOR = [255, 0, 0];
const CANYON_COLOR = [30, 40, 80];
const CANYON_SIDE_COLOR = [70, 80, 120];
const COIN_COLOR = [255, 215, 0];
const COIN_INNER_COLOR = [255, 255, 0];
const DEBUG_TEXT_COLOR = [255, 255, 255];

// Game variables
let gameChar_x;
let gameChar_y;
let floorPos_y;

// Variables for character interaction
let isLeft;
let isRight;
let isFalling;
let isPlummeting;

// Canyon and collectable variables
let canyon;
let collectables;

// Debug mode flag
let isDebugMode = true;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = 200;
	gameChar_y = floorPos_y;
	
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	
	canyon = {
		x_pos: 500,
		width: 120
	};
	
	collectables = [
		{
			x_pos: 300,
			y_pos: floorPos_y,  // On the ground
			size: 30,
			isFound: false
		},
		{
			x_pos: 560,
			y_pos: floorPos_y - 100,  // Above the canyon
			size: 30,
			isFound: false
		}
	];
}

function draw()
{
	drawBackground();
	drawCanyon(canyon);
	checkCanyon(canyon);
	processCollectables();
	drawGameCharacter();
	handleCharacterMovement();
	
	if(isDebugMode) {
		drawDebugInfo();
	}
}

function drawBackground() {
	background(SKY_COLOR);
	noStroke();
	fill(GROUND_COLOR);
	rect(0, floorPos_y, width, height - floorPos_y);
}

function processCollectables() {
	for(let i = 0; i < collectables.length; i++) {
		if(!collectables[i].isFound) {
			drawCollectable(collectables[i]);
			checkCollectable(collectables[i]);
		}
	}
}

/**
 * Calculate directional offset based on character orientation
 * @returns {number} X-axis offset value
 */
function calculateDirectionalOffset() {
	if(isLeft) {
		return -CHAR_WIDTH/2; // Offset to the left when facing left
	} else if(isRight) {
		return CHAR_WIDTH/2;  // Offset to the right when facing right
	}
	return 0; // Centered when facing forward
}

/**
 * Draw the canyon
 * @param {Object} canyon - Canyon object
 */
function drawCanyon(canyon) {
	noStroke();
	fill(CANYON_COLOR);
	rect(canyon.x_pos, floorPos_y, canyon.width, height - floorPos_y);
	
	// Draw sides for visual clarity
	fill(CANYON_SIDE_COLOR);
	rect(canyon.x_pos, floorPos_y, CANYON_SIDE_WIDTH, height - floorPos_y);
	rect(canyon.x_pos + canyon.width - CANYON_SIDE_WIDTH, floorPos_y, CANYON_SIDE_WIDTH, height - floorPos_y);
}

/**
 * Check collision with canyon
 * @param {Object} canyon - Canyon object
 */
function checkCanyon(canyon) {
	let offsetX = calculateDirectionalOffset();
	
	// Check if character is over the canyon and on the ground
	if(gameChar_x + offsetX > canyon.x_pos + CHAR_WIDTH/2 && 
	   gameChar_x + offsetX < canyon.x_pos + canyon.width - CHAR_WIDTH/2 && 
	   gameChar_y >= floorPos_y) {
		isPlummeting = true;
	}
	
	// Adjust position to prevent clipping into the sides when falling
	if(isPlummeting) {
		if(isLeft) {
			// For left-facing character, align with left side
			if(gameChar_x < canyon.x_pos + CHAR_WIDTH) {
				gameChar_x = canyon.x_pos + CHAR_WIDTH;
			}
		} else if(isRight) {
			// For right-facing character, align with right side
			if(gameChar_x > canyon.x_pos + canyon.width - CHAR_WIDTH) {
				gameChar_x = canyon.x_pos + canyon.width - CHAR_WIDTH;
			}
		} else {
			// For forward-facing character, center align
			if(gameChar_x < canyon.x_pos + CHAR_WIDTH/2) {
				gameChar_x = canyon.x_pos + CHAR_WIDTH/2;
			} else if(gameChar_x > canyon.x_pos + canyon.width - CHAR_WIDTH/2) {
				gameChar_x = canyon.x_pos + canyon.width - CHAR_WIDTH/2;
			}
		}
	}
}

/**
 * Draw the collectable item (coin)
 * @param {Object} collectable - Collectable object
 */
function drawCollectable(collectable) {
	let displayY = collectable.y_pos - collectable.size/2;
	
	noStroke();
	fill(COIN_COLOR);
	ellipse(collectable.x_pos, displayY, collectable.size, collectable.size);
	fill(COIN_INNER_COLOR);
	ellipse(collectable.x_pos, displayY, collectable.size * 0.7, collectable.size * 0.7);
}

/**
 * Check collision with collectable
 * @param {Object} collectable - Collectable object
 */
function checkCollectable(collectable) {
	let offsetX = calculateDirectionalOffset();
	
	// Calculate adjusted y-position for collision
	let displayY = collectable.y_pos - collectable.size/2;
	
	// Calculate distance using directional offset
	let distance = dist(gameChar_x + offsetX, gameChar_y, collectable.x_pos, displayY);
	
	if(distance < COIN_COLLECT_DISTANCE) {
		collectable.isFound = true;
		console.log("Collected! Distance:", distance);
		console.log("Character state - isLeft:", isLeft, "isRight:", isRight, "offsetX:", offsetX);
	}
}

/**
 * Draw the game character
 */
function drawGameCharacter() {
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
	
	// Make falling in canyon faster
	if(isPlummeting) {
		gameChar_y += GRAVITY * 2;
	}
}

function drawDebugInfo() {
	fill(DEBUG_TEXT_COLOR);
	noStroke();
	textSize(14);
	
	text("Character: " + Math.floor(gameChar_x) + ", " + Math.floor(gameChar_y), 20, 20);
	text("States: isLeft=" + isLeft + ", isRight=" + isRight + 
	     ", isFalling=" + isFalling + ", isPlummeting=" + isPlummeting, 20, 40);
	
	text("Canyon: " + canyon.x_pos + " to " + (canyon.x_pos + canyon.width), 20, 60);
	
	text("Collectables:", 20, 80);
	for(let i = 0; i < collectables.length; i++) {
		let displayY = collectables[i].y_pos - collectables[i].size/2;
		let distance = dist(gameChar_x, gameChar_y, collectables[i].x_pos, displayY);
		
		text("  #" + (i+1) + ": pos=" + Math.floor(collectables[i].x_pos) + "," + 
			 Math.floor(displayY) + " | found=" + collectables[i].isFound + 
			 " | distance=" + Math.floor(distance), 
			 20, 100 + i*20);
	}
	
	text("Controls: A/D=move, W=jump, Z=toggle debug", 20, height - 20);
}

/**
 * Unified key event handler
 * @param {Object} event - Event object
 */
function keyControl(event) {
	console.log(event.type + ": " + key + " (" + keyCode + ")");
	
	if(key === 'z' && event.type === 'keydown') {
		isDebugMode = !isDebugMode;
		return;
	}
	
	const isKeyPressed = event.type === 'keydown';
	
	// Prevent control when character is falling into canyon
	if(isPlummeting) {
		return;
	}
	
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
 * Draw the character (combining all parts)
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
 * @param {number} x - Character's x position
 * @param {number} y - Character's y position
 * @param {number} yOffset - Vertical offset for positioning
 * @param {string} direction - Direction character is facing
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
 * @param {number} x - Character's x position
 * @param {number} y - Character's y position
 * @param {number} yOffset - Vertical offset for positioning
 * @param {string} direction - Direction character is facing
 */
function drawFace(x, y, yOffset, direction) {
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
 * @param {number} x - Character's x position
 * @param {number} y - Character's y position
 * @param {number} yOffset - Vertical offset for positioning
 * @param {string} direction - Direction character is facing
 */
function drawClothes(x, y, yOffset, direction) {
	fill(JACKET_COLOR);
	
	if (direction === 'front') {
		rect(x - 3*PIXEL_SIZE, y + yOffset, 6*PIXEL_SIZE, 4*PIXEL_SIZE);
		
		fill(255);
		rect(x - 1*PIXEL_SIZE, y + yOffset, 2*PIXEL_SIZE, 2*PIXEL_SIZE);
		
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
 * @param {number} x - Character's x position
 * @param {number} y - Character's y position
 * @param {number} yOffset - Vertical offset for positioning
 * @param {string} direction - Direction character is facing
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
