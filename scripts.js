// Mapbox map
mapboxgl.accessToken = 'pk.eyJ1IjoidHJpZ2VvIiwiYSI6ImNsOXlmZXlheTA0a3kzdmxuemE5MHVsMnQifQ.abEIHxGUIn-Yz1IwcRTT7Q';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/satellite-v9', // style URL
center: [-103.2502, 29.2498], // starting position [lng, lat]
zoom: 9, // starting zoom
projection: 'globe',
pitch: 55,
bearing: 80,
});

// layers
map.on('load', () => {
    // trails layer
    map.addSource('trails', {
        type: 'geojson',
        data: 'data/Big_Bend_Trails.geojson'
    });
    map.addLayer({
      'id': 'trails-layer',
      'type': 'line',
      'source': 'trails',
      'paint': {
          'line-width': 5,
          'line-color': ['match', ['get', 'TRLCLASS'],
              'Class 1: Minimally Developed', 'red',
              'Class 2: Moderately Developed', 'orange',
              'Class 3: Developed', 'yellow',
              /*else,*/ 'blue'
          ]
        }
    });
    // boundary layer
    map.addSource('bounds', {
        type: 'geojson',
        data: 'data/BigBendBounds.geojson' 
    });

    map.addLayer({
      'id': 'boundary-layer',
      'type': 'line',
      'source': 'bounds',
      'paint': {
          'line-width': 4,
          'line-color': 'black',
          'line-opacity': .6
      }
    });


});
// rendering terrain in 3D
map.on('load', function () {
    map.addSource('mapbox-dem', {
        "type": "raster-dem",
        "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
        'tileSize': 512,
        'maxzoom': 14
    });
     map.setTerrain({"source": "mapbox-dem", "exaggeration": 1.3});
     
     map.setFog({
        'range': [-1, 2],
        'horizon-blend': 0.2,
        'color': 'white',
        'high-color': '#add8e6',
        'space-color': '#d8f2ff',
        'star-intensity': 0.0
    });
 });

 const navControl = new mapboxgl.NavigationControl({
    visualizePitch: true
});


// popup on trails - miles needs to be 2 decimal places
map.on('click', 'trails-layer',(e) => {
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML("<p>Trail Name: " +e.features[0].properties.TRLNAME+"<br>Trail Class: " + e.features[0].properties.TRLCLASS+ "<br>Trail Length: "+(e.features[0].properties.Miles).toFixed(2)+ " miles</p>")
    .addTo(map);
    });
        
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'trails-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
    });
        
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'trails-layer', () => {
    map.getCanvas().style.cursor = '';
    });

map.addControl(navControl, 'top-right');