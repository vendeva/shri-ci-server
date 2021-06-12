const { instance, useLocalPath, execPromise } = require("../../config");

//добавление сборки в очередь
module.exports = async (req, res) => {
    const { commitHash } = req.params;
    let infoAvtorCommit, currentBranch;

    try {
        infoAvtorCommit = await execPromise("git", ["log", "-1", "--pretty=format:%an|%s", commitHash], {
            cwd: useLocalPath,
        });
        currentBranch = await execPromise("git", ["branch", "--contains", commitHash], {
            cwd: useLocalPath,
        });
    } catch (e) {
        res.end(e.message);
    }

    let commitMessage, branchName, authorName;
    const infoAvtorCommitSplit = infoAvtorCommit.stdout.split("|");
    const infoCurrentBranchSplit = currentBranch.stdout.split("\n");
    [authorName, commitMessage] = infoAvtorCommitSplit;
    branchName = infoCurrentBranchSplit
        .find((item) => item.includes("* "))
        .replace("*", "")
        .trim();

    try {
        const { data } = await instance.post("/build/request", { commitMessage, commitHash, branchName, authorName });
        res.json(data);
    } catch (e) {
        res.end(e.message);
    }
};
