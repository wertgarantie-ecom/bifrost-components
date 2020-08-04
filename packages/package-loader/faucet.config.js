module.exports = {
    js: [{
        source: "./src/wertgarantieLoader.js",
        target: "./dist/wertgarantieLoader.min.js",
        compact: "mangle",
        format: "esm"
    }],
    watchDirs: ["./*"]
};
