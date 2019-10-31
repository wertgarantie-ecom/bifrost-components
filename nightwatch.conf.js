module.exports = {
    "src_folders": [
        "packages/package-rating/tests"
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
            }
        }
    }
}