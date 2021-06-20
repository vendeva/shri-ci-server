import classnames from "classnames";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggle } from "../actions/interactive";

export const Header = ({ classHeader, text, title }) => {
    let history = useHistory();
    const dispatch = useDispatch();
    const componentName = "header";
    return (
        <header className={classnames(`${componentName}`, `${componentName}_${classHeader}`)}>
            <div className={`${componentName}__title`}>{title}</div>
            <div className={`${componentName}__buttons`}>
                <button
                    className={`${componentName}__popup-button button_condition-grey`}
                    onClick={() =>
                        classHeader === "startPage"
                            ? history.push("/settings")
                            : dispatch(toggle(true))
                    }
                >
                    <span>{text}</span>
                </button>
                <button
                    className={`${componentName}__settings button_condition-grey`}
                    onClick={() => history.push("/settings")}
                ></button>
            </div>
        </header>
    );
};
