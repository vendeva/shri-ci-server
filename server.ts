import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { PORT, useLocalPath, useLogsPath } from "./config";
import { apiSettings, apiBuilds } from "./routers";

const port = PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

fs.stat(useLocalPath, function (err, stat) {
    if (!stat) {
        fs.mkdir(useLocalPath, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Directory 'localRepository' created successfully!");
        });
    }
});
fs.stat(useLogsPath, function (err, stat) {
    if (!stat) {
        fs.mkdir(useLogsPath, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Directory 'logs' created successfully!");
        });
    }
});

// settings routes
app.use("/api/settings", apiSettings);

// builds routes
app.use("/api/builds", apiBuilds);

// STATIC BLOCK //
app.use(express.static(path.resolve(__dirname, "client/build/")));

app.get("/*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client/build/", "index.html"));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
