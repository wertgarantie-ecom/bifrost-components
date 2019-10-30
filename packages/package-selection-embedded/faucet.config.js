module.exports = {
    js: [{
        source: "./src/selection-embedded.js",
        target: "./dist/selection-embedded.min.js",
        esnext: true,
        compact: "mangle"
    }],
    watchDirs: ["./*"]
};
