const { instance } = require("../../config");
const fs = require("fs");

//получение логов билда
module.exports = async (req, res) => {
    const { buildId } = req.params;
    try {
        const { data } = await instance.get("/build/log", { responseType: "stream", params: { buildId } });

        fs.exists("logs.txt", function (exists) {
            if (!exists) {
                data.pipe(fs.createWriteStream("logs.txt"));
                data.pipe(res);
            } else {
                fs.stat("logs.txt", (err, stats) => {
                    if (Date.now() - Date.parse(stats.birthtime) < 86400000) {
                        const stream = fs.createReadStream("logs.txt");
                        stream.pipe(res);
                    } else {
                        data.pipe(fs.createWriteStream("logs.txt"));
                        data.pipe(res);
                    }
                });
            }
        });
    } catch (e) {
        res.end(e.message);
    }
};
