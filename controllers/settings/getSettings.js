const { instance } = require("../../config");
const settings = require("../../client/src/dataForTests/settings.json");
const settingsEmpty = require("../../client/src/dataForTests/settings__.json");

// получение сохраненных настроек
module.exports = async (req, res) => {
    try {
        const testParam = new URLSearchParams(req.query).get("test");
        const testStartParam = new URLSearchParams(req.query).get("start");

        if (testStartParam) {
            // тестовый сценарий, настройки не установлены
            res.json(settingsEmpty);
        } else if (testParam) {
            // тестовый сценарий, настройки установлены
            res.json(settings);
        } else {
            // если не тестовый сценарий
            const { data } = await instance.get("/conf");
            res.json(data);
        }
    } catch (e) {
        res.end(e.message);
    }
};
