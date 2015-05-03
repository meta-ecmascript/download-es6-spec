#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));
var downloads = require("../lib/download-es6-spec");
downloads({
    outDir: argv.D || argv.outDir
});