console.log('logic.js loaded');

// all earthquakes over the last 7-days
url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

function drawMap(earthQuakes) {
    console.log('drawMap');
}

function drawQuakes(earthQuakeData) {
    console.log('drawQuakes');

    var earthQuakes = 'Hi';

    drawMap(earthQuakes);
}

d3.json(url).then(function(data) {
    drawQuakes(data.features);
    console.log()
});