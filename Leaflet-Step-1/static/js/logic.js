console.log('logic.js loaded');

// all earthquakes over the last 7-days
url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/light-v10",
//     accessToken: API_KEY
// });

// var myMap = L.map("mapid", {
//     center: [37.09, -95.71],
//     zoom: 5
//     // layers: [lightmap] //, earthQuakeLayer]
// });

// lightmap.addTo(myMap);





function drawMap(earthQuakeData) {
    console.log('drawMap');



    var earthQuake = function(feature) {
        L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            fillColor: 'red',
            color: 'black',
            radius: 5000 * feature.properties.mag
        });
    } 

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
        zoom: 5,
        layers: [lightmap, earthQuakeLayer]
    });

    lightmap.addTo(myMap);

    L.geoJSON(earthQuake).addTo(myMap);

    var overlayMaps = {
        Earthquakes: earthQuakeLayer
      };

      L.control.layers(null, overlayMaps, {
        collapsed: false
      }).addTo(myMap);

}

// function drawQuakes(earthQuakeData) {
//     console.log('drawQuakes');


//     function drawCircles()


//     // function onEachFeature(feature,layer) {
//     //     L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
//     //         fillColor: 'red',
//     //         color: 'black',
//     //         radius: 5000 * feature.properties.mag
//     //     });

//     // }

//     var earthQuakes = L.geoJSON(earthQuakeData, {
//         // onEachFeature: onEachFeature
//     });

//     drawMap(earthQuakes);
// }

d3.json(url, function(data) {
    drawMap(data.features);
    console.log(data.features);
});