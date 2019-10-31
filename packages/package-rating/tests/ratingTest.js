
module.exports = {
    "Should display rating component with fetched data": function(browser) {
        browser
            .url("file://" + process.cwd() + "/packages/package-rating/testPages/ratingTest.html")
            .waitForElementVisible('#rating-fetch-success')
            .expect.element('#rating-fetch-success').to.be.visible;
        
    }
}

module.exports = {
    "Should not display rating component with incomplete data": function(browser) {
        browser
            .url("file://" + process.cwd() + "/packages/package-rating/testPages/ratingTest.html")
            .expect.elements('#rating-failure').count.to.equal(0);
    }
}