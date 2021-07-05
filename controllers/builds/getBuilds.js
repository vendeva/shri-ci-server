const { instance } = require("../../config");
const dataJson = require("../../client/src/dataForTests/buildList.json");

//получение списка сборок
module.exports = async (req, res) => {
    try {
        const testParam = new URLSearchParams(req.query).get("test");

        if (!testParam) {
            // если не тестовый сценарий
            const queryString = `?${new URLSearchParams(req.query).toString()}`;
            const { data } = await instance.get(`/build/list${queryString}`);

            res.json(data);
        } else {
            res.json(dataJson);
        }
    } catch (e) {
        res.end(e.message);
    }
};
