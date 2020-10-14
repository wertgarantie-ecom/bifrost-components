module.exports = {
    "globals_path": "./globals.js",
    "output_folder": "./reports",
    "src_folders": [
        "packages/package-rating/tests",
        "packages/package-selection-popup/tests"
    ],
    "webdriver": {
        "start_process": true,
        "server_path": "node_modules/.bin/chromedriver",
        "port": 9515
    },
    "test_settings": {
        "default": {
            "desiredCapabilities": {
                "browserName": "chrome"
            },
            "skip_testcases_on_fail": false
        }
    }
};