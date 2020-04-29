// module.exports = {
//     "Should display confirmation component when products have been selected": function(browser) {
//         // select products for the confirmation component to display something
//         browser
//             .url("file://" + process.cwd() + "/packages/package-selection-popup/testPages/selectionPopupTest.html")
//             .waitForElementVisible('#default-component-button', 1000)
//             .click('#default-component-button')
//             .pause(1000)
//             .waitForElementVisible('#default-component');
//         browser.execute(function buttonTest() {
//             var shadowDom = document.querySelector('#default-component').shadowRoot;
//             shadowDom.querySelectorAll('.product')[0].click();
//             shadowDom.getElementById('orderBtn').click()
//         }, [], function(result) { console.log(result) });

//         browser
//             .url("file://" + process.cwd() + "/packages/package-selection-popup/testPages/selectionPopupTest.html")
//             .waitForElementVisible('#default-component-button', 1000)
//             .click('#default-component-button')
//             .pause(1000)
//             .waitForElementVisible('#default-component');
//         browser.execute(function buttonTest() {
//             var shadowDom = document.querySelector('#default-component').shadowRoot;
//             shadowDom.querySelectorAll('.product')[0].click();
//             shadowDom.getElementById('orderBtn').click()
//         }, [], function(result) { console.log(result) });

//         // go to confirmation component and check if it's displayed correctly
//         browser
//             .url("file://" + process.cwd() + "/packages/package-confirmation/testPages/confirmationTest.html")
//             .waitForElementVisible('#default-confirmation', 1000);

//         browser.execute(function getNumberOfProductTabs() {
//             var shadowRoot = document.getElementById('default-confirmation').shadowRoot;
//             return shadowRoot.querySelectorAll('.tab').length
//         }, [], function(result) {
//             browser.assert.equal(result.value, 2);
//         });
//     },


//     "Should remove tab when tab-remove-button is clicked": function(browser) {
//         // select products for the confirmation component to display something
//         browser
//             .url("file://" + process.cwd() + "/packages/package-selection-popup/testPages/selectionPopupTest.html")
//             .waitForElementVisible('#default-component-button', 1000)
//             .click('#default-component-button')
//             .pause(1000)
//             .waitForElementVisible('#default-component');
//         browser.execute(function buttonTest() {
//             var shadowDom = document.querySelector('#default-component').shadowRoot;
//             shadowDom.querySelectorAll('.product')[0].click();
//             shadowDom.getElementById('orderBtn').click()
//         }, [], function(result) { console.log(result) });

//         browser
//             .url("file://" + process.cwd() + "/packages/package-selection-popup/testPages/selectionPopupTest.html")
//             .waitForElementVisible('#default-component-button', 1000)
//             .click('#default-component-button')
//             .pause(1000)
//             .waitForElementVisible('#default-component');
//         browser.execute(function buttonTest() {
//             var shadowDom = document.querySelector('#default-component').shadowRoot;
//             shadowDom.querySelectorAll('.product')[0].click();
//             shadowDom.getElementById('orderBtn').click()
//         }, [], function(result) { console.log(result) });

//         // go to confirmation component and check if it's displayed correctly
//         browser
//             .url("file://" + process.cwd() + "/packages/package-confirmation/testPages/confirmationTest.html")
//             .waitForElementVisible('#default-confirmation');
        
//         browser.execute(function clickTabRemove() {
//             var shadowRoot = document.querySelector('#default-confirmation').shadowRoot;
//             shadowRoot.querySelectorAll('.tab__remove')[0].click();
//         }, [], function(result) {
//             console.log("test done");
//             console.log(result);
//         });

//         browser.expect.elements('.tab').count.to.equal(1);
//     }
    // ,
    // "Should remove component when all product-tab-remove-buttons are closed": function(browser) {
    //     // select products for the confirmation component to display something
    //     browser
    //         .url("file://" + process.cwd() + "/packages/package-selection-popup/testPages/selectionPopupTest.html")
    //         .waitForElementVisible('#default-component-button', 1000)
    //         .click('#default-component-button')
    //         .pause(1000)
    //         .waitForElementVisible('#default-component');
    //     browser.execute(function buttonTest() {
    //         var shadowDom = document.querySelector('#default-component').shadowRoot;
    //         shadowDom.querySelectorAll('.product')[0].click();
    //         shadowDom.getElementById('orderBtn').click()
    //     }, [], function(result) { console.log(result) });

    //     // go to confirmation component and check if it's displayed correctly
    //     browser
    //         .url("file://" + process.cwd() + "/packages/package-confirmation/testPages/confirmationTest.html")
    //         .waitForElementVisible('#default-confirmation', 1500)
    //         .expect.element('#default-confirmation').to.be.visible;
    // }
// }
