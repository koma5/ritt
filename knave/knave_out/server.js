const Influx = require('influxdb-nodejs');
const client = new Influx('http://influx_knave:8086/telegraf');

client.query('mqtt_consumer')
    .where('topic','ch/5th/ritt/default')
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
            point = [row[3].split(',')];
            geo.features[0].geometry.coordinates.push(point)
        })
        console.log(geo);
    })
    .catch(console.error);


