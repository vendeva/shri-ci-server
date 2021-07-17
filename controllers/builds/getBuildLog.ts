import { instance } from "../../config";
import { Request, Response } from "express";
import fs from "fs";

//получение логов билда
export const getBuildLog = async (req: Request, res: Response) => {
    const { buildId } = req.params;
    try {
        const { data } = await instance.get("/build/log", {
            responseType: "stream",
            params: { buildId },
        });

        const logName = `${buildId}`.slice(0, 5);
        fs.stat(`logs/${logName}.txt`, function (err, stat) {
            if (!stat) {
                data.pipe(fs.createWriteStream(`logs/${logName}.txt`));
                data.pipe(res);
            } else {
                if (Date.now() - Date.parse(String(stat.mtime)) < 86400000 && stat.size) {
                    const stream = fs.createReadStream(`logs/${logName}.txt`);
                    stream.pipe(res);
                } else {
                    data.pipe(fs.createWriteStream(`logs/${logName}.txt`));
                    data.pipe(res);
                }
            }
        });
    } catch (e) {
        res.end(e.message);
    }
};
