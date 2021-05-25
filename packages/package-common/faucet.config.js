module.exports = {
    js: [
        {
            format: "esm",
            source: "./src/indexedDB.service.ts",
            target: "./dist/indexedDB.min.js",
            typescript: true,
            compact: "mangle"
        },
        {
            format: "esm",
            source: "./src/fetchBifrost.ts",
            target: "./dist/fetchBifrost.min.js",
            typescript: true,
            compact: "mangle"
        },
        {
            format: "esm",
            source: "./src/offeredItemsRepository.ts",
            target: "./dist/offeredItemsRepository.min.js",
            typescript: true,
            compact: "mangle"
        },
        {
            format: "esm",
            source: "./src/wertgarantieShoppingCartRepository.ts",
            target: "./dist/wertgarantieShoppingCartRepository.min.js",
            typescript: true,
            compact: "mangle"
        }
    ],
    watchDirs: ["./*"],
    compact: "mangle"
};
