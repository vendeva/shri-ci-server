const URI = require("urijs");

module.exports = (hermione, opts) => {
    hermione.on(hermione.events.NEW_BROWSER, (browser) => {
        browser.overwriteCommand("url", (origUrlFn, uri) => {
            uri = uri ? new URI(uri).addQuery(opts.query).toString() : uri;
            return origUrlFn(uri);
        });
    });
};
