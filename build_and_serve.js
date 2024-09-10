var { execSync, spawn } = require("child_process");

execSync("npm run build");

//kick off process of listing files
var child = spawn("npx", ["http-server", "-c-1"], { shell: true });

//spit stdout to screen
child.stdout.on("data", function (data) {
	process.stdout.write(data.toString());
});

//spit stderr to screen
child.stderr.on("data", function (data) {
	process.stdout.write(data.toString());
});

child.on("close", function (code) {
	console.log("Finished with code " + code);
});
