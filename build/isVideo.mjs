import { spawn } from 'child_process';

function isVideo(filePath) {
    return new Promise((resolve) => {
        const proc = spawn("ffprobe", [
            "-v", "error",
            "-select_streams", "v",
            "-show_entries", "stream=codec_type",
            "-of", "csv=p=0",
            filePath
        ]);

        let output = "";

        proc.stdout.on("data", d => output += d.toString());
        proc.on("close", () => {
            resolve(output.trim() === "video");
        });
    });
}

export { isVideo };
