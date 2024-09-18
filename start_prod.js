var { spawn } = require("child_process");

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
	await pipeOutput(spawn("npx", ["http-server"], { shell: true }));
}

process.on("SIGINT", () => process.exit(1));

main().then(() => process.exit(0));
