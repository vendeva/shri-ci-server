import { instance, useLocalPath, execPromise } from "../../config";
import { Request, Response } from "express";

//добавление сборки в очередь
export const addBuild = async (req: Request, res: Response) => {
    const { commitHash } = req.params;
    let infoAvtorCommit, currentBranch;

    try {
        infoAvtorCommit = await execPromise(
            "git",
            ["log", "-1", "--pretty=format:%an|%s|%d", commitHash],
            {
                cwd: useLocalPath,
            }
        );
        currentBranch = await execPromise("git", ["branch", "--contains", commitHash], {
            cwd: useLocalPath,
        });

        let commitMessage, branchName, authorName, originBranch;
        const infoAvtorCommitSplit = infoAvtorCommit.stdout.split("|");
        const infoCurrentBranchSplit = currentBranch.stdout.split("\n");
        [authorName, commitMessage, originBranch] = infoAvtorCommitSplit;
        //console.log(infoAvtorCommit);
        //console.log(infoCurrentBranchSplit);
        branchName = infoCurrentBranchSplit[0].replace("*", "").trim();
        if (!branchName) {
            branchName = `${originBranch}`.replace(/\(origin\//, "").replace(/\)/, "");
            //console.log(branchName);
        }

        //Постановка билда
        const { data } = await instance.post("/build/request", {
            commitMessage,
            commitHash,
            branchName,
            authorName,
        });

        const resultData = {
            ...data.data,
            commitMessage,
            branchName,
            authorName,
            commitHash,
        };

        // НЕ нужно, сборками занимаеться билд-сервер с билд-агентами
        //         const start = new Date().toJSON();
        //         // Старт сборки
        //         await instance.post("/build/start", {
        //             buildId: resultData.id,
        //             dateTime: start,
        //         });

        //         // Конец сборки
        //         const log = `[2K[1G[1myarn run v1.22.5[22m
        // [2K[1G[2m$ webpack --config webpack/production.js --color[22m
        // /Users/fedinamid/Workspace/webpack-config/webpack
        // Hash: [1m2a88f51a3c1cffdbdac8[39m[22m
        // Version: webpack [1m4.44.1[39m[22m
        // Time: [1m65[39m[22mms
        // Built at: 06/19/2021 [1m3:08:51 AM[39m[22m
        //       [1mAsset[39m[22m       [1mSize[39m[22m  [1mChunks[39m[22m  [1m[39m[22m                 [1m[39m[22m[1mChunk Names[39m[22m
        //     [1m[32mmain.js[39m[22m  963 bytes       [1m0[39m[22m  [1m[32m[emitted][39m[22m        main
        // [1m[32mmain.js.map[39m[22m   4.52 KiB       [1m0[39m[22m  [1m[32m[emitted] [dev][39m[22m  main
        // Entrypoint [1mmain[39m[22m = [1m[32mmain.js[39m[22m [1m[32mmain.js.map[39m[22m
        // [0] [1m./src/index.js[39m[22m 1 bytes {[1m[33m0[39m[22m}[1m[32m [built][39m[22m
        // [2K[1GDone in 0.84s.`;
        //         const serializeLog = JSON.stringify(log);

        //         setTimeout(() => {
        //             instance.post("/build/finish", {
        //                 buildId: resultData.id,
        //                 duration: 6,
        //                 success: true,
        //                 buildLog: serializeLog,
        //             });
        //         }, 60000);

        res.json(resultData);
    } catch (e) {
        res.status(500).end(e.message);
    }
};
