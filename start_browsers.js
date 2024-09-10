/**
 * This script is a workaround for a limitation of VSCode's builtin browser debugger that seems to only ever spawn one instance of a given url at a time.
 * Instead, we use this script to call chrome's cli manually and open up two tabs with different username query params specified.
 * This eases the process of creating a live battle testing environment by opening two tabs, each with a diff username preconfigured.
 * Ideally, we may also add some dev configuration to automatically initiate a battle challenge between the two tabs.
 */
var { spawn } = require("child_process");
var fs = require("fs");
var path = require("path");
var commandLineArgs = require("command-line-args");

async function parseCommandLine() {
	var x86Path = path.join(
		"C:",
		"Program Files (x86)",
		"Google",
		"Chrome",
		"Application",
		"chrome.exe"
	);
	var x64Path = path.join(
		"C:",
		"Program Files",
		"Google",
		"Chrome",
		"Application",
		"chrome.exe"
	);
	var defaultBrowser;

	if (fs.existsSync(x86Path)) {
		defaultBrowser = x86Path;
	} else if (fs.existsSync(x64Path)) {
		defaultBrowser = x64Path;

		var params = [
			{
				name: "chromepath",
				type: String | undefined,
				defaultOption: true,
				defaultValue: defaultBrowser,
			},
			{ name: "user1", type: String, defaultValue: "user123456" },
			{ name: "user2", type: String, defaultValue: "user7654321" },
		];

		return commandLineArgs(params);
	}
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

	if (args.chromepath == null) {
		throw new Error(
			"Could not locate chrome executable on your system, are you sure it's installed? If so, try providing the full path to chrome.exe as the first argument to the command."
		);
	}

	var user1Url = `http://localhost:8080/testclient.html?~~localhost:8000&username=${args.user1}`;
	var user2Url = `http://localhost:8080/testclient.html?~~localhost:8000&username=${args.user2}`;

	console.debug(
		`using chrome binary at ${args.chromepath}, user1 url: ${user1Url}, user2 url: ${user2Url}`
	);
	await pipeOutput(
		spawn(args.chromepath, [
			user1Url,
			user2Url,
			"--remote-debugging-port=9200",
		])
	);
}

main().then(() => process.exit(0));
