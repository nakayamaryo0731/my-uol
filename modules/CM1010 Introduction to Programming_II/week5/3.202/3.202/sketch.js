/*


*/



var sample;
var isReady;
var amplitude;
var amplitudes = [];

function preload()
{
    soundFormats('mp3','wav');
    
    isReady = false;
    
    //load your sounds here
    sample = loadSound('assets/parsRadio_loop.mp3', soundInit);
    sample.setVolume(0.5);
    
    
}

function soundInit()
{
    isReady = true;
}


function setup()
{
	createCanvas(1024, 576);
    textAlign(CENTER);
    textSize(32);

    // Create amplitude object
    amplitude = new p5.Amplitude();

    // Initialize amplitudes array with 512 zeros
    for (var i = 0; i < 512; i++) {
        amplitudes[i] = 0;
    }
}

function draw()
{
    background(0);
    fill(255);
    noStroke();
    
    if(isReady && !sample.isPlaying())
    {
        text("Press any key to play sound", width/2, height/2);   
    }
    else if(sample.isPlaying())
    {
        // Get current amplitude level
        var a = amplitude.getLevel();

        // Display amplitude value as text at the top
        fill(255);
        noStroke();
        textAlign(CENTER);
        textSize(16);
        text(a, width/2, 30);

        // Add current amplitude to end of array and remove first value
        amplitudes.push(a);
        amplitudes.shift();

        // Draw amplitude visualization as a waveform using vertices
        stroke(255, 0, 0);
        strokeWeight(2);
        noFill();

        beginShape();
        for (var i = 0; i < amplitudes.length; i++) {
            // Map x position across the width of the canvas
            var x = map(i, 0, amplitudes.length, 0, width);
            // Map amplitude value to height of canvas
            var y = map(amplitudes[i], 0, 1, height, 0);

            vertex(x, y);
        }
        endShape();

        // Draw ellipse in the center that changes size based on amplitude
        fill(255);
        noStroke();
        // Map amplitude to ellipse size (0 to 200 pixels diameter)
        var size = map(a, 0, 1, 10, 200);
        ellipse(width/2, height/2, size, size);
    }
}


function keyPressed()
{
    //sample.play();
    
    if(isReady && !sample.isPlaying())
    {
        sample.loop();
    }
    else if(sample.isPlaying())
    {
        sample.pause();
    }

}
