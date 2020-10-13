module.exports = {
    js: [{
        source: "./src/selection-popup.js",
        target: "./dist/selection-popup.min.js",
        format: "esm",
        compact: "mangle"
    }],
    watchDirs: ["./*"]
};
