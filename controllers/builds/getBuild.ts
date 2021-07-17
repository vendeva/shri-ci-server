import { instance } from "../../config";
import { Request, Response } from "express";

//получение информации о конкретной сборке
export const getBuild = async (req: Request, res: Response) => {
    const { buildId } = req.params;
    try {
        const { data } = await instance.get("/build/details", { params: { buildId } });
        res.json(data);
    } catch (e) {
        res.end(e.message);
    }
};
