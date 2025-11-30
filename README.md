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
* Download zip/tar.gz from
  [GitHub Releases page](https://github.com/johanna-herrmann/ts-fix-videos/releases/latest)
* unzip/untar it
* Go to `ts-fix-videos/` and put your videos there
* Linux/Mac: Make `ts-fix-videos/ts-fix-videos` executable
* Execute the executable file, via double click for example
  * Linux/Mac: `ts-fix-videos/ts-fix-videos`
  * Windows: `ts-fix-videos/ts-fix-videos.cmd`
* All Videos in `ts-fix-videos/` will be converted and stored to
  `ts-fix-videos/fixed/`

## License
[MIT License](#LICENSE.md)
