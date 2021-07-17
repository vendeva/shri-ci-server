import * as constants from "../constants/constants";
import { RootState } from ".";
import { SettingsState, SettingsAction } from "./types/settings";

const settingsReducer = (
    state: SettingsState = {
        repoName: null,
        mainBranch: null,
        buildCommand: null,
        period: null,
        error: null,
    },
    action: SettingsAction
) => {
    switch (action.type) {
        case constants.SETTINGS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
export default settingsReducer;

export const getSettings = (state: RootState) => state.settings;
