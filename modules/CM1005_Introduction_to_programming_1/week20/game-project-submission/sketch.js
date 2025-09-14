/**
 * CM1005 - Complete Skateboard Game
 * 
 * A p5.js skateboard platform game with:
 * - Character movement and jumping
 * - Coin collection system  
 * - Canyon hazards and life system
 * - Platforms and enemies
 * - Scrolling camera system
 * 
 * Controls: A/D=move, W=jump, Z=debug, SPACE=restart
 */

// Game physics constants
const SKATEBOARD_PHYSICS_GRAVITY = 2.2;
const SKATEBOARD_OLLIE_POWER = 120;
const SKATEBOARD_CRUISE_SPEED = 4.8;
const RIDER_COLLISION_RADIUS = 22;
const DECK_ELEVATION_HEIGHT = 11;

// Character drawing constants
const SPRITE_SCALE_FACTOR = 3;
const RIDER_STANCE_Y_ADJUST = -8;
const RIDER_AIRBORNE_Y_ADJUST = -8;

// Gameplay constants
const COIN_MAGNETISM_RANGE = 42;
const CANYON_WALL_THICKNESS = 6;

// Platform physics constants
const PLATFORM_HEIGHT = 15;
const PLATFORM_COLLISION_MARGIN = 5;

// Enemy physics constants
const ENEMY_COLLISION_RADIUS = 20;
const ENEMY_PATROL_SPEED = 1.5;
const ENEMY_PATROL_RANGE = 100;

// Visual color palette
const ATMOSPHERE_SKY = [95, 150, 250];
const TERRAIN_GRASS = [10, 145, 15];
const HUMAN_SKIN_TONE = [250, 208, 175];
const URBAN_JACKET = [15, 15, 180];
const STREET_DENIM = [10, 10, 120];
const EXPRESSION_LIPS = [240, 10, 10];
const VOID_CANYON_DEPTH = [25, 35, 75];
const VOID_CANYON_WALLS = [65, 75, 115];
const TREASURE_GOLD_OUTER = [250, 210, 5];
const TREASURE_GOLD_INNER = [255, 250, 10];
const DEBUG_OVERLAY_TEXT = [255, 255, 255];

// Environment decoration colors
const PEAK_SHADOW_TONE = [85, 85, 105];
const PEAK_HIGHLIGHT_TONE = [135, 135, 155];
const PEAK_SNOW_CAP = [235, 235, 245];
const PEAK_SNOW_SHADOW = [215, 215, 230];
const BARK_BROWN_BASE = [96, 62, 28];
const BARK_SHADOW_DARK = [65, 40, 15];
const FOLIAGE_GREEN_BASE = [29, 134, 29];
const FOLIAGE_SHADOW_DARK = [15, 95, 15];
const FOLIAGE_HIGHLIGHT_BRIGHT = [55, 175, 55];
const EVERGREEN_NEEDLE_COLOR = [5, 95, 5];
const VEGETATION_SHADOW = [5, 75, 5, 95];

// Atmospheric effect colors
const CUMULUS_WHITE = [255, 255, 255, 195];
const CUMULUS_SHADOW = [225, 225, 235, 145];

// Skateboard visual constants
const DECK_WOOD_COLOR = [134, 64, 14];
const DECK_GRIP_TAPE = [155, 77, 40];
const WHEEL_URETHANE = [45, 45, 45];
const TRUCK_METAL = [123, 123, 123];


// Platform color palette
const PLATFORM_STONE_BASE = [120, 120, 130];
const PLATFORM_STONE_HIGHLIGHT = [140, 140, 150];
const PLATFORM_STONE_SHADOW = [80, 80, 90];
const PLATFORM_MOSS_GREEN = [50, 120, 50];

// Enemy character color palette
const CRIMINAL_SILHOUETTE_BLACK = [25, 25, 25];
const CRIMINAL_SHADOW_DARK = [15, 15, 15];
const CRIMINAL_HIGHLIGHT_GRAY = [45, 45, 45];
const CRIMINAL_EYE_GLOW = [255, 0, 0];

// Game state variables
let skaterPositionX;
let skaterPositionY;
let groundLevelY;
let game_score;
let lives;
let gameOver;
let levelComplete;
let enemyHit;

// Player input state
let movingLeftward;
let movingRightward;
let inMidAir;
let fallingIntoVoid;

// Game object arrays
let canyons;
let collectables;
let flagpole;
let platforms;
let enemies;

// Background environment objects
let mountainPeaks;
let forestTrees;
let treePositionsArray;
let atmosphericClouds;

// Camera system
let cameraWorldX = 0;
const WORLD_BOUNDARY_WIDTH = 2048;
const CAMERA_FOLLOW_MARGIN = 380;


// Debug mode control
let debugModeActive = false;

function setup()
{
	createCanvas(1024, 576);
	groundLevelY = height * 3/4;
	skaterPositionX = 200;
	skaterPositionY = groundLevelY - DECK_ELEVATION_HEIGHT;
	
	movingLeftward = false;
	movingRightward = false;
	inMidAir = false;
	fallingIntoVoid = false;
	
	game_score = 0;
	lives = 3;
	gameOver = false;
	levelComplete = false;
	enemyHit = false;
	
	canyons = [
		{
			worldX: 500,
			gapWidth: 120
		},
		{
			worldX: 1300,
			gapWidth: 140
		}
	];
	
	collectables = [
		{
			worldX: 150,
			worldY: groundLevelY,
			diameter: 30,
			isFound: false
		},
		{
			worldX: 380,
			worldY: groundLevelY - 60,
			diameter: 30,
			isFound: false
		},
		{
			worldX: 560,
			worldY: groundLevelY - 90,
			diameter: 30,
			isFound: false
		},
		{
			worldX: 720,
			worldY: groundLevelY,
			diameter: 30,
			isFound: false
		},
		{
			worldX: 1050,
			worldY: groundLevelY - 70,
			diameter: 30,
			isFound: false
		},
		{
			worldX: 1250,
			worldY: groundLevelY - 50,
			diameter: 30,
			isFound: false
		},
		{
			worldX: 1420,
			worldY: groundLevelY - 85,
			diameter: 30,
			isFound: false
		},
		{
			worldX: 1600,
			worldY: groundLevelY,
			diameter: 30,
			isFound: false
		}
	];
	
	flagpole = {
		x_pos: 1800,
		isReached: false
	};
	
	platforms = [
		{
			worldX: 450,
			worldY: groundLevelY - 90,
			platformWidth: 80,
			platformHeight: PLATFORM_HEIGHT
		},
		{
			worldX: 900,
			worldY: groundLevelY - 100,
			platformWidth: 100,
			platformHeight: PLATFORM_HEIGHT
		},
		{
			worldX: 1450,
			worldY: groundLevelY - 85,
			platformWidth: 90,
			platformHeight: PLATFORM_HEIGHT
		}
	];
	
	enemies = [
		{
			worldX: 800,
			worldY: groundLevelY,
			patrolStartX: 750,
			patrolEndX: 850,
			direction: 1,
			isActive: true
		},
		{
			worldX: 1650,
			worldY: groundLevelY,
			patrolStartX: 1600,
			patrolEndX: 1700,
			direction: -1,
			isActive: true
		}
	];
	
	mountainPeaks = [
		{
			worldX: 100,
			baseSpan: 400,
			peakSpan: 200,
			elevation: 180
		},
		{
			worldX: 800,
			baseSpan: 500,
			peakSpan: 250,
			elevation: 220
		},
		{
			worldX: 1400,
			baseSpan: 350,
			peakSpan: 150,
			elevation: 160
		}
	];
	
	treePositionsArray = [80, 200, 320, 650, 800, 950, 1150, 1350, 1550];
	
	forestTrees = [
		{
			worldX: 80,
			baseY: groundLevelY,
			trunkWidth: 12,
			trunkHeight: 40,
			canopySize: 45,
			species: 'oak',
			scale: 'large'
		},
		{
			worldX: 200,
			baseY: groundLevelY,
			trunkWidth: 10,
			trunkHeight: 35,
			canopySize: 40,
			species: 'oak',
			scale: 'medium'
		},
		{
			worldX: 320,
			baseY: groundLevelY,
			trunkWidth: 8,
			trunkHeight: 30,
			canopySize: 35,
			species: 'oak',
			scale: 'medium'
		},
		{
			worldX: 650,
			baseY: groundLevelY,
			trunkWidth: 11,
			trunkHeight: 38,
			canopySize: 42,
			species: 'oak',
			scale: 'medium'
		},
		{
			worldX: 800,
			baseY: groundLevelY,
			trunkWidth: 10,
			trunkHeight: 35,
			canopySize: 40,
			species: 'oak',
			scale: 'medium'
		},
		{
			worldX: 950,
			baseY: groundLevelY,
			trunkWidth: 14,
			trunkHeight: 45,
			canopySize: 50,
			species: 'oak',
			scale: 'large'
		},
		{
			worldX: 1150,
			baseY: groundLevelY,
			trunkWidth: 13,
			trunkHeight: 42,
			canopySize: 48,
			species: 'oak',
			scale: 'large'
		},
		{
			worldX: 1350,
			baseY: groundLevelY,
			trunkWidth: 9,
			trunkHeight: 32,
			canopySize: 38,
			species: 'oak',
			scale: 'medium'
		},
		{
			worldX: 1550,
			baseY: groundLevelY,
			trunkWidth: 11,
			trunkHeight: 38,
			canopySize: 42,
			species: 'oak',
			scale: 'medium'
		}
	];
	
	atmosphericClouds = [
		{
			worldX: 150,
			worldY: 120,
			size: 60,
			type: 'medium'
		},
		{
			worldX: 450,
			worldY: 80,
			size: 80,
			type: 'large'
		},
		{
			worldX: 750,
			worldY: 100,
			size: 50,
			type: 'small'
		},
		{
			worldX: 1100,
			worldY: 90,
			size: 70,
			type: 'medium'
		},
		{
			worldX: 1400,
			worldY: 110,
			size: 55,
			type: 'small'
		},
		{
			worldX: 1700,
			worldY: 70,
			size: 85,
			type: 'large'
		}
	];
}

function draw()
{
	drawBackground();
	
	// World coordinate system with camera scrolling
	push();
	translate(-cameraWorldX, 0);
	
	drawClouds();
	drawMountains();
	drawTrees();
	for(let i = 0; i < canyons.length; i++) {
		drawCanyon(canyons[i]);
		if(!gameOver && !levelComplete && !enemyHit) {
			checkCanyon(canyons[i]);
		}
	}

	for(let i = 0; i < collectables.length; i++) {
		if(!collectables[i].isFound) {
			drawCollectable(collectables[i]);
			if(!gameOver && !levelComplete && !enemyHit) {
				checkCollectable(collectables[i]);
			}
		}
	}

	for(let i = 0; i < platforms.length; i++) {
		drawPlatform(platforms[i]);
		if(!gameOver && !levelComplete && !enemyHit) {
			checkPlatform(platforms[i]);
		}
	}

	for(let i = 0; i < enemies.length; i++) {
		drawEnemy(enemies[i]);
		if(!gameOver && !levelComplete && !enemyHit) {
			updateEnemy(enemies[i]);
			checkEnemy(enemies[i]);
		}
	}

	renderFlagpole();
	
	pop();

	renderSkateboardRider();

	if(!gameOver && !levelComplete && !enemyHit) {
		checkFlagpole();
		updateCamera();
		updateSkaterPhysics();
	}

	drawScore();
	drawGameText();

	if(debugModeActive) {
		drawDebugInfo();
	}
}

function drawBackground() {
	background(ATMOSPHERE_SKY);
	noStroke();
	fill(TERRAIN_GRASS);
	rect(0, groundLevelY, WORLD_BOUNDARY_WIDTH, height - groundLevelY);
}

// Calculate collision offset based on movement direction
function calculateDirectionalOffset() {
	if(movingLeftward) {
		return -RIDER_COLLISION_RADIUS;
	} else if(movingRightward) {
		return RIDER_COLLISION_RADIUS;
	}
	return 0;
}

function drawCollectable(t_collectable) {
	let screenX = t_collectable.worldX;
	let displayY = t_collectable.worldY - t_collectable.diameter/2;
	
	noStroke();
	fill(TREASURE_GOLD_OUTER);
	ellipse(screenX, displayY, t_collectable.diameter, t_collectable.diameter);
	fill(TREASURE_GOLD_INNER);
	ellipse(screenX, displayY, t_collectable.diameter * 0.7, t_collectable.diameter * 0.7);
}

function checkCollectable(t_collectable) {
	let offsetX = calculateDirectionalOffset();
	let displayY = t_collectable.worldY - t_collectable.diameter/2;
	let distance = dist(skaterPositionX + offsetX, skaterPositionY, t_collectable.worldX, displayY);
	
	if(distance < COIN_MAGNETISM_RANGE) {
		game_score += 1;
		t_collectable.isFound = true;
	}
}

function drawCanyon(t_canyon) {

	let screenX = t_canyon.worldX - cameraWorldX;
	

	if(screenX + t_canyon.gapWidth < -50 || screenX > width + 50) {
		return;
	}
	
	noStroke();
	fill(VOID_CANYON_DEPTH);
	rect(t_canyon.worldX, groundLevelY, t_canyon.gapWidth, height - groundLevelY);
	
	fill(VOID_CANYON_WALLS);
	rect(t_canyon.worldX, groundLevelY, CANYON_WALL_THICKNESS, height - groundLevelY);
	rect(t_canyon.worldX + t_canyon.gapWidth - CANYON_WALL_THICKNESS, groundLevelY, CANYON_WALL_THICKNESS, height - groundLevelY);
}

function checkCanyon(t_canyon) {
	let offsetX = calculateDirectionalOffset();
	
	// Canyon fall detection
	if(skaterPositionX + offsetX > t_canyon.worldX + RIDER_COLLISION_RADIUS && 
	   skaterPositionX + offsetX < t_canyon.worldX + t_canyon.gapWidth - RIDER_COLLISION_RADIUS && 
	   skaterPositionY >= groundLevelY - DECK_ELEVATION_HEIGHT) {
		fallingIntoVoid = true;
	}
	
	// Wall collision during fall
	if(fallingIntoVoid) {
		if(skaterPositionX + offsetX >= t_canyon.worldX - RIDER_COLLISION_RADIUS && 
		   skaterPositionX + offsetX <= t_canyon.worldX + t_canyon.gapWidth + RIDER_COLLISION_RADIUS) {
			adjustCharacterPositionInCanyon(t_canyon);
		}
	}
	
	// Life reduction when falling off screen
	if(fallingIntoVoid && skaterPositionY > height + 100) {
		loseLife();
	}
}

function checkFlagpole() {
	if(!flagpole.isReached) {
		let distance = abs(skaterPositionX - flagpole.x_pos);
		if(distance < 15) {
			flagpole.isReached = true;
			levelComplete = true;
		}
	}
}

function loseLife() {
	lives -= 1;
	if(lives > 0) {
		startGame();
	} else {
		gameOver = true;
	}
}

function startGame() {
	// Reset character to initial position
	skaterPositionX = 200;
	skaterPositionY = groundLevelY - DECK_ELEVATION_HEIGHT;
	
	// Reset state
	movingLeftward = false;
	movingRightward = false;
	inMidAir = false;
	fallingIntoVoid = false;
	
	// Reset camera
	cameraWorldX = 0;
	
	// Restore collectables
	for(let i = 0; i < collectables.length; i++) {
		collectables[i].isFound = false;
	}
	
	// Reset flagpole
	flagpole.isReached = false;
	levelComplete = false;
	
	// Reset enemies
	for(let i = 0; i < enemies.length; i++) {
		enemies[i].isActive = true;
	}
}

function adjustCharacterPositionInCanyon(t_canyon) {
	if(movingLeftward) {
		if(skaterPositionX < t_canyon.worldX + RIDER_COLLISION_RADIUS) {
			skaterPositionX = t_canyon.worldX + RIDER_COLLISION_RADIUS;
		}
	} else if(movingRightward) {
		if(skaterPositionX > t_canyon.worldX + t_canyon.gapWidth - RIDER_COLLISION_RADIUS) {
			skaterPositionX = t_canyon.worldX + t_canyon.gapWidth - RIDER_COLLISION_RADIUS;
		}
	} else {
		if(skaterPositionX < t_canyon.worldX + RIDER_COLLISION_RADIUS/2) {
			skaterPositionX = t_canyon.worldX + RIDER_COLLISION_RADIUS/2;
		} else if(skaterPositionX > t_canyon.worldX + t_canyon.gapWidth - RIDER_COLLISION_RADIUS/2) {
			skaterPositionX = t_canyon.worldX + t_canyon.gapWidth - RIDER_COLLISION_RADIUS/2;
		}
	}
}

function renderSkateboardRider() {
	let direction = 'front';
	let yOffset = RIDER_STANCE_Y_ADJUST;
	let isJumping = false;
	
	if (movingLeftward && inMidAir) {
		direction = 'left';
		yOffset = RIDER_AIRBORNE_Y_ADJUST;
		isJumping = true;
	}
	else if (movingRightward && inMidAir) {
		direction = 'right';
		yOffset = RIDER_AIRBORNE_Y_ADJUST;
		isJumping = true;
	}
	else if (movingLeftward) {
		direction = 'left';
	}
	else if (movingRightward) {
		direction = 'right';
	}
	else if (inMidAir || fallingIntoVoid) {
		yOffset = RIDER_AIRBORNE_Y_ADJUST;
		isJumping = true;
	}
	
	let screenX = skaterPositionX - cameraWorldX;
	
	if (!fallingIntoVoid) {
		drawSkateboard(screenX, skaterPositionY);
	}
	
	drawCharacter(screenX, skaterPositionY, yOffset, direction, isJumping);
}

function updateSkaterPhysics() {
	if(movingLeftward && skaterPositionX > 0) {
		skaterPositionX -= SKATEBOARD_CRUISE_SPEED;
	}
	
	if(movingRightward && skaterPositionX < WORLD_BOUNDARY_WIDTH - RIDER_COLLISION_RADIUS) {
		skaterPositionX += SKATEBOARD_CRUISE_SPEED;
	}
	
	// Apply gravity only if above ground level
	if(skaterPositionY < groundLevelY - DECK_ELEVATION_HEIGHT) {
		let onPlatform = false;
		
		// Skip platform check if falling into canyon
		if(!fallingIntoVoid) {
			for(let i = 0; i < platforms.length; i++) {
				let platform = platforms[i];
				if(skaterPositionX >= platform.worldX - RIDER_COLLISION_RADIUS &&
				   skaterPositionX <= platform.worldX + platform.platformWidth + RIDER_COLLISION_RADIUS &&
				   Math.abs(skaterPositionY - (platform.worldY - DECK_ELEVATION_HEIGHT)) < 5) {
					onPlatform = true;
					break;
				}
			}
		}
		
		if(!onPlatform) {
			skaterPositionY += SKATEBOARD_PHYSICS_GRAVITY;
			inMidAir = true;
		} else {
			inMidAir = false;
		}
	} else {
		// Land on ground level (unless falling into canyon)
		if(!fallingIntoVoid) {
			skaterPositionY = groundLevelY - DECK_ELEVATION_HEIGHT;
			inMidAir = false;
		}
	}
	
	if(fallingIntoVoid) {
		skaterPositionY += SKATEBOARD_PHYSICS_GRAVITY * 2;
	}
}

function updateCamera() {
	// Keep character centered on screen
	cameraWorldX = skaterPositionX - width/2;
	
	// Boundary limits
	let maxCameraX = WORLD_BOUNDARY_WIDTH - width;
	if(cameraWorldX > maxCameraX) {
		cameraWorldX = maxCameraX;
	}
	
	if(cameraWorldX < 0) {
		cameraWorldX = 0;
	}
}

function renderFlagpole() {
	push();
	stroke(180);
	strokeWeight(5);
	
	line(flagpole.x_pos, groundLevelY, flagpole.x_pos, groundLevelY - 250);
	
	noStroke();
	fill(255, 0, 255);
	
	// Flag position based on reached state
	if(flagpole.isReached) {
		rect(flagpole.x_pos, groundLevelY - 250, 50, 30);
	} else {
		rect(flagpole.x_pos, groundLevelY - 50, 50, 30);
	}
	
	pop();
}

function drawScore() {
	fill(DEBUG_OVERLAY_TEXT);
	noStroke();
	textSize(20);
	text("Score: " + game_score, 20, 30);
	text("Lives: " + lives, 20, 60);
}

function drawGameText() {
	if(gameOver || levelComplete || enemyHit) {
		fill(255, 255, 255, 180);
		rect(0, 0, width, height);
		
		fill(DEBUG_OVERLAY_TEXT);
		noStroke();
		textAlign(CENTER);
		textSize(48);
		
		if(gameOver) {
			text("GAME OVER", width/2, height/2 - 30);
			textSize(24);
			text("Press SPACE to restart", width/2, height/2 + 30);
		} else if(levelComplete) {
			text("LEVEL COMPLETE", width/2, height/2 - 30);
			textSize(24);
			text("Press SPACE to restart", width/2, height/2 + 30);
		} else if(enemyHit) {
			text("ENEMY HIT!", width/2, height/2 - 30);
			textSize(24);
			text("Press SPACE to restart", width/2, height/2 + 30);
		}
		
		textAlign(LEFT);
	}
}

function drawDebugInfo() {
	fill(DEBUG_OVERLAY_TEXT);
	noStroke();
	textSize(14);
	
	text("Character: " + Math.floor(skaterPositionX) + ", " + Math.floor(skaterPositionY), 20, 20);
	text("Camera: " + Math.floor(cameraWorldX), 20, 40);
	text("Screen Character: " + Math.floor(skaterPositionX - cameraWorldX), 20, 60);
	text("States: movingLeftward=" + movingLeftward + ", movingRightward=" + movingRightward + 
	     ", inMidAir=" + inMidAir + ", fallingIntoVoid=" + fallingIntoVoid, 20, 80);
	
	text("Canyons:", 20, 100);
	for(let i = 0; i < canyons.length; i++) {
		text("  #" + (i+1) + ": " + canyons[i].worldX + " to " + (canyons[i].worldX + canyons[i].gapWidth), 20, 120 + i*20);
	}
	
	text("Collectables:", 20, 160);
	for(let i = 0; i < collectables.length; i++) {
		let displayY = collectables[i].worldY - collectables[i].diameter/2;
		let distance = dist(skaterPositionX, skaterPositionY, collectables[i].worldX, displayY);
		
		text("  #" + (i+1) + ": pos=" + Math.floor(collectables[i].worldX) + "," + 
			 Math.floor(displayY) + " | collected=" + collectables[i].isFound + 
			 " | distance=" + Math.floor(distance), 
			 20, 180 + i*20);
	}
	
	text("Platforms:", 20, 340);
	for(let i = 0; i < platforms.length; i++) {
		let platformCenterX = platforms[i].worldX + platforms[i].platformWidth/2;
		let distance = dist(skaterPositionX, skaterPositionY, platformCenterX, platforms[i].worldY);
		
		text("  #" + (i+1) + ": pos=" + Math.floor(platforms[i].worldX) + "," + 
			 Math.floor(platforms[i].worldY) + " | size=" + platforms[i].platformWidth + "x" + 
			 platforms[i].platformHeight + " | distance=" + Math.floor(distance), 
			 20, 360 + i*20);
	}
	
	text("Enemies:", 20, 420);
	for(let i = 0; i < enemies.length; i++) {
		let distance = dist(skaterPositionX, skaterPositionY, enemies[i].worldX, enemies[i].worldY - 35);
		let directionText = enemies[i].direction === 1 ? "R" : "L";
		
		text("  #" + (i+1) + ": pos=" + Math.floor(enemies[i].worldX) + "," + 
			 Math.floor(enemies[i].worldY - 35) + " | active=" + enemies[i].isActive + 
			 " | dir=" + directionText + " | distance=" + Math.floor(distance), 
			 20, 440 + i*20);
	}
	
	text("Controls: A/D=move, W=jump, Z=toggle debug", 20, height - 20);
}

function drawClouds() {
	for(let i = 0; i < atmosphericClouds.length; i++) {
		drawCloud(atmosphericClouds[i]);
	}
}

function drawCloud(cloud) {

	let screenX = cloud.worldX - cameraWorldX;
	

	if(screenX + cloud.size * 2 < -100 || screenX > width + 100) {
		return;
	}
	
	noStroke();
	
	// Generate circles based on cloud type
	let circles = [];
	if(cloud.type === 'small') {
		circles = [
			{x: 0, y: 0, size: cloud.size},
			{x: -cloud.size * 0.4, y: cloud.size * 0.1, size: cloud.size * 0.7},
			{x: cloud.size * 0.3, y: cloud.size * 0.15, size: cloud.size * 0.8}
		];
	} else if(cloud.type === 'medium') {
		circles = [
			{x: 0, y: 0, size: cloud.size},
			{x: -cloud.size * 0.5, y: cloud.size * 0.1, size: cloud.size * 0.8},
			{x: cloud.size * 0.4, y: cloud.size * 0.12, size: cloud.size * 0.9},
			{x: -cloud.size * 0.2, y: -cloud.size * 0.3, size: cloud.size * 0.6},
			{x: cloud.size * 0.15, y: -cloud.size * 0.25, size: cloud.size * 0.65}
		];
	} else if(cloud.type === 'large') {
		circles = [
			{x: 0, y: 0, size: cloud.size},
			{x: -cloud.size * 0.6, y: cloud.size * 0.1, size: cloud.size * 0.85},
			{x: cloud.size * 0.5, y: cloud.size * 0.08, size: cloud.size * 0.9},
			{x: -cloud.size * 0.3, y: -cloud.size * 0.35, size: cloud.size * 0.7},
			{x: cloud.size * 0.2, y: -cloud.size * 0.3, size: cloud.size * 0.75},
			{x: -cloud.size * 0.8, y: cloud.size * 0.25, size: cloud.size * 0.6},
			{x: cloud.size * 0.7, y: cloud.size * 0.2, size: cloud.size * 0.65}
		];
	}
	
	// Shadow layer
	fill(CUMULUS_SHADOW[0], CUMULUS_SHADOW[1], CUMULUS_SHADOW[2], CUMULUS_SHADOW[3]);
	for(let circle of circles) {
		ellipse(cloud.worldX + circle.x + 3, cloud.worldY + circle.y + 2, circle.size, circle.size);
	}
	
	// Main layer
	fill(CUMULUS_WHITE[0], CUMULUS_WHITE[1], CUMULUS_WHITE[2], CUMULUS_WHITE[3]);
	for(let circle of circles) {
		ellipse(cloud.worldX + circle.x, cloud.worldY + circle.y, circle.size, circle.size);
	}
	
	// Highlight layer
	fill(255, 255, 255, 120);
	for(let i = 0; i < circles.length; i++) {
		if(i < circles.length / 2) {
			let circle = circles[i];
			ellipse(cloud.worldX + circle.x - circle.size * 0.2, 
					cloud.worldY + circle.y - circle.size * 0.15, 
					circle.size * 0.4, circle.size * 0.4);
		}
	}
}

function drawMountains() {
	for(let i = 0; i < mountainPeaks.length; i++) {
		drawMountain(mountainPeaks[i]);
	}
}

function drawMountain(mountain) {

	let screenX = mountain.worldX - cameraWorldX;
	

	if(screenX + mountain.baseSpan < 0 || screenX > width) {
		return;
	}
	
	let peakY = groundLevelY - mountain.elevation;
	let baseY = groundLevelY;
	let leftPeakX = mountain.worldX + (mountain.baseSpan - mountain.peakSpan) / 2;
	let rightPeakX = mountain.worldX + (mountain.baseSpan + mountain.peakSpan) / 2;
	
	noStroke();
	
	// Shadow side (left)
	fill(PEAK_SHADOW_TONE);
	beginShape();
	vertex(mountain.worldX, baseY);
	vertex(leftPeakX, peakY);
	vertex(leftPeakX + mountain.peakSpan / 2, peakY);
	vertex(mountain.worldX + mountain.baseSpan / 2, baseY);
	endShape(CLOSE);
	
	// Light side (right)
	fill(PEAK_HIGHLIGHT_TONE);
	beginShape();
	vertex(mountain.worldX + mountain.baseSpan / 2, baseY);
	vertex(leftPeakX + mountain.peakSpan / 2, peakY);
	vertex(rightPeakX, peakY);
	vertex(mountain.worldX + mountain.baseSpan, baseY);
	endShape(CLOSE);
	
	// Ridge line
	stroke(PEAK_SHADOW_TONE);
	strokeWeight(2);
	line(leftPeakX, peakY, rightPeakX, peakY);
	noStroke();
	
	// Snow cap
	fill(PEAK_SNOW_CAP);
	let snowHeight = mountain.elevation * 0.35;
	beginShape();
	vertex(leftPeakX, peakY);
	vertex(rightPeakX, peakY);
	vertex(rightPeakX - mountain.peakSpan * 0.15, peakY + snowHeight);
	vertex(leftPeakX + mountain.peakSpan * 0.15, peakY + snowHeight);
	endShape(CLOSE);
	
	// Snow shadow
	fill(PEAK_SNOW_SHADOW);
	beginShape();
	vertex(leftPeakX, peakY);
	vertex(leftPeakX + mountain.peakSpan * 0.4, peakY);
	vertex(leftPeakX + mountain.peakSpan * 0.3, peakY + snowHeight * 0.8);
	vertex(leftPeakX + mountain.peakSpan * 0.15, peakY + snowHeight);
	endShape(CLOSE);
}

function drawTrees() {
	for(let i = 0; i < forestTrees.length; i++) {
		drawTree(forestTrees[i]);
	}
}

function drawTree(tree) {

	let screenX = tree.worldX - cameraWorldX;
	

	if(screenX + tree.canopySize < -50 || screenX > width + 50) {
		return;
	}
	
	if(tree.species === 'oak') {
		drawOakTree(tree, tree.worldX);
	} else if(tree.species === 'pine') {
		drawPineTree(tree, tree.worldX);
	}
}

function drawOakTree(tree, screenX) {
	noStroke();
	
	// Ground shadow
	fill(VEGETATION_SHADOW[0], VEGETATION_SHADOW[1], VEGETATION_SHADOW[2], VEGETATION_SHADOW[3]);
	ellipse(screenX + 5, tree.baseY, tree.canopySize * 0.8, tree.canopySize * 0.3);
	
	// Trunk shadow
	fill(BARK_SHADOW_DARK);
	rect(screenX - tree.trunkWidth/2 + 2, 
		 tree.baseY - tree.trunkHeight, 
		 tree.trunkWidth * 0.4, 
		 tree.trunkHeight);
	
	// Main trunk
	fill(BARK_BROWN_BASE);
	rect(screenX - tree.trunkWidth/2, 
		 tree.baseY - tree.trunkHeight, 
		 tree.trunkWidth, 
		 tree.trunkHeight);
	
	// Branches
	stroke(BARK_BROWN_BASE);
	strokeWeight(3);
	line(screenX, tree.baseY - tree.trunkHeight * 0.7, 
		 screenX - tree.canopySize * 0.3, tree.baseY - tree.trunkHeight * 0.9);
	line(screenX, tree.baseY - tree.trunkHeight * 0.6, 
		 screenX + tree.canopySize * 0.25, tree.baseY - tree.trunkHeight * 0.8);
	noStroke();
	
	let leavesY = tree.baseY - tree.trunkHeight - tree.canopySize/2;
	
	// Leaves shadow
	fill(FOLIAGE_SHADOW_DARK);
	ellipse(screenX + 3, leavesY + 3, tree.canopySize, tree.canopySize);
	ellipse(screenX - tree.canopySize/3 + 2, leavesY + tree.canopySize/4 + 2, 
			tree.canopySize * 0.7, tree.canopySize * 0.7);
	
	// Main leaves
	fill(FOLIAGE_GREEN_BASE);
	ellipse(screenX, leavesY, tree.canopySize, tree.canopySize);
	
	// Side leaves
	ellipse(screenX - tree.canopySize/3, leavesY + tree.canopySize/4, 
			tree.canopySize * 0.7, tree.canopySize * 0.7);
	ellipse(screenX + tree.canopySize/3, leavesY + tree.canopySize/4, 
			tree.canopySize * 0.7, tree.canopySize * 0.7);
	
	// Top leaves
	ellipse(screenX, leavesY - tree.canopySize/3, 
			tree.canopySize * 0.6, tree.canopySize * 0.6);
	
	// Highlights
	fill(FOLIAGE_HIGHLIGHT_BRIGHT);
	ellipse(screenX - tree.canopySize/6, leavesY - tree.canopySize/6, 
			tree.canopySize * 0.4, tree.canopySize * 0.4);
	ellipse(screenX + tree.canopySize/5, leavesY + tree.canopySize/8, 
			tree.canopySize * 0.3, tree.canopySize * 0.3);
}

function drawPineTree(tree, screenX) {
	noStroke();
	
	// Ground shadow
	fill(VEGETATION_SHADOW[0], VEGETATION_SHADOW[1], VEGETATION_SHADOW[2], VEGETATION_SHADOW[3]);
	ellipse(screenX + 3, tree.baseY, tree.canopySize * 0.6, tree.canopySize * 0.2);
	
	// Trunk shadow
	fill(BARK_SHADOW_DARK);
	rect(screenX - tree.trunkWidth/2 + 1, 
		 tree.baseY - tree.trunkHeight, 
		 tree.trunkWidth * 0.4, 
		 tree.trunkHeight);
	
	// Main trunk
	fill(BARK_BROWN_BASE);
	rect(screenX - tree.trunkWidth/2, 
		 tree.baseY - tree.trunkHeight, 
		 tree.trunkWidth, 
		 tree.trunkHeight);
	
	// Pine layers - triangular sections
	fill(EVERGREEN_NEEDLE_COLOR);
	let layerHeight = tree.trunkHeight / 3;
	let currentY = tree.baseY - tree.trunkHeight;
	let currentSize = tree.canopySize;
	
	for(let i = 0; i < 4; i++) {
		// Shadow layer
		fill(FOLIAGE_SHADOW_DARK);
		triangle(screenX + 2, currentY + 2, 
				screenX - currentSize/2 + 2, currentY - layerHeight + 2,
				screenX + currentSize/2 + 2, currentY - layerHeight + 2);
		
		// Main layer
		fill(EVERGREEN_NEEDLE_COLOR);
		triangle(screenX, currentY, 
				screenX - currentSize/2, currentY - layerHeight,
				screenX + currentSize/2, currentY - layerHeight);
		
		// Highlight
		fill(FOLIAGE_HIGHLIGHT_BRIGHT);
		triangle(screenX - 2, currentY - layerHeight * 0.3, 
				screenX - currentSize/4, currentY - layerHeight * 0.7,
				screenX + currentSize/6, currentY - layerHeight * 0.5);
		
		currentY -= layerHeight * 0.7;
		currentSize *= 0.8;
	}
}

function keyControl(event) {
	if(key === 'z' && event.type === 'keydown') {
		debugModeActive = !debugModeActive;
		return;
	}
	
	const isKeyPressed = event.type === 'keydown';
	
	// Restart game when ended
	if((gameOver || levelComplete || enemyHit) && key === ' ' && isKeyPressed) {
		game_score = 0;
		lives = 3;
		gameOver = false;
		levelComplete = false;
		enemyHit = false;
		startGame();
		return;
	}
	
	// Disable controls when game ended or falling
	if(gameOver || levelComplete || enemyHit || fallingIntoVoid) {
		return;
	}
	
	switch(key) {
		case 'a':
			movingLeftward = isKeyPressed;
			break;
		case 'd':
			movingRightward = isKeyPressed;
			break;
		case 'w':
			if(isKeyPressed && !inMidAir && !fallingIntoVoid) {
				skaterPositionY -= SKATEBOARD_OLLIE_POWER;
			}
			break;
	}
}

function keyPressed() {
	keyControl({ type: 'keydown' });
}

function keyReleased() {
	keyControl({ type: 'keyup' });
}

function drawCharacter(x, y, yOffset, direction, isJumping) {
	drawHair(x, y, yOffset, direction);
	drawFace(x, y, yOffset, direction);
	drawClothes(x, y, yOffset, direction);
	drawLegs(x, y, yOffset, direction);
}

function drawHair(x, y, yOffset, direction) {
	fill(0);
	
	if (direction === 'front') {
		rect(x - 4*SPRITE_SCALE_FACTOR, y - 12*SPRITE_SCALE_FACTOR + yOffset, 8*SPRITE_SCALE_FACTOR, 4*SPRITE_SCALE_FACTOR);
		rect(x - 5*SPRITE_SCALE_FACTOR, y - 11*SPRITE_SCALE_FACTOR + yOffset, 10*SPRITE_SCALE_FACTOR, 3*SPRITE_SCALE_FACTOR);
		rect(x - 6*SPRITE_SCALE_FACTOR, y - 10*SPRITE_SCALE_FACTOR + yOffset, 12*SPRITE_SCALE_FACTOR, 4*SPRITE_SCALE_FACTOR);
	} 
	else if (direction === 'left') {
		rect(x - 6*SPRITE_SCALE_FACTOR, y - 13*SPRITE_SCALE_FACTOR + yOffset, 8*SPRITE_SCALE_FACTOR, 4*SPRITE_SCALE_FACTOR);
		rect(x - 7*SPRITE_SCALE_FACTOR, y - 12*SPRITE_SCALE_FACTOR + yOffset, 9*SPRITE_SCALE_FACTOR, 3*SPRITE_SCALE_FACTOR);
		rect(x - 8*SPRITE_SCALE_FACTOR, y - 11*SPRITE_SCALE_FACTOR + yOffset, 10*SPRITE_SCALE_FACTOR, 4*SPRITE_SCALE_FACTOR);
	}
	else if (direction === 'right') {
		rect(x - 2*SPRITE_SCALE_FACTOR, y - 13*SPRITE_SCALE_FACTOR + yOffset, 8*SPRITE_SCALE_FACTOR, 4*SPRITE_SCALE_FACTOR);
		rect(x - 2*SPRITE_SCALE_FACTOR, y - 12*SPRITE_SCALE_FACTOR + yOffset, 9*SPRITE_SCALE_FACTOR, 3*SPRITE_SCALE_FACTOR);
		rect(x - 2*SPRITE_SCALE_FACTOR, y - 11*SPRITE_SCALE_FACTOR + yOffset, 10*SPRITE_SCALE_FACTOR, 4*SPRITE_SCALE_FACTOR);
	}
}

function drawFace(x, y, yOffset, direction) {
	fill(HUMAN_SKIN_TONE);
	
	if (direction === 'front') {
		rect(x - 4*SPRITE_SCALE_FACTOR, y - 8*SPRITE_SCALE_FACTOR + yOffset, 8*SPRITE_SCALE_FACTOR, 4*SPRITE_SCALE_FACTOR);
		rect(x - 3*SPRITE_SCALE_FACTOR, y - 4*SPRITE_SCALE_FACTOR + yOffset, 6*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
		
		// Eyes
		fill(255);
		rect(x - 3*SPRITE_SCALE_FACTOR, y - 7*SPRITE_SCALE_FACTOR + yOffset, 2*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
		rect(x + 1*SPRITE_SCALE_FACTOR, y - 7*SPRITE_SCALE_FACTOR + yOffset, 2*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
		
		fill(0);
		rect(x - 2*SPRITE_SCALE_FACTOR, y - 7*SPRITE_SCALE_FACTOR + yOffset, 1*SPRITE_SCALE_FACTOR, 1*SPRITE_SCALE_FACTOR);
		rect(x + 1*SPRITE_SCALE_FACTOR, y - 7*SPRITE_SCALE_FACTOR + yOffset, 1*SPRITE_SCALE_FACTOR, 1*SPRITE_SCALE_FACTOR);
		
		// Mouth
		fill(EXPRESSION_LIPS);
		rect(x - 1*SPRITE_SCALE_FACTOR, y - 2*SPRITE_SCALE_FACTOR + yOffset, 2*SPRITE_SCALE_FACTOR, 1*SPRITE_SCALE_FACTOR);
	}
	else if (direction === 'left') {
		rect(x - 7*SPRITE_SCALE_FACTOR, y - 9*SPRITE_SCALE_FACTOR + yOffset, 7*SPRITE_SCALE_FACTOR, 4*SPRITE_SCALE_FACTOR);
		rect(x - 6*SPRITE_SCALE_FACTOR, y - 5*SPRITE_SCALE_FACTOR + yOffset, 5*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
		
		fill(255);
		rect(x - 6*SPRITE_SCALE_FACTOR, y - 8*SPRITE_SCALE_FACTOR + yOffset, 2*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
		
		fill(0);
		rect(x - 5*SPRITE_SCALE_FACTOR, y - 8*SPRITE_SCALE_FACTOR + yOffset, 1*SPRITE_SCALE_FACTOR, 1*SPRITE_SCALE_FACTOR);
		
		fill(EXPRESSION_LIPS);
		rect(x - 4*SPRITE_SCALE_FACTOR, y - 3*SPRITE_SCALE_FACTOR + yOffset, 2*SPRITE_SCALE_FACTOR, 1*SPRITE_SCALE_FACTOR);
	}
	else if (direction === 'right') {
		rect(x, y - 9*SPRITE_SCALE_FACTOR + yOffset, 7*SPRITE_SCALE_FACTOR, 4*SPRITE_SCALE_FACTOR);
		rect(x + 1*SPRITE_SCALE_FACTOR, y - 5*SPRITE_SCALE_FACTOR + yOffset, 5*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
		
		fill(255);
		rect(x + 4*SPRITE_SCALE_FACTOR, y - 8*SPRITE_SCALE_FACTOR + yOffset, 2*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
		
		fill(0);
		rect(x + 4*SPRITE_SCALE_FACTOR, y - 8*SPRITE_SCALE_FACTOR + yOffset, 1*SPRITE_SCALE_FACTOR, 1*SPRITE_SCALE_FACTOR);
		
		fill(EXPRESSION_LIPS);
		rect(x + 2*SPRITE_SCALE_FACTOR, y - 3*SPRITE_SCALE_FACTOR + yOffset, 2*SPRITE_SCALE_FACTOR, 1*SPRITE_SCALE_FACTOR);
	}
}

function drawClothes(x, y, yOffset, direction) {
	fill(URBAN_JACKET);
	
	if (direction === 'front') {
		rect(x - 3*SPRITE_SCALE_FACTOR, y + yOffset, 6*SPRITE_SCALE_FACTOR, 4*SPRITE_SCALE_FACTOR);
		
		fill(255);
		rect(x - 1*SPRITE_SCALE_FACTOR, y + yOffset, 2*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
		
		fill(STREET_DENIM);
		rect(x - 3*SPRITE_SCALE_FACTOR, y + 4*SPRITE_SCALE_FACTOR + yOffset, 6*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
	}
	else if (direction === 'left') {
		rect(x - 6*SPRITE_SCALE_FACTOR, y - 1*SPRITE_SCALE_FACTOR + yOffset, 6*SPRITE_SCALE_FACTOR, 4*SPRITE_SCALE_FACTOR);
		
		fill(255);
		rect(x - 4*SPRITE_SCALE_FACTOR, y - 1*SPRITE_SCALE_FACTOR + yOffset, 2*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
		
		fill(STREET_DENIM);
		rect(x - 6*SPRITE_SCALE_FACTOR, y + 3*SPRITE_SCALE_FACTOR + yOffset, 6*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
	}
	else if (direction === 'right') {
		rect(x, y - 1*SPRITE_SCALE_FACTOR + yOffset, 6*SPRITE_SCALE_FACTOR, 4*SPRITE_SCALE_FACTOR);
		
		fill(255);
		rect(x + 2*SPRITE_SCALE_FACTOR, y - 1*SPRITE_SCALE_FACTOR + yOffset, 2*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
		
		fill(STREET_DENIM);
		rect(x, y + 3*SPRITE_SCALE_FACTOR + yOffset, 6*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
	}
}

function drawLegs(x, y, yOffset, direction) {
	fill(0);
	
	const legOffset = y + 6*SPRITE_SCALE_FACTOR + yOffset;
	
	if (direction === 'front') {
		rect(x - 3*SPRITE_SCALE_FACTOR, legOffset, 2*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
		rect(x + 1*SPRITE_SCALE_FACTOR, legOffset, 2*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
	}
	else if (direction === 'left') {
		rect(x - 6*SPRITE_SCALE_FACTOR, legOffset, 2*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
		rect(x - 1*SPRITE_SCALE_FACTOR, legOffset, 2*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
	}
	else if (direction === 'right') {
		rect(x - 1*SPRITE_SCALE_FACTOR, legOffset, 2*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
		rect(x + 4*SPRITE_SCALE_FACTOR, legOffset, 2*SPRITE_SCALE_FACTOR, 2*SPRITE_SCALE_FACTOR);
	}
}

function drawSkateboard(x, y) {
	noStroke();
	

	const boardWidth = 40;
	const boardHeight = 8;
	const wheelSize = 6;
	const truckWidth = 3;
	

	let boardY = y + DECK_ELEVATION_HEIGHT;
	

	fill(DECK_WOOD_COLOR[0] - 30, DECK_WOOD_COLOR[1] - 20, DECK_WOOD_COLOR[2] - 10);
	rect(x - boardWidth/2 + 2, boardY + 2, boardWidth, boardHeight, 3);
	

	fill(DECK_WOOD_COLOR);
	rect(x - boardWidth/2, boardY, boardWidth, boardHeight, 3);
	

	fill(DECK_GRIP_TAPE);
	rect(x - boardWidth/2 + 1, boardY + 1, boardWidth - 2, boardHeight - 3, 2);
	

	fill(TRUCK_METAL);
	rect(x - boardWidth/3, boardY + boardHeight - 1, truckWidth, 4);
	rect(x + boardWidth/3 - truckWidth, boardY + boardHeight - 1, truckWidth, 4);
	
	fill(WHEEL_URETHANE);
	ellipse(x - boardWidth/3, boardY + boardHeight + 2, wheelSize, wheelSize);
	ellipse(x + boardWidth/3, boardY + boardHeight + 2, wheelSize, wheelSize);
	ellipse(x - boardWidth/3 + truckWidth, boardY + boardHeight + 2, wheelSize, wheelSize);
	ellipse(x + boardWidth/3 - truckWidth, boardY + boardHeight + 2, wheelSize, wheelSize);
	fill(80, 80, 80);
	ellipse(x - boardWidth/3 - 1, boardY + boardHeight + 1, wheelSize/2, wheelSize/2);
	ellipse(x + boardWidth/3 - 1, boardY + boardHeight + 1, wheelSize/2, wheelSize/2);
	ellipse(x - boardWidth/3 + truckWidth - 1, boardY + boardHeight + 1, wheelSize/2, wheelSize/2);
	ellipse(x + boardWidth/3 - truckWidth - 1, boardY + boardHeight + 1, wheelSize/2, wheelSize/2);
}

function drawPlatform(platform) {

	let screenX = platform.worldX - cameraWorldX;
	

	if(screenX + platform.platformWidth < -50 || screenX > width + 50) {
		return;
	}
	
	noStroke();
	

	fill(PLATFORM_STONE_SHADOW);
	rect(platform.worldX + 3, platform.worldY + 3, 
		 platform.platformWidth, platform.platformHeight, 5);
	

	fill(PLATFORM_STONE_BASE);
	rect(platform.worldX, platform.worldY, 
		 platform.platformWidth, platform.platformHeight, 5);
	

	fill(PLATFORM_STONE_HIGHLIGHT);
	rect(platform.worldX, platform.worldY, 
		 platform.platformWidth, platform.platformHeight * 0.3, 5);
	rect(platform.worldX, platform.worldY, 
		 platform.platformWidth * 0.15, platform.platformHeight, 5);
	

	fill(PLATFORM_MOSS_GREEN);
	let mossSpots = Math.floor(platform.platformWidth / 20);
	for(let i = 0; i < mossSpots; i++) {
		let mossX = platform.worldX + 10 + (i * 15) + Math.sin(platform.worldX + i) * 5;
		let mossY = platform.worldY + 2 + Math.cos(platform.worldX + i) * 3;
		ellipse(mossX, mossY, 4, 3);
		ellipse(mossX + 5, mossY + 2, 3, 2);
	}
}

function checkPlatform(platform) {
	let offsetX = calculateDirectionalOffset();
	
	// Platform landing detection for airborne character only
	if(skaterPositionX + offsetX >= platform.worldX - RIDER_COLLISION_RADIUS &&
	   skaterPositionX + offsetX <= platform.worldX + platform.platformWidth + RIDER_COLLISION_RADIUS &&
	   inMidAir &&
	   skaterPositionY >= platform.worldY - PLATFORM_COLLISION_MARGIN * 3 &&
	   skaterPositionY <= platform.worldY + PLATFORM_COLLISION_MARGIN &&
	   !fallingIntoVoid) {
		
		// Land on platform
		skaterPositionY = platform.worldY - DECK_ELEVATION_HEIGHT;
		inMidAir = false;
	}
}

function drawEnemy(enemy) {

	let screenX = enemy.worldX - cameraWorldX;
	

	if(screenX < -100 || screenX > width + 100) {
		return;
	}
	
	if(enemy.isActive) {
		drawCriminalSilhouette(enemy.worldX, enemy.worldY, enemy.direction);
	}
}

// Detective Conan style criminal silhouette
function drawCriminalSilhouette(x, y, direction) {
	noStroke();
	
	// Ground shadow
	fill(CRIMINAL_SHADOW_DARK);
	ellipse(x + 3, y + 2, 35, 12);
	
	// Basic silhouette (legs)
	fill(CRIMINAL_SILHOUETTE_BLACK);
	rect(x - 8, y - 25, 6, 25);
	rect(x + 2, y - 25, 6, 25);
	
	// Body
	fill(CRIMINAL_SILHOUETTE_BLACK);
	ellipse(x, y - 35, 20, 30);
	
	// Arms
	ellipse(x - 12, y - 35, 8, 20);
	ellipse(x + 12, y - 35, 8, 20);
	
	// Head
	fill(CRIMINAL_SILHOUETTE_BLACK);
	ellipse(x, y - 55, 18, 20);
	
	// Highlights for depth
	fill(CRIMINAL_HIGHLIGHT_GRAY);
	if(direction === 1) {
		ellipse(x - 3, y - 35, 8, 15);
		ellipse(x - 2, y - 55, 6, 10);
	} else {
		ellipse(x + 3, y - 35, 8, 15);
		ellipse(x + 2, y - 55, 6, 10);
	}
	
	// Glowing red eyes
	fill(CRIMINAL_EYE_GLOW);
	if(direction === 1) {
		ellipse(x + 2, y - 58, 3, 3);
		ellipse(x + 6, y - 57, 2, 2);
	} else {
		ellipse(x - 2, y - 58, 3, 3);
		ellipse(x - 6, y - 57, 2, 2);
	}
	
	// Dark aura effect
	fill(CRIMINAL_SHADOW_DARK[0], CRIMINAL_SHADOW_DARK[1], CRIMINAL_SHADOW_DARK[2], 30);
	ellipse(x, y - 35, 35, 70);
}

function updateEnemy(enemy) {
	if(!enemy.isActive) return;
	
	// Patrol movement
	enemy.worldX += enemy.direction * ENEMY_PATROL_SPEED;
	
	// Turn around at patrol boundaries
	if(enemy.worldX <= enemy.patrolStartX) {
		enemy.direction = 1;
	} else if(enemy.worldX >= enemy.patrolEndX) {
		enemy.direction = -1;
	}
}

function checkEnemy(enemy) {
	if(!enemy.isActive) return;
	
	let offsetX = calculateDirectionalOffset();
	let distance = dist(skaterPositionX + offsetX, skaterPositionY, enemy.worldX, enemy.worldY - 35);
	
	// Enemy collision detection
	if(distance < ENEMY_COLLISION_RADIUS + RIDER_COLLISION_RADIUS) {
		enemy.isActive = false;
		enemyHit = true;
	}
}
