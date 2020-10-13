module.exports = {
    js: [{
        source: "./src/confirmation.js",
        target: "./dist/confirmation.min.js",
        format: "esm",
        compact: "mangle"
    }],
    watchDirs: ["./*"]
};
