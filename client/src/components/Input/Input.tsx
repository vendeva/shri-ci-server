import { FC } from "react";
import { useState } from "react";
import { InputProps } from "./types";

export const Input: FC<InputProps> = ({
    placeholder,
    required,
    pattern,
    title,
    value,
    type,
    name,
    data_testid,
}) => {
    const componentName: string = "input";
    const [inputValue, setValue] = useState(value);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
    const handleClick = () => setValue("");
    return (
        <div className={componentName}>
            {title && (
                <label htmlFor={placeholder} className={`${componentName}__title`}>
                    {title}
                    {required ? <span> *</span> : ""}
                </label>
            )}
            {type === "number" && <label htmlFor={String(value)}>Synchronize every</label>}
            <div className={`${componentName}__block`}>
                <input
                    id={placeholder || String(value)}
                    className={`${componentName}__place`}
                    placeholder={placeholder}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    value={inputValue}
                    pattern={pattern}
                    type={type || "text"}
                    name={name}
                    data-testid={data_testid}
                />
                {inputValue && (
                    <div
                        className={`${componentName}__clear`}
                        data-testid="clear-input"
                        onClick={() => {
                            handleClick();
                        }}
                    ></div>
                )}
            </div>
            {type === "number" && <label htmlFor={String(value)}>minutes</label>}
        </div>
    );
};
