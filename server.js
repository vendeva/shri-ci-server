const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { PORT, useLocalPath } = require("./config");
const { apiSettings, apiBuilds } = require("./routers");
const port = PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

fs.stat("localRepository", function (err, stat) {
    if (!stat) {
        fs.mkdir(useLocalPath, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Directory created successfully!");
        });
    }
});

// settings routes
app.use("/api/settings", apiSettings);

// builds routes
app.use("/api/builds", apiBuilds);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
