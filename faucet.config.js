module.exports = {
    js: [{
        source: "./src/rating/rating.js",
        target: "./dist/rating.js",
        esnext: true,
        compact: "mangle"
    }],
    manifest: {
        target: "./dist/manifest.json"
    },
    watchDirs: ["./*"]
};
