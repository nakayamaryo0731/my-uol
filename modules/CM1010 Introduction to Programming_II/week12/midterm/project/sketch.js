
// Global variable to store the gallery object. The gallery object is
// a container for all the visualisations.
var gallery;

function setup() {
  // Create a canvas to fill the content div from index.html.
  var c = createCanvas(1024, 576);
  c.parent('app');

  // Create a new gallery object.
  gallery = new Gallery();

  /* Start of my own code */
  // Add running data visualisations
  gallery.addVisual(new MonthlyDistance());
  gallery.addVisual(new PaceProgress());
  gallery.addVisual(new ActivityTypes());
  gallery.addVisual(new HeartRateVsPace());
  /* End of my own code */
}

function draw() {
  background(255);
  if (gallery.selectedVisual != null) {
    gallery.selectedVisual.draw();
  }
}
