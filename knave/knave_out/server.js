const Influx = require('influxdb-nodejs');
const express = require('express');

const client = new Influx('http://influx_knave:8086/telegraf');

var app = express();

app.get('/', function(req, res) {
    getGeojson('ch/5th/ritt/default', function(geojson) {
        res.header("Content-Type", "application/geo+json");
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

            data.results[0].series[0].values.forEach(function(row){
                point = row[3].split(',');
                geo.features[0].geometry.coordinates.push(point)
            })
            callback(geo);
        })
        .catch(console.error);
}
