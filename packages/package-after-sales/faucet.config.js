module.exports = {
    js: [{
        source: "./src/after-sales.js",
        target: "./dist/after-sales.min.js",
        format: "esm",
        compact: "mangle"
    }],
    watchDirs: ["./*"]
};
