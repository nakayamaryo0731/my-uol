/* Start of my own code */
function ActivityTypes() {
  this.name = 'Activity Types';
  this.id = 'activity-types';
  this.loaded = false;

  this.pie = new PieChart(width / 2, height / 2, width * 0.35);

  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/running/activities.csv', 'csv', 'header',
      function(table) {
        self.loaded = true;
      });
  };

  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    this.activityCounts = this.countActivityTypes();
    this.distanceByType = this.sumDistanceByType();

    this.select = createSelect();
    this.select.position(350, 40);
    this.select.option('By Count');
    this.select.option('By Distance');
  };

  this.destroy = function() {
    this.select.remove();
  };

  this.countActivityTypes = function() {
    var counts = {};

    for (var i = 0; i < this.data.getRowCount(); i++) {
      var activityType = this.data.getString(i, 'activity_type');

      if (counts[activityType]) {
        counts[activityType]++;
      } else {
        counts[activityType] = 1;
      }
    }

    return counts;
  };

  this.sumDistanceByType = function() {
    var distances = {};

    for (var i = 0; i < this.data.getRowCount(); i++) {
      var activityType = this.data.getString(i, 'activity_type');
      var distance = this.data.getNum(i, 'distance');

      if (distances[activityType]) {
        distances[activityType] += distance;
      } else {
        distances[activityType] = distance;
      }
    }

    return distances;
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    var viewMode = this.select.value();
    var dataToShow;
    var title;

    if (viewMode === 'By Count') {
      dataToShow = this.activityCounts;
      title = 'Activity Types by Count';
    } else {
      dataToShow = this.distanceByType;
      title = 'Activity Types by Distance (km)';
    }

    var labels = Object.keys(dataToShow);
    var values = [];
    for (var i = 0; i < labels.length; i++) {
      values.push(dataToShow[labels[i]]);
    }

    var colours = [
      color(66, 133, 244),
      color(52, 168, 83),
      color(251, 188, 5)
    ];

    this.pie.draw(values, labels, colours, title);
    this.drawStats(dataToShow, viewMode);
  };

  this.drawStats = function(data, viewMode) {
    var labels = Object.keys(data);
    var total = 0;
    for (var i = 0; i < labels.length; i++) {
      total += data[labels[i]];
    }

    var statsX = 80;
    var statsY = height - 100;

    fill(0);
    noStroke();
    textAlign('left', 'top');
    textSize(12);

    if (viewMode === 'By Count') {
      text('Total Activities: ' + total, statsX, statsY);
    } else {
      text('Total Distance: ' + total.toFixed(1) + ' km', statsX, statsY);
    }

    textSize(11);
    for (var j = 0; j < labels.length; j++) {
      var percentage = ((data[labels[j]] / total) * 100).toFixed(1);
      var valueStr = viewMode === 'By Count'
        ? data[labels[j]] + ' activities'
        : data[labels[j]].toFixed(1) + ' km';
      text(labels[j] + ': ' + valueStr + ' (' + percentage + '%)',
           statsX, statsY + 18 + (j * 16));
    }
  };
}
/* End of my own code */
