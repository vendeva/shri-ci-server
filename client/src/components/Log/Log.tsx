import { FC } from "react";
import { LogProps } from "./types";
import Convert from "ansi-to-html";

export const Log: FC<LogProps> = ({ log }) => {
    const componentName: string = "log";
    const convert = new Convert({
        fg: "#000",
        bg: "#000",
    });

    let html = convert.toHtml(log || "");
    const prettyLog = () => {
        return <pre dangerouslySetInnerHTML={{ __html: html }} />;
    };
    return <div className={componentName}>{prettyLog()}</div>;
};
