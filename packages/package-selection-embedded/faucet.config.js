module.exports = {
    js: [{
        source: "./src/selection-embedded.js",
        target: "./dist/selection-embedded.min.js",
        format: "esm",
        compact: "mangle"
    }],
    watchDirs: ["./*"]
};
