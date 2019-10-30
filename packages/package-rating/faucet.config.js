module.exports = {
    js: [{
        source: "./src/rating.js",
        target: "./dist/rating.min.js",
        esnext: true,
        compact: "mangle"
    }],
    watchDirs: ["./*"]
};
