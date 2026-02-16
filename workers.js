// Glob
const glob = require("glob");

// Child Process
const { spawn } = require("child_process");

// Worker files
const workerFiles = glob.sync("workers/*.js");

// Spawn a new process for each worker file
workerFiles.forEach((file) => {
  spawn("node", [file], { stdio: "inherit" });
});
