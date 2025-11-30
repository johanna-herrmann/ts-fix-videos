const TARGET_VIDEO_CODEC = 'h264';
const TARGET_AUDIO_CODEC = 'aac';

const getCodecOptions = function (codecs) {
    let videoHasTarget;
    let videoHasOther;
    let audioHasTarget;
    let audioHasOther;
    codecs.video.forEach(videoCodec => {
        if (videoCodec === TARGET_VIDEO_CODEC) {
            videoHasTarget = true;
        } else {
            videoHasOther = true;
        }
    });
    codecs.audio.forEach(audioCodec => {
        if (audioCodec === TARGET_AUDIO_CODEC) {
            audioHasTarget = true;
        } else {
            audioHasOther = true;
        }
    });
    const videoOption = (videoHasTarget && !videoHasOther) ? 'copy' : 'h264';
    const audioOption = (audioHasTarget && !audioHasOther) ? 'copy' : 'aac';
    return ['-c:v', videoOption, '-c:a', audioOption];
};

export { getCodecOptions };
