module.exports = {
    js: [{
        source: "./src/selection-embedded.js",
        target: "./dist/selection-embedded.js",
        esnext: true,
        compact: "mangle"
    }],
    manifest: {
        target: "./dist/manifest.json"
    },
    watchDirs: ["./*"]
};
