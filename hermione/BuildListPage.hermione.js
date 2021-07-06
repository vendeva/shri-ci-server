const assert = require("assert");
const delay = require("delay");

describe("Страница список билдов", function () {
    it("Cравнить значение buildNumber c установленной заглушкой у второго билда в списке", async function () {
        const browser = this.browser;
        await browser.url("/");

        const buildsContainer = await browser.$("[data-testid='build-list']");
        await buildsContainer.waitForExist();

        await delay(1000);

        const buildNumber = await buildsContainer.$$(".build__buildNumber");
        await buildNumber[1].waitForExist();
        const text = await buildNumber[1].getText();

        assert.strictEqual(text, "#10");

        await browser.assertView("builds", ".container");
    });

    it("По клику на кнопку RunBuild в модальном окне когда поле не заполнено видно предупреждение", async function () {
        const browser = this.browser;
        await browser.url("/");

        await delay(1000);

        const a = await browser.$("[data-testid='build-popup']");
        await a.click();

        await delay(1000);

        const b = await browser.$("[data-testid='build-done']");
        await b.click();

        const errorHash = await (await browser.$(".error")).getText();
        assert.strictEqual(errorHash, "Необходимо заполнить хэш коммита");

        await browser.assertView("builds", ".popup", {
            allowViewportOverflow: true,
        });
    });

    it("По клику на кнопку RunBuild открывается модальное окно", async function () {
        const browser = this.browser;
        await browser.url("/");

        await delay(1000);

        const a = await browser.$("[data-testid='build-popup']");
        await a.click();

        await delay(1000);

        const modal = await browser.$(".popup");
        modal.waitForExist();

        await browser.assertView("builds", ".popup", {
            allowViewportOverflow: true,
        });
    });

    it("По клику на кнопку настроек открывается страница настроек", async function () {
        const browser = this.browser;
        await browser.url("/");

        await delay(1000);

        const a = await browser.$(".header__settings");
        await a.click();

        await delay(1000);

        const settings = await browser.$(".settings");
        settings.waitForExist();
    });
});
