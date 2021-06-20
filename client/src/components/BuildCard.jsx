import { Link } from "react-router-dom";
import classnames from "classnames";

export const BuildCard = (params) => {
    const componentName = "build";
    const {
        link,
        buildNumber,
        commitMessage,
        branchName,
        commitHash,
        authorName,
        start,
        duration,
        status,
    } = params;
    const date = new Date(start);
    const months = [
        "янв",
        "февр",
        "март",
        "апр",
        "май",
        "июня",
        "июля",
        "авг",
        "сент",
        "окт",
        "нояб",
        "дек",
    ];
    const dateString = start
        ? `${date.getDate()} ${months[date.getMonth()]}, ${("0" + date.getHours()).slice(
              -2
          )}:${date.getMinutes()}`
        : "";

    const timeFormat = (duration) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        const hoursStr = hours ? `${hours} ч` : "";
        const minutesStr = minutes ? `${minutes} мин` : "";
        return `${hoursStr}${hours && minutes ? " " : ""}${minutesStr}`;
    };

    const CustomTag = link ? Link : "div";

    return (
        <CustomTag to={link} className={componentName}>
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
                    <div className={`${componentName}__commitHash`}>{commitHash.slice(0, 7)}</div>
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
                    {timeFormat(duration)}
                </div>
            </div>
        </CustomTag>
    );
};
