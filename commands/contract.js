const { exec } = require("child_process");
// const yargsParse = require("yargs-parser");
const yargsUnparse = require("yargs-unparser");

function unparseArgs(args) {
    for (const key in args) {
        if (typeof args[key] === "string" && args[key].includes(" ")) {
            args[key] = `"${args[key]}"`;
        }
    }
    return yargsUnparse(args);
}

function build(argv) {
    
    // const args = argv.slice(3);
    // const yargs = yargsParse(args);
    // const [sourcePath] = yargs._;

    exec("cargo +nightly contract build", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

}

function deploy(yargs) {
    
    // const yargs = yargsParse(argv.slice(3));
    // TODO Yargs has a bug where an argument cannot be named "--constructor".
    // Move --constructor to first positional argument?
    yargs["constructor"] = "new";
    const args = unparseArgs(yargs).join(" ");

    // console.log("YARGS", yargs);
    // console.log("ARGS", args);

    exec("cargo contract instantiate " + args, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

}

module.exports = { build, deploy };