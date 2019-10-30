module.exports = {
    js: [{
        source: "./src/selection-popup.js",
        target: "./dist/selection-popup.min.js",
        esnext: true,
        compact: "mangle"
    }],
    watchDirs: ["./*"]
};
