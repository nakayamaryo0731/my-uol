/*
 * @file バックグラウンドシーンの描画
 * @description p5.jsを使用して、ゲームの背景となる風景要素（雲、山、木、峡谷、収集アイテム）を描画する
 * @author ユーザー
 */

function setup()
{
	createCanvas(1024, 576);
}

function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, 432, 1024, 144); //draw some green ground

	//1. a cloud in the sky
	noStroke();
	fill(255, 255, 255);
	ellipse(200, 100, 60, 40);
	ellipse(240, 100, 70, 50);
	ellipse(180, 110, 50, 30);

	noStroke();
	fill(255);

	//2. a mountain in the distance
	noStroke();
	fill(120, 120, 120);
	triangle(500, 256, 400, 432, 600, 432);
	fill(80, 80, 80);
	triangle(550, 280, 640, 432, 500, 432);
	fill(220, 220, 220);
	triangle(500, 256, 520, 300, 480, 300);

	noStroke();
	fill(255);

	//3. a tree
	noStroke();
	fill(101, 67, 33);
	rect(800, 346, 20, 86);
	fill(0, 100, 0);
	ellipse(810, 320, 80, 80);
	ellipse(780, 340, 60, 60);
	ellipse(840, 340, 60, 60);

	noStroke();
	fill(255);

	//4. a canyon
	//NB. the canyon should go from ground-level to the bottom of the screen
	noStroke();
	fill(100, 70, 30);
	rect(70, 432, 60, 144);
	
	noStroke();
	fill(255);

	//5. a collectable token - eg. a jewel, fruit, coins
	noStroke();
	fill(255, 215, 0);
	ellipse(400, 400, 30, 30);
	fill(255, 255, 0);
	ellipse(400, 400, 20, 20);

	noStroke();
	fill(255);
}
