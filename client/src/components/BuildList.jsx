import { BuildCard } from "./BuildCard";
import dataJson from "../data/buildList.json";

export const BuildList = () => {
    const { data } = dataJson;
    return (
        <>
            {data.map(
                ({
                    status,
                    id,
                    buildNumber,
                    commitMessage,
                    branchName,
                    commitHash,
                    authorName,
                    start,
                    duration,
                }) => (
                    <BuildCard
                        link={`/build/${id}`}
                        buildNumber={buildNumber}
                        commitMessage={commitMessage}
                        branchName={branchName}
                        commitHash={commitHash}
                        authorName={authorName}
                        start={start}
                        duration={duration}
                        key={id}
                        status={status}
                    />
                )
            )}
            <button className="container__show button-condition-grey">Show more</button>
        </>
    );
};

export default BuildList;
