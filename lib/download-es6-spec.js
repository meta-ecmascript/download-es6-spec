// LICENSE : MIT
"use strict";
var Download = require("download");
var specList = require("es6-spec-changelog");
var path = require("path");
function singleDownload(url, outDir, name, callback) {
    console.log("Downloading: " + url);
    new Download({mode: '755'})
        .get(url)
        .rename(name)
        .dest(outDir)
        .run(function (error, files) {
            console.log("=>" + name);
            callback(error, files);
        });
}
function downloads(options, callback) {
    var directoryName = options.outDir || "download/";
    var outDir = path.resolve(process.cwd(), directoryName);
    console.log("output directory: " + outDir);
    var allResults = [];
    var next = function (error, results) {
        if (error) {
            throw error;
        }
        allResults = allResults.concat(results);
        var fileData = specList.shift();
        if (fileData == null) {
            return callback(null, allResults);
        }
        var fileURL = fileData.url;
        var fileName = "rev" + fileData.rev + ".doc";
        singleDownload(fileURL, outDir, fileName, next);
    };
    next();
}
module.exports = downloads;