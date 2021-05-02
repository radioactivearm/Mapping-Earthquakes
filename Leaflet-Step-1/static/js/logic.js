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
    
    // making my map
    var myMap = L.map("mapid", {
        center: [40.7608, -111.8910],
        // center: [37.09, -95.71],
        zoom: 5,
        layers: [lightmap]
    });
    // console.log(typeof(earthQuakes));
    

    // making arrays for putting stuff into my legend
    var limits = ['-10:10', '10:30', '30:50', '50:70', '70:90', '90+'];
    var legendColors = ['#a3f600','#dcf400', '#f7db11', '#fdb72a', '#fca35d', '#ff5f65']

    // making my legend 
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function() {
        var div = L.DomUtil.create('div', 'info legend');
        var labels = [];

        var legendInfo = "<ul class=\"labels\">" ;

        var legendInfoEnd = "</ul>";

        for (i=0; i < limits.length; i++) {

            legendInfo = legendInfo + "<li class=\"label\">" + limits[i] + "</li>"

            // legendInfo = legendInfo + limits[i]

            labels.push(
                "<li style=\"background-color: " + legendColors[i] + "\"></li>" //+ "<div class=\labels\">" + limits[i] + "</div>"
            );

        }

        legendInfo = legendInfo + legendInfoEnd;

        div.innerHTML = legendInfo;

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    // adding layers to the map
    lightmap.addTo(myMap);
    earthQuakes.addTo(myMap);
    legend.addTo(myMap);


    // adding a control
    var overlayMaps = {
        Earthquakes: earthQuakes
      };

      L.control.layers(null, overlayMaps, {
        collapsed: false
      }).addTo(myMap);

}

function drawQuakes(earthQuakeData) {
    console.log('drawQuakes');


    var colors = ['#a3f600','#dcf400', '#f7db11', '#fdb72a', '#fca35d', '#ff5f65']

    // =================================================
    // TA Chris gave me a nudge onto the right track 
    // for this part and i used microsoft paint to pull
    // hexadecimal colors from image given to us

    // a function that assigns a color to popColor based on depth
    function filling(depth) {
        var popColor = 'black';
        switch (true) {
            case depth > 90:
                popColor = colors[5];
                break;
            case depth > 70:
                popColor = colors[4];
                break;
            case depth > 50:
                popColor = colors[3];
                break;
            case depth > 30:
                popColor = colors[2];
                break;
            case depth > 10:
                popColor = colors[1];
                break;
            case depth > -10:
                popColor = colors[0];
                break;
        }

        return popColor;
    }
    // ====================================

    // function for popups on features
    function onEachFeature(feature, layer) {
        layer.bindPopup('<h3>Magnitude: ' + feature.properties.mag + 
            '</h3><h3>Depth: ' + feature.geometry.coordinates[2] +'</h3><hr><p>' + feature.properties.place + '<p>');
    }

    // function for circle styles
    function styleCircles(feature) {
        return {
            fillOpacity: 1,
            stroke: 1,
            fillColor: filling(feature.geometry.coordinates[2]),
            color: 'grey',
            radius: 5 * feature.properties.mag
        }
    }


    // using geoJSON to add create layers of circles and popups
    // https://leafletjs.com/examples/geojson/
    var earthQuakes = L.geoJSON(earthQuakeData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, styleCircles(feature));
        },
        onEachFeature: onEachFeature
    });
    // console.log(typeof(earthQuakes));
    drawMap(earthQuakes);
}

// runs functions with json from url
d3.json(url, function(data) {
    drawQuakes(data.features);
    console.log(data.features);
});