import constants from "../constants/constants";
import { isFetch, isLoadingApp } from "./interactive";

export const setSettings = (obj) => ({
    type: constants.SETTINGS,
    payload: obj,
});

export const saveSettings = (data) => (dispatch) => {
    dispatch(isFetch(true));
    return fetch(`${constants.SERVER_API}/settings`, {
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

export const getFetchSettings = (params) => (dispatch) => {
    const url = new URL(`${constants.SERVER_API}/settings`);
    url.search = new URLSearchParams(params).toString();
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
