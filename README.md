# ts-fix-videos

Fixes Videos to be mp4 with H264 and AAC, to be suitable for TS and HLS.

## What does it?
HLS needs the ts files to contain the following codecs:
- Video: H264
- Audio: AAC

Videos have to be split into ts files using ffmpeg,
this will be way faster,
is the video already contains the codecs above.

This tool converts Videos to match this condition.
It also converts into mp4.

## How to use
* Download zip/tar from GitHub Releases page
* unzip/untar it
* Go to `ts-fix-videos/` and put your videos there
* Linux/Mac: Make `ts-fix-videos.sh` executable
* execute `ts-fix-videos.sh` (with double click, for example)
  * videos will now be converted and saved under:
    `ts-fix-videos/fixed/`

## License
[MIT License](#LICENSE.md)
