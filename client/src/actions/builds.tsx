import * as constants from "../constants/constants";
import { isFetch, toggle } from "./interactive";
import { History, queryParams } from "../common/common";
import { BuildsAction } from "../reducers/types/builds";
import { InteractiveAction } from "../reducers/types/interactive";
import { Dispatch as AppDispatch } from "redux";

export const addNewBuild =
    (commitHash: string, history: History) =>
    (dispatch: AppDispatch<BuildsAction | InteractiveAction>) => {
        dispatch(isFetch(true));
        return fetch(`${constants.constants.SERVER_API}/builds/${commitHash}`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    dispatch({
                        type: constants.NEW_BUILD,
                        payload: result,
                    });
                    history.push(`/build/${result.id}`);
                },
                (error) => {
                    dispatch({ type: constants.ERROR_BUILD, payload: { error } });
                }
            )
            .finally(() => {
                dispatch(isFetch(false));
                dispatch(toggle(false));
            });
    };

export const getFetchBuilds =
    (params: queryParams, more = false) =>
    (dispatch: AppDispatch<BuildsAction | InteractiveAction>) => {
        dispatch(isFetch(true));
        dispatch({ type: constants.SHOW_END, payload: false });
        const url = new URL(`${constants.constants.SERVER_API}/builds`);
        url.search = new URLSearchParams(params as string[][]).toString();
        return fetch(url.href)
            .then((res) => res.json())
            .then(
                (result) => {
                    const { data } = result;
                    if (Object.keys(data).length < constants.constants.ADD_LIMIT)
                        dispatch({ type: constants.SHOW_END, payload: true });
                    more
                        ? dispatch({
                              type: constants.MORE_BUILDS,
                              payload: data,
                          })
                        : dispatch({
                              type: constants.BUILDS,
                              payload: data,
                          });
                },
                (error) => {
                    dispatch({ type: constants.ERROR_BUILD, payload: { error } });
                }
            )
            .finally(() => {
                dispatch(isFetch(false));
            });
    };

export const getFetchBuildById =
    (buildId: string) => (dispatch: AppDispatch<BuildsAction | InteractiveAction>) => {
        dispatch(isFetch(true));
        return fetch(`${constants.constants.SERVER_API}/builds/${buildId}`)
            .then((res) => res.json())
            .then((result) => {
                const { data } = result;
                dispatch({
                    type: constants.ERROR_BUILD,
                    payload: { error: null },
                });
                dispatch({
                    type: constants.DETAIL_BUILD,
                    payload: data,
                });
                return fetch(`${constants.constants.SERVER_API}/builds/${buildId}/logs`);
            })
            .then((res) => res.json())
            .then((result) => {
                dispatch({
                    type: constants.DETAIL_LOG,
                    payload: result,
                });
            })
            .catch((error) => {
                dispatch({ type: constants.ERROR_BUILD, payload: { error } });
            })
            .finally(() => {
                dispatch(isFetch(false));
            });
    };
