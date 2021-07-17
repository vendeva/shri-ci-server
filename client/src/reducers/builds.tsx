import * as constants from "../constants/constants";
import { BuildsState, BuildsAction } from "./types/builds";
import { RootState } from ".";

const buildsReducer = (
    state: BuildsState = { data: [], detail: null, error: null },
    action: BuildsAction
): BuildsState => {
    switch (action.type) {
        case constants.BUILDS:
            return {
                ...state,
                data: [...action.payload],
            };
        case constants.MORE_BUILDS:
            return {
                ...state,
                data: [...state.data, ...action.payload],
            };
        case constants.NEW_BUILD:
            state.data = [action.payload, ...state.data];
            return state;
        case constants.DETAIL_BUILD:
            state.detail = action.payload;
            return state;
        case constants.DETAIL_LOG:
            state.detail = state.detail ? { ...state.detail, log: action.payload } : null;
            return state;
        case constants.ERROR_BUILD:
            state.error = action.payload.error;
            return state;
        default:
            return state;
    }
};
export default buildsReducer;

export const getBuilds = (state: RootState) => state.builds.data;

export const getBuildDetail = (state: RootState) => state.builds.detail;

export const getBuildError = (state: RootState) => state.builds.error;
