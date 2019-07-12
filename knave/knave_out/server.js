const Influx = require('influxdb-nodejs');
const express = require('express');

const client = new Influx('http://influx_knave:8086/telegraf');

var app = express();

app.get('/', function(req, res) {
    trackee = typeof req.query.trackee == 'undefined' ? 'default' : req.query.trackee
    getGeojson('ch/5th/ritt/' + trackee, function(geojson) {
        res.header("Content-Type", "application/geo+json");
        res.header("Access-Control-Allow-Origin", "*");
        res.send(geojson);
    });
});

app.listen(4432);
console.log('Express started on port 4432');

function getGeojson(topic, callback) {
    client.query('mqtt_consumer')
        .where('topic', topic)
        .then(function (data) {

            var geo = {
                'type': 'FeatureCollection',
                'features': [{
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': []
                    }
                }]
            }
            if (data.results[0].series)
            data.results[0].series[0].values.forEach(function(row){
                point = row[3].split(',').map(parseFloat);
                geo.features[0].geometry.coordinates.push([point[1], point[0]])
            })
            callback(geo);
        })
        .catch(console.error);
}
