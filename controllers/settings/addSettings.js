const { instance, useLocalPath, execPromise } = require("../../config");

//получение списка сборок
module.exports = async (req, res) => {
    const { repoName, buildCommand, mainBranch, period } = req.body;

    try {
        const { status } = await instance.post("/conf", { repoName, buildCommand, mainBranch, period });
        res.end(`${status}`);
    } catch (e) {
        res.end(e.message);
    }

    // клонирование локального репозитория
    try {
        await execPromise("rm", ["-rf", "localRepository/"]);
        await execPromise("git", ["clone", repoName, "localRepository"]);
        await execPromise("git", ["checkout", mainBranch], { cwd: useLocalPath });
    } catch (e) {
        console.log(e.message);
    }
};
