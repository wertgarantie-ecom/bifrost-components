/* In nightwatch/globals.js */
var HtmlReporter = require('nightwatch-html-reporter');
var reporter = new HtmlReporter({
    openBrowser: false,
    reportsDirectory: __dirname + '/reports'
});
module.exports = {
    reporter: reporter.fn
};