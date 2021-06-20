import { Header } from "../components/Header";
import { BuildCard } from "../components/BuildCard";
import { Log } from "../components/Log";
import { useParams } from "react-router-dom";
import constants from "../constants/constants";
import dataJson from "../data/buildList.json";

export const BuildDetailsPage = () => {
    const repoName = "vendeva/yandex_task1";
    const { buildId } = useParams();
    const { data } = dataJson;
    const {
        buildNumber,
        commitMessage,
        branchName,
        commitHash,
        authorName,
        start,
        duration,
        status,
    } = data.find((item) => item.id === buildId);

    return (
        <>
            <Header classHeader="buildDetail" text={constants.REBUILD} title={repoName} />
            <div className="container">
                <BuildCard
                    buildNumber={buildNumber}
                    commitMessage={commitMessage}
                    branchName={branchName}
                    commitHash={commitHash}
                    authorName={authorName}
                    start={start}
                    duration={duration}
                    key={buildId}
                    status={status}
                />
                <Log />
            </div>
        </>
    );
};
