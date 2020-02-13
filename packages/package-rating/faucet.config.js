module.exports = {
    js: [
        {
            source: "./src/rating.js",
            target: "./dist/rating.min.js",
            compact: "mangle"
        },
        {
            source: "./src/rating-lit.js",
            target: "./dist/rating-lit.min.js",
            compact: "mangle"
        }],
    watchDirs: ["./*"]
};
