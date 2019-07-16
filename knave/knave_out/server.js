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
var lastPoint = null;

function getGeojson(topic, callback) {
    client.query('mqtt_consumer')
        .where('topic', topic)
        .then(function (data) {

            var geo = {
                'type': 'FeatureCollection',
                'features': []
            }

            var emptySegment = {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': []
                }
            }

            if (data.results[0].series) {
                var newSegment = JSON.parse(JSON.stringify(emptySegment))

                data.results[0].series[0].values.forEach(function(row){

                    console.log(row)
                    //check if its not the first point and if far apart
                    if(lastPoint && (new Date(row[0]).getTime() - lastPoint.getTime())/1000 > 900) {
                        geo.features.push(newSegment);

                        newSegment = JSON.parse(JSON.stringify(emptySegment))
                        point = row[3].split(',').map(parseFloat);
                        newSegment.geometry.coordinates.push([point[1], point[0]])

                    }
                    // all else means still same segment
                    //check if first point
                    else {
                        point = row[3].split(',').map(parseFloat);
                        newSegment.geometry.coordinates.push([point[1], point[0]])
                    }
                    lastPoint = new Date(row[0])
                })
                geo.features.push(newSegment);
            }
            else {
                geo.features = emptySegment;
            }

            callback(geo);
        })
        .catch(console.error);
}
