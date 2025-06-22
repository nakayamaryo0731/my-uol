/*

The Game Project

2 - Game character

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the different states of your game character.

Write the code so that your character appears inside the box for each
state.

IMPORTANT: For each box the variables gameChar_x & gameChar_y are set to the bottom
center of the box. You must combine these variables with arithmetic to
determine the position of each shape that you draw. This will later allow
you to adjust the position of your game character.

Each state is worth two marks:

//standing front facing = 2
//jumping facing forwards = 2
//walking left = 2
//walking right = 2
//jumping left and jumping right = 2

0 marks = not a reasonable attempt
1 mark = attempted but it lacks detail and you didn't use gameChar_x and gameChar_y correctly
2 marks = you've used a selction of shape functions and made consistent use of gameChar_x and gameChar_y

WARNING: Do not get too carried away. Around 10-20 lines of code should work for each state of your game character.

*/

var gameChar_x = 0;
var gameChar_y = 0;

function setup()
{
	createCanvas(400, 600);
}

function draw()
{
	background(255);

	// 共通の定数定義
	const pixelSize = 3;
	const bodyYOffset = -25; // 通常時の上方向への調整（体の位置）
	const jumpYOffset = -35; // ジャンプ時の上方向への調整（体の位置） - 高さを調整

	//Standing, facing frontwards
	stroke(100);
	noFill();
	rect(20, 60, 50, 80);
	noStroke();
	fill(0);
	text("1. standing front facing", 20, 160);

	gameChar_x = 45;
	gameChar_y = 137;
	//Add your code here ...
	drawCharacter(
		gameChar_x, 
		gameChar_y, 
		pixelSize, 
		bodyYOffset, 
		'front', 
		false, 
		false
	);

	//Jumping facing forwards
	stroke(100);
	noFill();
	rect(220, 60, 50, 80);
	noStroke();
	fill(0);
	text("2. jumping facing forwards", 220, 160);

	gameChar_x = 245;
	gameChar_y = 137;
	//Add your code here ...
	drawCharacter(
		gameChar_x, 
		gameChar_y, 
		pixelSize, 
		jumpYOffset, // ジャンプ時のオフセットを使用
		'front', 
		true, 
		false
	);

	//Walking, turned left
	stroke(100);
	noFill();
	rect(20, 260, 50, 80);
	noStroke();
	fill(0);
	text("3. Walking left", 20, 360);

	gameChar_x = 45;
	gameChar_y = 337;
	//Add your code here ...
	drawCharacter(
		gameChar_x, 
		gameChar_y, 
		pixelSize, 
		bodyYOffset, 
		'left', 
		false, 
		false
	);

	//Walking, turned right
	stroke(100);
	noFill();
	rect(220, 260, 50, 80);
	noStroke();
	fill(0);
	text("4. Walking right", 220, 360);

	gameChar_x = 245;
	gameChar_y = 337;
	//Add your code here ...
	drawCharacter(
		gameChar_x, 
		gameChar_y, 
		pixelSize, 
		bodyYOffset, 
		'right', 
		false, 
		false
	);

	//Jumping right
	stroke(100);
	noFill();
	rect(20, 460, 50, 80);
	noStroke();
	fill(0);
	text("5. Jumping to the right", 20, 560);

	gameChar_x = 45;
	gameChar_y = 537;
	//Add your code here ...
	drawCharacter(
		gameChar_x, 
		gameChar_y, 
		pixelSize, 
		jumpYOffset, // ジャンプ時のオフセットを使用
		'right', 
		true, 
		true
	);

	//Jumping to the left
	stroke(100);
	noFill();
	rect(220, 460, 50, 80);
	noStroke();
	fill(0);
	text("6. Jumping to the left", 220, 560);

	gameChar_x = 245;
	gameChar_y = 537;
	//Add your code here ...
	drawCharacter(
		gameChar_x, 
		gameChar_y, 
		pixelSize, 
		jumpYOffset, // ジャンプ時のオフセットを使用
		'left', 
		true, 
		true
	);
}

/**
 * キャラクターを描画する関数
 * @param {number} x - キャラクターのx座標
 * @param {number} y - キャラクターのy座標
 * @param {number} pixelSize - ピクセルサイズ
 * @param {number} yOffset - Y軸オフセット
 * @param {string} direction - 向き ('front', 'left', 'right')
 * @param {boolean} isJumping - ジャンプ中かどうか
 * @param {boolean} isDiagonal - 斜めジャンプかどうか
 */
function drawCharacter(x, y, pixelSize, yOffset, direction, isJumping, isDiagonal) {
	// 方向に応じたオフセット調整
	let xOffset = 0;
	if (direction === 'left') {
		xOffset = -2 * pixelSize;
	} else if (direction === 'right') {
		xOffset = 2 * pixelSize;
	}
	
	// 髪の描画
	drawHair(x, y, pixelSize, yOffset, direction);
	
	// 顔の描画
	drawFace(x, y, pixelSize, yOffset, direction);
	
	// 服の描画
	drawClothes(x, y, pixelSize, yOffset, direction);
	
	// 足の描画（足の位置はジャンプの有無に関わらず一貫した位置に）
	drawLegs(x, y, pixelSize, yOffset, direction);
}

/**
 * 髪を描画する関数
 * @param {number} x - キャラクターのx座標
 * @param {number} y - キャラクターのy座標
 * @param {number} pixelSize - ピクセルサイズ
 * @param {number} yOffset - Y軸オフセット
 * @param {string} direction - 向き ('front', 'left', 'right')
 */
function drawHair(x, y, pixelSize, yOffset, direction) {
	fill(0);
	
	if (direction === 'front') {
		rect(x - 4*pixelSize, y - 12*pixelSize + yOffset, 8*pixelSize, 4*pixelSize);
		rect(x - 5*pixelSize, y - 11*pixelSize + yOffset, 10*pixelSize, 3*pixelSize);
		rect(x - 6*pixelSize, y - 10*pixelSize + yOffset, 12*pixelSize, 4*pixelSize);
	} 
	else if (direction === 'left') {
		rect(x - 6*pixelSize, y - 13*pixelSize + yOffset, 8*pixelSize, 4*pixelSize);
		rect(x - 7*pixelSize, y - 12*pixelSize + yOffset, 9*pixelSize, 3*pixelSize);
		rect(x - 8*pixelSize, y - 11*pixelSize + yOffset, 10*pixelSize, 4*pixelSize);
	}
	else if (direction === 'right') {
		rect(x - 2*pixelSize, y - 13*pixelSize + yOffset, 8*pixelSize, 4*pixelSize);
		rect(x - 2*pixelSize, y - 12*pixelSize + yOffset, 9*pixelSize, 3*pixelSize);
		rect(x - 2*pixelSize, y - 11*pixelSize + yOffset, 10*pixelSize, 4*pixelSize);
	}
}

/**
 * 顔を描画する関数
 * @param {number} x - キャラクターのx座標
 * @param {number} y - キャラクターのy座標
 * @param {number} pixelSize - ピクセルサイズ
 * @param {number} yOffset - Y軸オフセット
 * @param {string} direction - 向き ('front', 'left', 'right')
 */
function drawFace(x, y, pixelSize, yOffset, direction) {
	// 肌色の顔
	fill(255, 212, 180);
	
	if (direction === 'front') {
		rect(x - 4*pixelSize, y - 8*pixelSize + yOffset, 8*pixelSize, 4*pixelSize);
		rect(x - 3*pixelSize, y - 4*pixelSize + yOffset, 6*pixelSize, 2*pixelSize);
		
		// 白目
		fill(255);
		rect(x - 3*pixelSize, y - 7*pixelSize + yOffset, 2*pixelSize, 2*pixelSize);
		rect(x + 1*pixelSize, y - 7*pixelSize + yOffset, 2*pixelSize, 2*pixelSize);
		
		// 黒目
		fill(0);
		rect(x - 2*pixelSize, y - 7*pixelSize + yOffset, 1*pixelSize, 1*pixelSize);
		rect(x + 1*pixelSize, y - 7*pixelSize + yOffset, 1*pixelSize, 1*pixelSize);
		
		// 赤い口
		fill(255, 0, 0);
		rect(x - 1*pixelSize, y - 2*pixelSize + yOffset, 2*pixelSize, 1*pixelSize);
	}
	else if (direction === 'left') {
		rect(x - 7*pixelSize, y - 9*pixelSize + yOffset, 7*pixelSize, 4*pixelSize);
		rect(x - 6*pixelSize, y - 5*pixelSize + yOffset, 5*pixelSize, 2*pixelSize);
		
		// 白目
		fill(255);
		rect(x - 6*pixelSize, y - 8*pixelSize + yOffset, 2*pixelSize, 2*pixelSize);
		
		// 黒目
		fill(0);
		rect(x - 5*pixelSize, y - 8*pixelSize + yOffset, 1*pixelSize, 1*pixelSize);
		
		// 赤い口
		fill(255, 0, 0);
		rect(x - 4*pixelSize, y - 3*pixelSize + yOffset, 2*pixelSize, 1*pixelSize);
	}
	else if (direction === 'right') {
		rect(x, y - 9*pixelSize + yOffset, 7*pixelSize, 4*pixelSize);
		rect(x + 1*pixelSize, y - 5*pixelSize + yOffset, 5*pixelSize, 2*pixelSize);
		
		// 白目
		fill(255);
		rect(x + 4*pixelSize, y - 8*pixelSize + yOffset, 2*pixelSize, 2*pixelSize);
		
		// 黒目
		fill(0);
		rect(x + 4*pixelSize, y - 8*pixelSize + yOffset, 1*pixelSize, 1*pixelSize);
		
		// 赤い口
		fill(255, 0, 0);
		rect(x + 2*pixelSize, y - 3*pixelSize + yOffset, 2*pixelSize, 1*pixelSize);
	}
}

/**
 * 服を描画する関数
 * @param {number} x - キャラクターのx座標
 * @param {number} y - キャラクターのy座標
 * @param {number} pixelSize - ピクセルサイズ
 * @param {number} yOffset - Y軸オフセット
 * @param {string} direction - 向き ('front', 'left', 'right')
 */
function drawClothes(x, y, pixelSize, yOffset, direction) {
	// 青いジャケット
	fill(0, 0, 190);
	
	if (direction === 'front') {
		rect(x - 3*pixelSize, y + yOffset, 6*pixelSize, 4*pixelSize);
		
		// 白いシャツ部分
		fill(255);
		rect(x - 1*pixelSize, y + yOffset, 2*pixelSize, 2*pixelSize);
		
		// 紺色のズボン
		fill(0, 0, 128);
		rect(x - 3*pixelSize, y + 4*pixelSize + yOffset, 6*pixelSize, 2*pixelSize);
	}
	else if (direction === 'left') {
		rect(x - 6*pixelSize, y - 1*pixelSize + yOffset, 6*pixelSize, 4*pixelSize);
		
		// 白いシャツ部分
		fill(255);
		rect(x - 4*pixelSize, y - 1*pixelSize + yOffset, 2*pixelSize, 2*pixelSize);
		
		// 紺色のズボン
		fill(0, 0, 128);
		rect(x - 6*pixelSize, y + 3*pixelSize + yOffset, 6*pixelSize, 2*pixelSize);
	}
	else if (direction === 'right') {
		rect(x, y - 1*pixelSize + yOffset, 6*pixelSize, 4*pixelSize);
		
		// 白いシャツ部分
		fill(255);
		rect(x + 2*pixelSize, y - 1*pixelSize + yOffset, 2*pixelSize, 2*pixelSize);
		
		// 紺色のズボン
		fill(0, 0, 128);
		rect(x, y + 3*pixelSize + yOffset, 6*pixelSize, 2*pixelSize);
	}
}

/**
 * 足を描画する関数
 * @param {number} x - キャラクターのx座標
 * @param {number} y - キャラクターのy座標
 * @param {number} pixelSize - ピクセルサイズ
 * @param {number} yOffset - Y軸オフセット
 * @param {string} direction - 向き ('front', 'left', 'right')
 */
function drawLegs(x, y, pixelSize, yOffset, direction) {
	fill(0);
	
	// 足の位置の計算（キャラクターのyOffsetを足の位置に反映させる）
	const legOffset = y + 6*pixelSize + yOffset;
	
	if (direction === 'front') {
		rect(x - 3*pixelSize, legOffset, 2*pixelSize, 2*pixelSize);
		rect(x + 1*pixelSize, legOffset, 2*pixelSize, 2*pixelSize);
	}
	else if (direction === 'left') {
		rect(x - 6*pixelSize, legOffset, 2*pixelSize, 2*pixelSize);
		rect(x - 1*pixelSize, legOffset, 2*pixelSize, 2*pixelSize);
	}
	else if (direction === 'right') {
		rect(x - 1*pixelSize, legOffset, 2*pixelSize, 2*pixelSize);
		rect(x + 4*pixelSize, legOffset, 2*pixelSize, 2*pixelSize);
	}
}
