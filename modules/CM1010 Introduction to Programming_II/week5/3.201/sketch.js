/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here
https://freesound.org/


*/



var jumpSound;
var isInitialised = false;

function preload()
{
    soundFormats('mp3','wav');

    //load your sounds here
    jumpSound = loadSound('assets/segway_loop.mp3', function() {
        // Stop playback until the file is fully loaded
        jumpSound.stop();
    });
    jumpSound.setVolume(0.1);
}


function setup()
{
	createCanvas(1024, 576);
}

function draw()
{
    background(220);
    
    // Draw a message when not initialised
    if (!isInitialised) {
        textAlign(CENTER, CENTER);
        textSize(24);
        text('Press any key to start playback', width/2, height/2);
    }
}

function keyPressed()
{
    // Check for space button to pause/resume
    if (key === ' ') {
        if (jumpSound.isPlaying()) {
            jumpSound.pause();
        } else {
            jumpSound.play();
        }
    } else {
        // Start playback on first key press
        if (!isInitialised) {
            // Map mouse x position to playback rate (0.5 to 2.0)
            var rate = map(mouseX, 0, width, 0.5, 2.0);
            jumpSound.loop(0, rate, 0.1, 0.1);
            isInitialised = true;
        }
    }
}
