const { instance } = require("../../config");

//получение логов билда
module.exports = async (req, res) => {
    const { buildId } = req.params;
    try {
        const { data } = await instance.get("/build/log", { params: { buildId } });
        res.json(data);
    } catch (e) {
        res.end(e.message);
    }
};
