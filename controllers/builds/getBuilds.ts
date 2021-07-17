import { instance } from "../../config";
import dataJson from "../../dataForTests/buildList.json";
import { Request, Response } from "express";

//получение списка сборок
export const getBuilds = async (req: Request, res: Response) => {
    try {
        const testParam = new URLSearchParams(String(req.query)).get("test");

        if (!testParam) {
            // если не тестовый сценарий
            const queryString = `?${new URLSearchParams(String(req.query)).toString()}`;
            const { data } = await instance.get(`/build/list${queryString}`);

            res.json(data);
        } else {
            res.json(dataJson);
        }
    } catch (e) {
        res.end(e.message);
    }
};
