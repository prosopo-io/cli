#!/usr/bin/env node

const yargs = require("yargs");
const { build, deploy } = require("./commands/contract.js");

yargs(process.argv.slice(2))
    .command(
        // "contract <action>",
        "contract",
        "Contract CLI",
        function (yargs) {
            yargs
                .positional("action", {
                    describe: "",
                    choices: ["build", "deploy"],
                    demandOption: true,
                });
        },
        function (argv) {
            
            const action = argv.action;
            delete argv.action;
            argv._.shift();

            switch (action) {
                case "build":
                    build(argv);
                    break;
                case "deploy":
                    deploy(argv);
                    break;
            }
        }
    )
    //.help()
    .argv;
