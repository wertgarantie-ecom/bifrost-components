module.exports = {
    js: [
        {
            source: "./src/sentry.js",
            target: "./dist/sentry.min.js"
        },
        {
            format: "esm",
            source: "./src/fetchBifrost.js",
            target: "./dist/fetchBifrost.min.js"
        },
        {
            format: "esm",
            source: "./src/offeredItemsRepository.js",
            target: "./dist/offeredItemsRepository.min.js"
        },
        {
            format: "esm",
            source: "./src/wertgarantieShoppingCartRepository.js",
            target: "./dist/wertgarantieShoppingCartRepository.min.js"
        }
    ],
    watchDirs: ["./*"],
    compact: "mangle"
};
