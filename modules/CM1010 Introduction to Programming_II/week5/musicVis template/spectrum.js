function Spectrum(){
	this.name = "spectrum";

	this.draw = function(){
		push();
		var spectrum = fourier.analyze();
		noStroke();

		for (var i = 0; i< spectrum.length; i++){
			// Map y position vertically across the height
			var y = map(i, 0, spectrum.length, 0, height);
			// Map amplitude to bar width (horizontal)
		    var w = map(spectrum[i], 0, 255, 0, width);

		    // Color gradient: green to red based on amplitude
		    var red = spectrum[i];  // 0 to 255
		    var green = map(spectrum[i], 0, 255, 255, 0);  // 255 to 0
		    fill(red, green, 0);

		    // Draw horizontal bar from left
		    rect(0, y, w, height / spectrum.length);
  		}

		pop();
	};
}
