module.exports = {
    minfiy: [
        {
            source: "./dist/confirmation.min.js",
            target: "./dist/confirmation.min.js",
        }
    ],
    js: [{
        source: "./src/confirmation.js",
        target: "./dist/confirmation.min.js",
        compact: "minify"
    }],
    plugins: {
        minfiy: {
            plugin: "faucet-pipeline-minify-literals",
            bucket: "markup"
        }
    }
    ,
    watchDirs: ["./*"]
};
