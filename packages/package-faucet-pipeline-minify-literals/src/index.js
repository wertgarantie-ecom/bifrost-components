const minify = require('minify-html-literals').minifyHTMLLiterals;
const fs = require('fs');

module.exports = (config) => {
    return () => {
        fs.readFile(config[0].source, (err, data) => {
            const content = data.toString();
            const result = minify(content);
            fs.writeFile(config[0].target, result.code, err => {
                if (err) {
                    console.error(err)
                }
            });
        });
    }
};