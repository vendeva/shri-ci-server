import * as constants from "../constants/constants";
import { isFetch, isLoadingApp } from "./interactive";
import { Dispatch as AppDispatch } from "redux";
import { SettingsAction, SettingsPayload, SettingsState } from "../reducers/types/settings";
import { InteractiveAction } from "../reducers/types/interactive";
import { queryParams } from "../common/common";

export const setSettings = (obj: SettingsPayload): SettingsAction => ({
    type: constants.SETTINGS,
    payload: obj,
});

export const saveSettings =
    (data: SettingsState) => (dispatch: AppDispatch<SettingsAction | InteractiveAction>) => {
        dispatch(isFetch(true));
        return fetch(`${constants.constants.SERVER_API}/settings`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    dispatch(setSettings({ ...result, error: null }));
                },
                (error) => {
                    dispatch(setSettings({ error }));
                }
            )
            .finally(() => dispatch(isFetch(false)));
    };

export const getFetchSettings = (params: queryParams) => (dispatch: AppDispatch) => {
    const url = new URL(`${constants.constants.SERVER_API}/settings`);
    url.search = new URLSearchParams(params as string[][]).toString();  
    return fetch(url.href)
        .then((res) => res.json())
        .then(
            (result) => {
                if (Object.keys(result).length !== 0) {
                    const { repoName, buildCommand, mainBranch, period } = result.data;
                    dispatch(
                        setSettings({ repoName, buildCommand, mainBranch, period, error: null })
                    );
                }
            },
            (error) => {
                dispatch(setSettings({ error }));
            }
        )
        .finally(() => dispatch(isLoadingApp(true)));
};
