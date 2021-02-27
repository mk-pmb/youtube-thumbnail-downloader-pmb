
YouTube Thumbnail URL Syntax
============================

### Sources

* https://stackoverflow.com/a/12788287
  * https://stackoverflow.com/a/2068344


`http[s]://<host>/vi/<video_id>/<reso><shot_num><flag>.jpg`
-----------------------------------------------------------

### host

Any of

* `img.youtube.com`
* `i3.ytimg.com`


### reso

* (empty) = lowest resolution
* `sd` = Standard Definition
* `mq` = Medium Quality
* `hq` = High Quality
* `maxres` = MAXimum RESolution


### shot_num

* `default`: default screenshot (one of `1`..`3`) or custom upload.
* `0`: like `default` but can be bigger than `<reso>` would suggest.
* `1`..`3`: automatically generated screenshots.


### flag

* (empty) = For recorded videos.
* `_live` = For live streams.


