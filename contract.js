#!/usr/bin/env node

const yargs = require("yargs");
const { build, deploy } = require("./commands/contract.js");

yargs(process.argv.slice(2))
    //.usage("")
    .command(
        "build",
        "cargo +nightly contract build",
        function (yargs) {

        },
        function (argv) {
            build(argv);
        }
    )
    .command(
        "deploy",
        "cargo contract instantiate",
        function (yargs) {
            // console.log("YARGS", yargs);
            //   return yargs.option("constructor1", {
            //     alias: "c",
            //     describe: "describe",
            //   })
        },
        function (argv) {
            argv._.shift();
            deploy(argv);
        }
    )
    //.help()
    .argv;
