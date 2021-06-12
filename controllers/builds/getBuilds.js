const { instance } = require("../../config");

//получение списка сборок
module.exports = async (req, res) => {
    try {
        const { data } = await instance.get("/build/list");
        res.json(data);
    } catch (e) {
        res.end(e.message);
    }
};
