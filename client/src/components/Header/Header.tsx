import { FC } from "react";
import classnames from "classnames";
import { Button } from "../Button/Button";
import { useHistory } from "react-router-dom";
import { HeaderProps } from "./types";

export const Header: FC<HeaderProps> = ({
    classHeader,
    text,
    title,
    clickButton,
    dataRunBuild,
}) => {
    let history = useHistory();
    const componentName: string = "header";
    return (
        <header className={classnames(`${componentName}`, `${componentName}_${classHeader}`)}>
            <div className={`${componentName}__title`}>{title}</div>
            <div className={`${componentName}__buttons`}>
                <Button
                    text={text}
                    view="cancel"
                    click={clickButton}
                    elementClass={`${componentName}__popup-button`}
                    data_testid={dataRunBuild}
                />
                <Button
                    view="cancel"
                    click={() => history.push("/settings")}
                    elementClass={`${componentName}__settings`}
                />
            </div>
        </header>
    );
};
