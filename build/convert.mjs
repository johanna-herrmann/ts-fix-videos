import pathToFfmpeg from 'ffmpeg-static';
import {spawn, spawnSync} from 'child_process';

let totalDuration = null; // Sekunden
let lastPrinted = 0;

const timeToSeconds = function (t) {
    const parts = t.split(':');
    return parseFloat(parts[0]) * 3600 +
        parseFloat(parts[1]) * 60 +
        parseFloat(parts[2]);
};

const logProcess = function (inputVideo, percent) {
    const progress = percent ? `${percent}% ` : '...';
    process.stdout.write(`\rConverting ${inputVideo}: ${progress}`);
}

const handleData = function (data, inputVideo) {
    const text = data.toString();

    // get total duration
    if (!totalDuration) {
        const durMatch = text.match(/Duration: (\d+:\d+:\d+\.\d+)/);
        if (durMatch) {
            totalDuration = timeToSeconds(durMatch[1]);
        }
    }

    // log progress
    const timeMatch = text.match(/time=(\d+:\d+:\d+\.\d+)/);
    if (timeMatch && totalDuration) {
        const current = timeToSeconds(timeMatch[1]);
        const percent = Math.floor((current / totalDuration) * 100);

        // log only on +1%
        if (percent !== lastPrinted) {
            lastPrinted = percent;
            logProcess(inputVideo, percent);
        }
    }
};

const handleError = function (error, reject) {
    process.stderr.write(`\nError: ${error}`);
    reject(error);
};

const convert = function (inputVideo, outputVideo, codecOptions) {
    return new Promise((resolve, reject) => {
        logProcess(inputVideo);

        const args = [
            '-i', inputVideo,
            ...codecOptions,
            '-f', 'mp4',
            outputVideo
        ];

        const ffmpeg = spawn(pathToFfmpeg, args);

        ffmpeg.stderr.on("data", (data) => handleData(data, inputVideo));

        ffmpeg.on('error', (error) => handleError(error, reject));

        ffmpeg.on("exit", () => {
            logProcess(inputVideo, 100);
            console.log();
            resolve();
        });
    });
};

export {convert};
