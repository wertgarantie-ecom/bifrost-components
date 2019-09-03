module.exports = {
    js: [{
        source: "./components/rating/rating.js",
        target: "./public/rating.js",
        esnext: true
    }],
    manifest: {
        target: "./public/manifest.json"
    },
    watchDirs: ["./components"]
};
