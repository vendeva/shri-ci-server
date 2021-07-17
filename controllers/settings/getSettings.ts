import { instance } from "../../config";
import settings from "../../dataForTests/settings.json";
import settingsEmpty from "../../dataForTests/settings__.json";
import { Request, Response } from "express";

// получение сохраненных настроек
export const getSettings = async (req: Request, res: Response) => {
    try {
        const testParam = new URLSearchParams(String(req.query)).get("test");
        const testStartParam = new URLSearchParams(String(req.query)).get("start");

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
