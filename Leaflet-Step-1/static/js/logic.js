console.log('logic.js loaded');

// all earthquakes over the last 7-days
url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

function drawMap(earthQuakes) {
    console.log('drawMap');

    // pulled this from inclass example
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    });

    var myMap = L.map("mapid", {
        center: [37.09, -95.71],
        zoom: 4,
        layers: [lightmap]
    });
    console.log(typeof(earthQuakes));
    lightmap.addTo(myMap);
    earthQuakes.addTo(myMap);


    var overlayMaps = {
        Earthquakes: earthQuakes
      };

      L.control.layers(null, overlayMaps, {
        collapsed: false
      }).addTo(myMap);

}

function drawQuakes(earthQuakeData) {
    console.log('drawQuakes');

    // TA Chris gave me a nudge onto the right track 
    // for this part and i used microsoft paint to pull
    // hexadecimal colors from image given to us
    function filling(depth) {
        var popColor = 'black';
        switch (true) {
            case depth > 90:
                popColor = '#ff5f65';
                break;
            case depth > 70:
                popColor = '#fca35d';
                break;
            case depth > 50:
                popColor = '#fdb72a';
                break;
            case depth > 30:
                popColor = '#f7db11';
                break;
            case depth > 10:
                popColor = '#dcf400';
                break;
            case depth > -10:
                popColor = '#a3f600';
                break;
        }

        return popColor;
    }



    function styleCircles(feature) {
        return {
            fillOpacity: 1,
            stroke: 1,
            fillColor: filling(feature.geometry.coordinates[2]),
            color: 'grey',
            radius: 4 * feature.properties.mag
        }
    }

    // https://leafletjs.com/examples/geojson/
    var earthQuakes = L.geoJSON(earthQuakeData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, styleCircles(feature));
        }
    });
    console.log(typeof(earthQuakes));
    drawMap(earthQuakes);
}

d3.json(url, function(data) {
    drawQuakes(data.features);
    console.log(data.features);
});