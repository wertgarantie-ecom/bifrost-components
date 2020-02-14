module.exports = {
    js: [{
        source: "./src/selection-popup.js",
        target: "./dist/selection-popup.min.js",
        compact: "mangle"
    },
        {
            source: "./src/selection-popup-lit.js",
            target: "./dist/selection-popup-lit.min.js",
            compact: "mangle"
        }],
    watchDirs: ["./*"]
};
