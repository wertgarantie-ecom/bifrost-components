module.exports = {
    js: [{
        format: "esm",
        source: "./src/information-popup.js",
        target: "./dist/information-popup.min.js",
        compact: "mangle"
    }],
    watchDirs: ["./*"]
};
