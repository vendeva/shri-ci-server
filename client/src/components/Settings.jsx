import { Input } from "./Input";
import { getSettings } from "../reducers/settings";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const Settings = () => {
    const componentName = "settings";
    let history = useHistory();
    const { repoName, buildCommand, mainBranch, period } = useSelector(getSettings);
    return (
        <form className={componentName}>
            <div className={`${componentName}__title`}>Settings</div>
            <div className={`${componentName}__subTitle`}>
                Configure repository connection and synchronization settings.
            </div>
            <Input
                placeholder="user-name/repo-name"
                required="required"
                title="GitHub repository"
                value={repoName}
            />
            <Input
                placeholder="npm ci && npm run build"
                required="required"
                title="Build command"
                value={buildCommand}
            />
            <Input placeholder="master" title="Main branch" value={mainBranch} />
            <div className="settings__period">
                <Input value={period || "10"} type="number" pattern="/^[0-9]$/" />
            </div>
            <div className="button">
                <button className="button_action button_condition-yellow">Save</button>
                <button
                    className="button_cancel button_condition-grey"
                    onClick={() => history.push("/")}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};
