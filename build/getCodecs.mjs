import ffprobe from 'ffprobe-static';
import { execSync } from 'child_process';

const getCodecs = function (inputVideo) {
    const video = [];
    const audio = [];
    const result = execSync(
        `${ffprobe.path} -v error -show_entries stream=codec_type,codec_name -of csv=p=0 "${inputVideo}"`,
    );
    const lines = result.toString('utf8').split('\r\n');
    lines.forEach(line => {
        if (line.endsWith(',video')) {
            video.push(line.substring(0, line.indexOf(',video')).toLowerCase());
        }
        if (line.endsWith(',audio')) {
            audio.push(line.substring(0, line.indexOf(',audio')).toLowerCase());
        }
    });
    return { video, audio }
};

export { getCodecs };
