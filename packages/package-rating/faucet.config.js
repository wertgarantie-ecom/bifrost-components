module.exports = {
    js: [{
        source: "./src/rating.js",
        target: "./dist/rating.min.js",
        format: "esm",
        compact: "mangle"
    }],
    watchDirs: ["./*"]
};
