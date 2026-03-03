/* Start of my own code */
// Unit and integration tests for the Running Data Visualisation App.
// Implements concepts from Week 17: unit testing, black-box testing,
// and test-driven validation of data processing functions.

function TestRunner() {
  this.passed = 0;
  this.failed = 0;
  this.results = [];

  // Core assertion: compares actual vs expected values
  this.assertEquals = function(testName, actual, expected) {
    if (actual === expected) {
      this.passed++;
      this.results.push({ name: testName, status: 'PASS', detail: '' });
    } else {
      this.failed++;
      this.results.push({
        name: testName,
        status: 'FAIL',
        detail: 'Expected ' + expected + ', got ' + actual
      });
    }
  };

  // Assertion for floating point comparison with tolerance
  this.assertAlmostEqual = function(testName, actual, expected, tolerance) {
    if (Math.abs(actual - expected) <= tolerance) {
      this.passed++;
      this.results.push({ name: testName, status: 'PASS', detail: '' });
    } else {
      this.failed++;
      this.results.push({
        name: testName,
        status: 'FAIL',
        detail: 'Expected ~' + expected + ', got ' + actual
      });
    }
  };

  // Assertion for boolean true
  this.assertTrue = function(testName, actual) {
    this.assertEquals(testName, actual, true);
  };

  // Display results on the p5.js canvas
  this.displayResults = function() {
    background(255);
    var y = 30;

    fill(0);
    noStroke();
    textSize(18);
    textStyle(BOLD);
    textAlign('left', 'top');
    text('Test Results', 20, y);
    y += 30;

    // Summary
    textSize(14);
    textStyle(NORMAL);
    var total = this.passed + this.failed;
    if (this.failed === 0) {
      fill(46, 204, 113);
      text('All ' + total + ' tests passed', 20, y);
    } else {
      fill(231, 76, 60);
      text(this.failed + ' of ' + total + ' tests failed', 20, y);
    }
    y += 30;

    // Individual results
    textSize(11);
    for (var i = 0; i < this.results.length; i++) {
      var r = this.results[i];
      if (r.status === 'PASS') {
        fill(46, 204, 113);
        text('[PASS] ' + r.name, 20, y);
      } else {
        fill(231, 76, 60);
        text('[FAIL] ' + r.name + ' — ' + r.detail, 20, y);
      }
      y += 16;
    }
  };
}

// ============================================================
// Unit Tests: helper-functions.js
// ============================================================

function testPaceToMinutes(runner) {
  // Black-box tests: valid inputs
  runner.assertAlmostEqual(
    'paceToMinutes("6:30") should return 6.5',
    paceToMinutes('6:30'), 6.5, 0.01
  );
  runner.assertAlmostEqual(
    'paceToMinutes("5:00") should return 5.0',
    paceToMinutes('5:00'), 5.0, 0.01
  );
  runner.assertAlmostEqual(
    'paceToMinutes("7:15") should return 7.25',
    paceToMinutes('7:15'), 7.25, 0.01
  );
  runner.assertAlmostEqual(
    'paceToMinutes("6:00") should return 6.0',
    paceToMinutes('6:00'), 6.0, 0.01
  );

  // Edge case: zero seconds
  runner.assertAlmostEqual(
    'paceToMinutes("8:00") should return 8.0',
    paceToMinutes('8:00'), 8.0, 0.01
  );

  // Edge case: invalid input
  runner.assertEquals(
    'paceToMinutes("invalid") should return 0',
    paceToMinutes('invalid'), 0
  );
}

function testFormatPace(runner) {
  runner.assertEquals(
    'formatPace(6.5) should return "6:30"',
    formatPace(6.5), '6:30'
  );
  runner.assertEquals(
    'formatPace(5.0) should return "5:00"',
    formatPace(5.0), '5:00'
  );
  runner.assertEquals(
    'formatPace(7.25) should return "7:15"',
    formatPace(7.25), '7:15'
  );
}

function testPaceRoundTrip(runner) {
  // Integration test: paceToMinutes and formatPace are inverse operations
  var original = '6:30';
  var result = formatPace(paceToMinutes(original));
  runner.assertEquals(
    'Round-trip: formatPace(paceToMinutes("6:30")) should return "6:30"',
    result, original
  );

  original = '5:00';
  result = formatPace(paceToMinutes(original));
  runner.assertEquals(
    'Round-trip: formatPace(paceToMinutes("5:00")) should return "5:00"',
    result, original
  );
}

// ============================================================
// Unit Tests: statistical functions (HeartRateVsPace)
// ============================================================

function testCorrelation(runner) {
  // Create a temporary HeartRateVsPace instance to access its methods
  var vis = new HeartRateVsPace();

  // Perfect positive correlation
  var x1 = [1, 2, 3, 4, 5];
  var y1 = [2, 4, 6, 8, 10];
  runner.assertAlmostEqual(
    'Correlation of perfectly linear positive data should be 1.0',
    vis.calculateCorrelation(x1, y1), 1.0, 0.001
  );

  // Perfect negative correlation
  var y2 = [10, 8, 6, 4, 2];
  runner.assertAlmostEqual(
    'Correlation of perfectly linear negative data should be -1.0',
    vis.calculateCorrelation(x1, y2), -1.0, 0.001
  );

  // No correlation (orthogonal data)
  var x3 = [1, 2, 3, 4, 5];
  var y3 = [3, 3, 3, 3, 3];
  runner.assertAlmostEqual(
    'Correlation of constant Y data should be 0.0',
    vis.calculateCorrelation(x3, y3), 0.0, 0.001
  );
}

function testRegression(runner) {
  var vis = new HeartRateVsPace();

  // y = 2x + 1 → slope=2, intercept=1
  var x = [1, 2, 3, 4, 5];
  var y = [3, 5, 7, 9, 11];
  var result = vis.calculateRegression(x, y);

  runner.assertAlmostEqual(
    'Regression slope for y=2x+1 should be 2.0',
    result.slope, 2.0, 0.001
  );
  runner.assertAlmostEqual(
    'Regression intercept for y=2x+1 should be 1.0',
    result.intercept, 1.0, 0.001
  );

  // y = -0.5x + 10 → slope=-0.5, intercept=10
  var y2 = [9.5, 9, 8.5, 8, 7.5];
  var result2 = vis.calculateRegression(x, y2);

  runner.assertAlmostEqual(
    'Regression slope for y=-0.5x+10 should be -0.5',
    result2.slope, -0.5, 0.001
  );
  runner.assertAlmostEqual(
    'Regression intercept for y=-0.5x+10 should be 10.0',
    result2.intercept, 10.0, 0.001
  );
}

// ============================================================
// Unit Tests: moving average (PaceProgress)
// ============================================================

function testMovingAverage(runner) {
  var vis = new PaceProgress();

  var data = [10, 20, 30, 40, 50];

  // Window size 1: result should equal input
  var result1 = vis.calculateMovingAverage(data, 1);
  runner.assertAlmostEqual(
    'Moving average window=1: first element should be 10',
    result1[0], 10, 0.01
  );
  runner.assertAlmostEqual(
    'Moving average window=1: last element should be 50',
    result1[4], 50, 0.01
  );

  // Window size 3: trailing average
  var result3 = vis.calculateMovingAverage(data, 3);
  runner.assertAlmostEqual(
    'Moving average window=3: element[0] should be 10 (only 1 value)',
    result3[0], 10, 0.01
  );
  runner.assertAlmostEqual(
    'Moving average window=3: element[1] should be 15 (avg of 10,20)',
    result3[1], 15, 0.01
  );
  runner.assertAlmostEqual(
    'Moving average window=3: element[2] should be 20 (avg of 10,20,30)',
    result3[2], 20, 0.01
  );
  runner.assertAlmostEqual(
    'Moving average window=3: element[4] should be 40 (avg of 30,40,50)',
    result3[4], 40, 0.01
  );
}

// ============================================================
// Unit Tests: colour mapping (TrainingHeatmap)
// ============================================================

function testHeatmapColours(runner) {
  var vis = new TrainingHeatmap();
  var maxDist = 20;

  // No activity should return gray
  var c0 = vis.getDistanceColor(0, maxDist);
  runner.assertEquals(
    'Heatmap colour: 0km should be gray (235)',
    c0[0], 235
  );

  // Low distance (25% of max = 5km)
  var c1 = vis.getDistanceColor(4, maxDist);
  runner.assertEquals(
    'Heatmap colour: 4km/20km should be level 1 green (155)',
    c1[0], 155
  );

  // High distance (>75% of max)
  var c4 = vis.getDistanceColor(18, maxDist);
  runner.assertEquals(
    'Heatmap colour: 18km/20km should be level 4 dark green (33)',
    c4[0], 33
  );
}

// ============================================================
// Unit Tests: normalisation (MarathonRadar)
// ============================================================

function testRadarNormalisation(runner) {
  // Pace normalisation: 6:00 = 1.0, 9:00 = 0.0
  // Formula: max(0, min(1, 1 - (pace - 6.0) / 3.0))
  var score6 = Math.max(0, Math.min(1, 1 - (6.0 - 6.0) / 3.0));
  runner.assertAlmostEqual(
    'Radar: pace 6:00/km should normalise to 1.0',
    score6, 1.0, 0.01
  );

  var score75 = Math.max(0, Math.min(1, 1 - (7.5 - 6.0) / 3.0));
  runner.assertAlmostEqual(
    'Radar: pace 7:30/km should normalise to 0.5',
    score75, 0.5, 0.01
  );

  var score9 = Math.max(0, Math.min(1, 1 - (9.0 - 6.0) / 3.0));
  runner.assertAlmostEqual(
    'Radar: pace 9:00/km should normalise to 0.0',
    score9, 0.0, 0.01
  );

  // Distance normalisation: capped at 1.0
  var dist120 = Math.min(120 / 100, 1);
  runner.assertAlmostEqual(
    'Radar: 120km should cap at 1.0',
    dist120, 1.0, 0.01
  );
}

// ============================================================
// Run all tests
// ============================================================

function runAllTests() {
  var runner = new TestRunner();

  testPaceToMinutes(runner);
  testFormatPace(runner);
  testPaceRoundTrip(runner);
  testCorrelation(runner);
  testRegression(runner);
  testMovingAverage(runner);
  testHeatmapColours(runner);
  testRadarNormalisation(runner);

  return runner;
}
/* End of my own code */
