module.exports = {
    "Should display selection popup component with fetched data": function (browser) {
        browser
            .url("file://" + process.cwd() + "/packages/package-selection-popup/testPages/selectionToConfirmationTest.html")
            .waitForElementVisible('#default-component-button', 1000)
            .click('#default-component-button')
            .pause(1000)
            .expect.element('#default-component').to.be.visible;

        browser.execute(function selectInsuranceProduct() {
            document.querySelector('#default-component').shadowRoot.querySelectorAll('.product')[0].click();
        });

        browser.execute(function putInsuranceProductInShoppingCart() {
            document.querySelector('#default-component').shadowRoot.querySelectorAll('#orderBtn')[0].click();
        });

        browser.execute(function checkConfirmationComponent() {
            return document.querySelector('#confirmation').showComponent;
        }, [], function assertConfirmationComponentPresent(result) {
            browser.assert.equal(result.value, 1);
        });
    }
};