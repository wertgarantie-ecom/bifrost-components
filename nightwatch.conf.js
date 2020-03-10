module.exports = {
    "output_folder": "./reports",
    "src_folders": [
        "packages/package-rating/tests",
        "packages/package-selection-popup/tests"
        // "packages/package-confirmation/tests"
    ],
    "webdriver": {
        "start_process": true,
        "server_path": "node_modules/.bin/chromedriver",
        "port": 9515
    },
    "test_settings": {
        "default": {
            "desiredCapabilities": {
                "browsername": "chrome"
            },
            "skip_testcases_on_fail": false
        }
    }
};