module.exports = {
    js: [{
        format: "esm",
        source: "./src/landing-page.js",
        target: "./dist/landing-page.min.js",
        compact: "mangle"
    }],
    watchDirs: ["./*"]
};
