import { FC } from "react";
import classnames from "classnames";
import { ButtonProps } from "./types";

export const Button: FC<ButtonProps> = ({
    type,
    text,
    click,
    view,
    disabled,
    elementClass,
    data_testid,
}) => {
    const componentName: string = "button";
    const className = elementClass ? elementClass : `${componentName}_${view}`;
    return (
        <button
            type={type}
            className={classnames(`${className}`, `${componentName}_condition-${view}`)}
            data-testid={data_testid}
            onClick={click}
            disabled={disabled}
        >
            {text}
        </button>
    );
};
