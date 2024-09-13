/**
 * This script is a workaround for a limitation of VSCode's builtin browser debugger that seems to only ever spawn one instance of a given url at a time.
 * Instead, we use this script to call chrome's cli manually and open up two tabs with different username query params specified.
 * This eases the process of creating a live battle testing environment by opening two tabs, each with a diff username preconfigured.
 * Ideally, we may also add some dev configuration to automatically initiate a battle challenge between the two tabs.
 */

var { execSync, spawn } = require("child_process");
var path = require("path");
var commandLineArgs = require("command-line-args");

async function parseCommandLine() {
	var params = [
		{ name: "user1", type: String, defaultValue: "user123456" },
		{ name: "user2", type: String, defaultValue: "user7654321" },
	];

	return commandLineArgs(params);
}

async function pipeOutput(child) {
	return new Promise((res, rej) => {
		//spit stdout to screen
		child.stdout.on("data", function (data) {
			process.stdout.write(data.toString());
		});

		//spit stderr to screen
		child.stderr.on("data", function (data) {
			process.stdout.write(data.toString());
		});

		child.on("close", function (code) {
			res(code);
		});
	});
}

async function main() {
	console.debug(
		"starting showdown browser tabs for two player battle testing"
	);
	var args = await parseCommandLine();
	var chromePath = execSync("(Get-Command chrome).path", {
		shell: "powershell",
	})
		.toString()
		.replace("\n", "")
		.replace("\r", "");

	var user1Url = `http://localhost:8080/testclient.html?~~localhost:8000&username=${args.user1}`;
	var user2Url = `http://localhost:8080/testclient.html?~~localhost:8000&username=${args.user2}`;

	console.debug(
		`launching chrome browser at ${chromePath}, user1 url: ${user1Url}, user2 url: ${user2Url}`
	);

	var child = spawn(chromePath, [
		user1Url,
		user2Url,
		"--remote-debugging-port=9200",
	]);

	process.on("SIGINT", function () {
		child.kill();
	});

	await pipeOutput(child);

	console.debug("browser finished, exiting");
}

main().then(() => process.exit(0));
