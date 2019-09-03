module.exports = {
    js: [{
        source: "./components/rating/rating.js",
        target: "./public/rating.js",
        esnext: true
    }, {
        source: "./components/rating/rating.js",
        target: "./public/rating.min.js",
        compact: "mangle"
    }],
    manifest: {
        target: "./public/manifest.json"
    },
    watchDirs: ["./components"]
};
