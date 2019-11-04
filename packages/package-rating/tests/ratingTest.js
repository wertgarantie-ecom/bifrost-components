
module.exports = {
    "Should display rating component with fetched data": function(browser) {
        browser
            .url("file://" + process.cwd() + "/packages/package-rating/testPages/ratingTest.html")
            .waitForElementVisible('#rating-fetch-success')
            .expect.element('#rating-fetch-success').to.be.visible;

    },
    "Should not display rating component with incomplete data": function(browser) {
        browser
            .url("file://" + process.cwd() + "/packages/package-rating/testPages/ratingTest.html")
            .expect.elements('#rating-incomplete-data-failure').count.to.equal(0);
    },
    "Should not display rating component with invalid fetch uri": function(browser) {
        browser
            .url("file://" + process.cwd() + "/packages/package-rating/testPages/ratingTest.html")
            .expect.elements('#rating-invalid-fetch-uri').count.to.equal(0);
    },
    "Should have different text and not show rating number": function(browser) {
        browser
            .url("file://" + process.cwd() + "/packages/package-rating/testPages/ratingTest.html")
            .waitForElementVisible('#rating-fetch-success')
            .expect.elements('#rating-modified-text').text.to.contain('Google Rezensionen');
        
    }
}
