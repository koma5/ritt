# ritt

is a GPS tracker written completely in JavaScript. All the required components are static HTML pages with JavaScript. The tracker called trackee uses the location API of browsers and a shim called  [NoSleep.js][0] to prevent the mobile browser from unloading/stopping the tracking while the phone is locked.

Locations are being sent to the front end via a public mqtt broker.
All trackees are actually mqtt topics prefixed with `ch/5th/ritt/` to prevent any collision with other applications using the public broker.

## / (fullscreen map)
There are a few query GET-parameters to change the behaviour of the frontend. It consists of a full page leaflet map and a sidebar which you can open with the additional button below the zoom buttons.

The sidebar contains a checks follow with which you can decide to recenter the map on the marker if it moves and a two counters which tell the viewer when the last position / how many positions were received.

If the viewer tracks/displays more than one trackee the follow mode is disabled.

Optional query parameters:
 - `?trackee=joe` if omitted the viewer tracks the `default` trackee.
 - `?trackee=%23`, `%23 == #` which is in mqtt terms a wildcard.
 - `?previoustrack=http://example.org/someGeoJsonFile.json`

If no previous track url is provided the viewer tries to load a prpreviousrack over the knave component, which is optional and fails silently.

The frontend is hosted at [ritt.5th.ch][1], but feel free to host it yourself somewhere.

## trackee/ (webapp GPS tracker)
The UI contains two buttons to turn on and off the tracking and the preventing of phone sleep.

After the tracking has started to UI display the link to the frontend, the viewer with cocorrespondingrackee query parameter or without.

opOptionaluery parameters:
 - `?trackee=joe` if omitted the trackee published on trackee `default`.

The trackee app is hosted [here][2].

## knave (persistance of the published tracks)
This is a slapped together component to persist the GPS tracks, recording them into a influx database. It is distributing the recorded positions in form of a geojson file. There is no guarantee this will stay online. If kanve is offline the frontend just looses the track on page reload but still works with newly published positions from the trackee.

Originally I planed to save the tracks to the [GPS track hosting app][4]. But there is no functionality to update unfinished tracks yet and other bug.

The component is recording everything published under the mqtt topic `ch/5th/ritt/#`.

Optional query parameters:
 - `?trackee=joe`, if omitted the `default` track is outputed.

There is no need to navigate directly to [here][3] where knave is hosted because the frontend is trying to load the prevois track in the background.

[0]: https://github.com/richtr/NoSleep.js/
[1]: https://ritt.5th.ch/
[2]: https://ritt.5th.ch/trackee/
[3]: https://knave.ritt.5th.ch/
[4]: https://github.com/koma5/bH5

