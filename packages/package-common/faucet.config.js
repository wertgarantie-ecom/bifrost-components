module.exports = {
    js: [
        {
            source: "./src/sentry.js",
            target: "./dist/sentry.min.js"
        },
        {
            source: "./src/fetchBifrost.js",
            target: "./dist/fetchBifrost.min.js"
        },
        {
            source: "./src/offeredItemsRepository.js",
            target: "./dist/offeredItemsRepository.min.js"
        },
        {
            source: "./src/wertgarantieShoppingCartRepository.js",
            target: "./dist/wertgarantieShoppingCartRepository.min.js"
        }
    ],
    watchDirs: ["./*"],
    compact: "mangle"
};
