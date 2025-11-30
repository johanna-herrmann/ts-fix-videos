import fs from 'fs/promises';
import { isVideo } from "./isVideo.mjs";
import { getCodecs } from "./getCodecs.mjs";
import { getCodecOptions } from "./getCodecOptions.mjs";
import { convert } from "./convert.mjs";

const buildOutputPart = function (input) {
    return `fixed/${input.replace(/^(.*)(\..+?)$/, '$1') + '.mp4'}`;
}

const convertVideo = async function (video) {
    const codecs = getCodecs(video);
    const options = getCodecOptions(codecs);
    await convert(video, buildOutputPart(video), options);
};

const convertAll = async function () {
    await fs.mkdir('./fixed', { recursive: true });

    const contents = await fs.readdir('./');
    for (const content of contents) {
        const isVideoFile = await isVideo(content);
        //console.log({ isVideoFile, content });
        if (isVideoFile) {
            await convertVideo(content);
        }
    }
};

export { convertAll };
