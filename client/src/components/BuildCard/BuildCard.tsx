import { FC } from "react";
import { Link } from "react-router-dom";
import { constants } from "../../constants/constants";
import { BuildCardProps } from "./types";
import classnames from "classnames";

export const BuildCard: FC<BuildCardProps> = (params) => {
    const componentName: string = "build";
    const link = params.link;
    const {
        buildNumber,
        commitMessage,
        branchName,
        commitHash,
        authorName,
        start,
        duration,
        status,
    } = params.data;

    const date = new Date(`${start}Z`);
    const months = constants.MONTHS;
    const dateString = start
        ? `${date.getDate()} ${months[date.getMonth()]}, ${date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
          })}`
        : "";

    const timeFormat = (duration: number): string => {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        const hoursStr = hours ? `${hours} ч` : "";
        const minutesStr = minutes ? `${minutes} мин` : "";
        return `${hoursStr}${hours && minutes ? " " : ""}${minutesStr}`;
    };

    const BuildCardBody = (): JSX.Element => (
        <>
            <div className={`${componentName}__data`}>
                <div className={`${componentName}__head`}>
                    <div
                        className={classnames(
                            `${componentName}__buildNumber`,
                            `${componentName}__buildNumber_${`${status}`.toLowerCase()}`
                        )}
                    >{`#${buildNumber}`}</div>
                    <div className={`${componentName}__commitMessage`}>{commitMessage}</div>
                </div>
                <div className={`${componentName}__body`}>
                    <div className={`${componentName}__branchName`}>{branchName}</div>
                    <div className={`${componentName}__commitHash`} data-testid="build-commitHash">
                        {commitHash && commitHash.slice(0, 7)}
                    </div>
                    <div className={`${componentName}__authorName`}>{authorName}</div>
                </div>
            </div>
            <div className={`${componentName}__time`}>
                <div
                    className={classnames({
                        [`${componentName}__date`]: true,
                        [`${componentName}_none`]: !dateString,
                    })}
                >
                    {dateString}
                </div>
                <div
                    className={classnames({
                        [`${componentName}__period`]: true,
                        [`${componentName}_none`]: !duration,
                    })}
                >
                    {duration ? timeFormat(duration) : ""}
                </div>
            </div>
        </>
    );

    return link ? (
        <Link to={link} className={componentName} data-testid={params.data_testid}>
            {BuildCardBody()}
        </Link>
    ) : (
        <div className={componentName}>{BuildCardBody()}</div>
    );
};
