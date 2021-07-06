const assert = require("assert");
const delay = require("delay");

describe("Стартовая страница", function () {
    it("Если настройки не установлены отображается стартовая страница", async function () {
        const browser = this.browser;
        await browser.url("/?start=1");

        await delay(1000);

        const settingsButton = await browser.$(".start__button");
        await settingsButton.waitForExist();
        const text = await settingsButton.getText();
        assert.strictEqual(text, "Open settings");

        await delay(1000);

        await settingsButton.click();
        const repoName = await browser.$("[data-testid='buildCommand']");
        const valueInput = await repoName.getValue();

        assert.strictEqual(valueInput, "");
    });

    it("Скриншот стартовой страницы", async function () {
        const browser = this.browser;
        await browser.url("/?start=1");

        await delay(1000);

        await browser.assertView("start", ".container");
    });
});
