const assert = require("assert");
const delay = require("delay");
const constants = require("../client/src/constants/constants");

describe("Страница настроек", function () {
    it("Cравнить значение buildCommand в поле Git Repository c установленной заглушкой", async function () {
        const browser = this.browser;
        await browser.url("/settings");

        const settingsContainer = await browser.$(".settings");
        await settingsContainer.waitForExist();

        await delay(1000);

        const repoName = await settingsContainer.$("[data-testid='buildCommand']");
        const text = await repoName.getValue();

        assert.strictEqual(text, "npm run build12");

        await browser.assertView("settings", ".settings");
    });

    it("Предупреждения отображаются если не заполнены требуемые поля настроек ", async function () {
        const browser = this.browser;
        await browser.url("/settings");

        const settingsContainer = await browser.$(".settings");
        await settingsContainer.waitForExist();

        const a = await browser.$$("[data-testid='clear-input']");
        await a[0].click();
        await a[1].click();

        await delay(1000);

        const b = await browser.$("[data-testid='save-settings']");
        await b.click();

        await delay(1000);

        const errorRepo = await (await browser.$("[data-testid='error-repoName']")).getText();
        const errorCommand = await (
            await browser.$("[data-testid='error-buildCommand']")
        ).getText();

        assert.strictEqual(errorRepo, constants.ERROR_REPONAME);
        assert.strictEqual(errorCommand, constants.ERROR_BUILDCOMMAND);

        await browser.assertView("settings", ".settings");
    });
});
