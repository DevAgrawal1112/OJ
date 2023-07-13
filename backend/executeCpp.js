const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);

  return new Promise((resolve, reject) => {
    const compileCmd = `g++ "${filePath}" -o "${outPath}"`;
    const executeCmd = `cd "${outputPath}" && .\\${jobId}.exe`;
    const finalCmd = `${compileCmd} && ${executeCmd}`;

    exec(finalCmd, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else {
        resolve(stdout);
      }
    });
  });
};

module.exports = {
  executeCpp,
};
