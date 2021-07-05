const assert = require("assert");
const delay = require("delay");

describe("Переход на детальную страницу билда", function () {
    it("Cравнить значения commitHash c установленной заглушкой", async function () {
        const browser = this.browser;
        await browser.url("/");

        await delay(1000);

        const a = await browser.$("[data-testid='build-link']");
        await a.click();

        const detailContainer = await browser.$("div.build");
        await detailContainer.waitForExist();

        const commitHash = await browser.$(".build__commitHash");
        const text = await commitHash.getText();

        assert.strictEqual(text, "5dd83fb");

        //await browser.assertView("detail", "div.build");
    });
});
