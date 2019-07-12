const Influx = require('influxdb-nodejs');
const client = new Influx('http://influx_knave:8086/telegraf');

client.query('mqtt_consumer')
  .where('topic','ch/5th/ritt/default')
  .then(function (r) {

    r.results[0].series[0].values.forEach(function(row){
        console.log(row[3]);
    })
  })
  .catch(console.error);


