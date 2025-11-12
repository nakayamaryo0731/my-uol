function Spectrum(){
	this.name = "spectrum";

	this.draw = function(){
		push();
		var spectrum = fourier.analyze();
		noStroke();
		
		fill(0,255,0)
		for (var i = 0; i< spectrum.length; i++){
			var y = map(i, 0, spectrum.length, 0, height);
		    var w = map(spectrum[i], 0, 255, 0, width + 200);
			
			var r = spectrum[i];
			var g = map(spectrum[i], 10, 47, 255, 27);
			var b = 0;

			fill(r,g,b);
		    rect(0, y, w, height / spectrum.length);
  		}
	
		pop();
	};
}
