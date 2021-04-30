console.log('logic.js loaded');

// all earthquakes over the last 7-days
url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

function drawMap(earthQuakes) {
    console.log('drawMap');

    var myMap = L.map("mapid", {
        center: [
          37.09, -95.71
        ],
        zoom: 5,
        layers: [earthQuakes]
      });

}

function drawQuakes(earthQuakeData) {
    console.log('drawQuakes');



    function onEachFeature(feature, layer) {
        L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            stroke: false,
            fillOpacity: 0.75,
            fillColor: d3.interpolateRdYlGn(90/feature.geometry.coordinates[2]),
            color: 'black',
            radius: feature.properties.mag
        });
    }

    var earthQuakes = L.geoJSON(earthQuakeData, {
        onEachFeature: onEachFeature
    });

    drawMap(earthQuakes);
}

d3.json(url).then(function(data) {
    drawQuakes(data.features);
    console.log(data.features)
});