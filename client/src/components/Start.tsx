import { useHistory } from "react-router-dom";

export const Start = () => {
    let history = useHistory();
    const componentName: string = "start";
    return (
        <div className={componentName}>
            <div className={`${componentName}__image`}></div>
            <div className={`${componentName}__title`}>
                Configure repository connection and synchronization settings
            </div>
            <button
                className="start__button button_action button_condition-yellow"
                onClick={() => history.push("/settings")}
                data-testid="settings-open"
            >
                Open settings
            </button>
        </div>
    );
};
