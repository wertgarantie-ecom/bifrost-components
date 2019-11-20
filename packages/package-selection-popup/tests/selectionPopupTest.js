module.exports = {
    "Should display selection popup component with fetched data": function(browser) {
        browser
            .url("file://" + process.cwd() + "/packages/package-selection-popup/testPages/selectionPopupTest.html")
            .waitForElementVisible('#default-component-button', 1000)
            .click('#default-component-button')
            .pause(1000)
            .expect.element('#default-component').to.be.visible;

        browser.execute(function buttonTest() {
            return document.querySelector('#default-component').shadowRoot.querySelectorAll('.product');
        }, [], function(result) {
            browser.assert.equal(result.value.length, 2);
        });
    },
    "Should not display popup with invalid fetch uri": function(browser) {
        browser
            .url("file://" + process.cwd() + "/packages/package-selection-popup/testPages/selectionPopupTest.html")
            .waitForElementVisible('#invalid-fetch-uri-button', 1000)
            .click('#invalid-fetch-uri-button')
            .pause(2000)
            .expect.element('#invalid-fetch-uri').not.to.be.present;
    },
    "Should not display popup component with invalid fetch uri": function(browser) {
        browser
            .url("file://" + process.cwd() + "/packages/package-selection-popup/testPages/selectionPopupTest.html")
            .waitForElementVisible('#incomplete-displayData-button', 1000)
            .click('#incomplete-displayData-button')
            .pause(1500)
            .expect.element('#incomplete-displayData').not.to.be.present;
    },
    "Should enable order button when product is clicked": function(browser) {
        browser
            .url("file://" + process.cwd() + "/packages/package-selection-popup/testPages/selectionPopupTest.html")
            .waitForElementVisible('#default-component-button', 1000)
            .click('#default-component-button')
            .pause(1000)
            .waitForElementVisible('#default-component');

        browser.execute(function buttonTest() {
            var shadowDom = document.querySelector('#default-component').shadowRoot;
            shadowDom.querySelectorAll('.product')[0].click();
            return !shadowDom.getElementById('orderBtn').disabled
        }, [], function(result) {
            browser.assert.equal(result.value, true, result.value ? "order button is enabled" : "order button is disabled");
        });
    },
    "Should expand details section when details button is clicked": function(browser) {
        browser
            .url("file://" + process.cwd() + "/packages/package-selection-popup/testPages/selectionPopupTest.html")
            .waitForElementVisible('#default-component-button', 1000)
            .click('#default-component-button')
            .pause(1000)
            .waitForElementVisible('#default-component');

        browser.execute(function buttonTest() {
            var shadowDom = document.querySelector('#default-component').shadowRoot;
            shadowDom.getElementById('detailsBtn').click();
            return shadowDom.querySelector('.product__details').classList;
        }, [], function(result) {
            browser.expect(result.value).to.include('product__details--expanded');
        });
    }
}
