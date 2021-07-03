import constants from "../constants/constants";
import { Input } from "./Input";
import { Button } from "./Button";
import { getSettings } from "../reducers/settings";
import { getIsFetchingStatus } from "../reducers/interactive";
import { saveSettings } from "../actions/settings";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export const Settings = () => {
    const componentName = "settings";
    let history = useHistory();
    const dispatch = useDispatch();
    const { repoName, buildCommand, mainBranch, period, error } = useSelector(getSettings);
    const isFetch = useSelector(getIsFetchingStatus);
    const [submitValues, setSubmitValues] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const repoName = formData.get("repoName");
        const buildCommand = formData.get("buildCommand");
        const mainBranch = formData.get("mainBranch");
        const period = formData.get("period");
        const settingsData = {
            repoName,
            buildCommand,
            mainBranch,
            period,
        };
        setSubmitValues(settingsData);
        if (!Object.values({ repoName, buildCommand }).some((item) => !item)) {
            dispatch(saveSettings(settingsData));
        }
    };

    return (
        <form className={componentName} onSubmit={handleSubmit}>
            <div className={`${componentName}__title`}>Settings</div>
            <div className={`${componentName}__subTitle`}>
                Configure repository connection and synchronization settings.
            </div>
            {error && <div className="error">{`${constants.ERROR_WARNING}\n${error}`}</div>}
            {submitValues.repoName === "" && (
                <div className="error" data-testid="error-repoName">
                    {constants.ERROR_REPONAME}
                </div>
            )}
            <Input
                placeholder="user-name/repo-name"
                required="required"
                title="GitHub repository"
                name="repoName"
                value={repoName}
                data_testid="repoName"
            />
            {submitValues.buildCommand === "" && (
                <div className="error" data-testid="error-buildCommand">
                    {constants.ERROR_BUILDCOMMAND}
                </div>
            )}
            <Input
                placeholder="npm ci && npm run build"
                required="required"
                title="Build command"
                name="buildCommand"
                value={buildCommand}
                data_testid="buildCommand"
            />
            <Input
                placeholder="master"
                title="Main branch"
                name="mainBranch"
                value={mainBranch}
                data_testid="mainBranch"
            />
            <div className="settings__period">
                <Input
                    value={period || "10"}
                    name="period"
                    type="number"
                    pattern="/^[0-9]$/"
                    data_testid="period"
                />
            </div>
            <div className="button">
                <Button
                    type="submit"
                    text="Save"
                    view="action"
                    disabled={isFetch}
                    data_testid="save-settings"
                />
                <Button
                    text="Cancel"
                    view="cancel"
                    disabled={isFetch}
                    click={() => history.push("/")}
                />
            </div>
        </form>
    );
};
