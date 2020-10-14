module.exports = {
    "Should display rating component with fetched data": function (browser) {
        browser
            .url("file://" + process.cwd() + "/packages/package-rating/testPages/ratingTest.html")
            .waitForElementVisible('#rating-fetch-success')
            .expect.element('#rating-fetch-success').to.be.visible;

    },
    "Should not display rating component with invalid fetch uri": function (browser) {
        browser
            .url("file://" + process.cwd() + "/packages/package-rating/testPages/ratingTest.html")
            .expect.element('#rating-invalid-fetch-uri').not.to.be.present;
    },
    "Should have different text and not show rating number": function (browser) {
        browser
            .url("file://" + process.cwd() + "/packages/package-rating/testPages/ratingTest.html")
            .waitForElementVisible('#rating-fetch-success')
            .expect.element('#rating-modified-text').text.to.contain('Google Rezensionen');
    }
}
