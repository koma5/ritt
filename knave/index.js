var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://iot.eclipse.org')

client.on('connect', function () {
  client.subscribe('ch/5th/ritt/#', function (err) {
  })
})

client.on('message', function (topic, message) {
  console.log(topic, message.toString())
})
