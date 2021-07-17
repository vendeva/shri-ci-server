import axios from "axios";
import https from "https";
import * as dotenv from "dotenv";
import path from "path";
import util from "util";
import { execFile } from "child_process";

dotenv.config();

export const PORT = 8000;
export const instance = axios.create({
    baseURL: "https://shri.yandex/hw/api",
    timeout: 5000,
    headers: {
        Authorization: "Bearer " + process.env["API_TOKEN"],
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});
export const useLocalPath = path.resolve(__dirname, "localRepository");
export const useLogsPath = path.resolve(__dirname, "logs");
export const execPromise = util.promisify(execFile);
