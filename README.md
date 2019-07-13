# ritt

is a GPS tracker written completely in JavaScript. All the required components are static HTML pages with JavaScript. The tracker called trackee uses the location API of browsers and a shim called  [NoSleep.js][0] to prevent the browser from unloading/stopping the tracking while the phone is locked.

Locations are being sent to the front end via a public mqtt broker.

## viewer index.html /
There are a few query GET-parameters to change the behavior of the fronted. It consists of a full page leaflet map and a sidebar which you can open with the additional button below the zoom buttons.

The sidebar contains a checks follow with which you can decide to recenter the map on the marker if it moves and a two counters which tell the viewer when the last position / how many positions were received.

If the viewer tracks/displays more than one trackee the follow mode is disabled.

Optional query parameters:
 - `?trackee=joe` if omitted the viewer tracks the `default` trackee.
 - `?trackee=#` 
 - `?previoustrack=http://example.org/someGeoJsonFile.json`

If no previous track is provided the viewer tries to load a prpreviousrack over the kanve component, which is oboptional

## trackee.html
The UI contains two buttons to turn on and off the tracking and the preventing of phone sleep.

After the tracking has started to UI display the link to the front end, the viewer with cocorrespondingrackee query parameter or without.

opOptionaluery parameters:
 - `trackee=joe` if omitted the trackee published on trackee `default`.

# knave
slapped together...


[0]: https://github.com/richtr/NoSleep.js/

