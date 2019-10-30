module.exports = {
    js: [{
        source: "./src/selection-popup.js",
        target: "./dist/selection-popup.js",
        esnext: true,
        compact: "mangle"
    }],
    manifest: {
        target: "./dist/manifest.json"
    },
    watchDirs: ["./*"]
};
