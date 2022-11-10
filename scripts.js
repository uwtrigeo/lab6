// Mapbox map
mapboxgl.accessToken = 'pk.eyJ1IjoidHJpZ2VvIiwiYSI6ImNsOXlmZXlheTA0a3kzdmxuemE5MHVsMnQifQ.abEIHxGUIn-Yz1IwcRTT7Q';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/satellite-v9', // style URL
center: [-103.2502, 29.2498], // starting position [lng, lat]
zoom: 9, // starting zoom
projection: 'globe',
//pitch: 85,
//bearing: 80,
});

// trails layer
map.on('load', () => {
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



