module.exports = {
    js: [
        {
            source: "./src/fetchBifrost.js",
            target: "./dist/fetchBifrost.min.js",
            compact: "mangle"
        },
        {
            source: "./src/getWertgarantieCookieValue.js",
            target: "./dist/getWertgarantieCookieValue.min.js",
            compact: "mangle"
        }],
    watchDirs: ["./*"]
};
