const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const { apiSettings, apiBuilds } = require("./routers");
const port = PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// settings routes
app.use("/api/settings", apiSettings);

// builds routes
app.use("/api/builds", apiBuilds);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
