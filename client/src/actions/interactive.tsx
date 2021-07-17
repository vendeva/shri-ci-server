import * as constants from "../constants/constants";
import { InteractiveAction } from "../reducers/types/interactive";

export const toggle = (bool: boolean): InteractiveAction => ({
    type: constants.POPUP,
    payload: bool,
});

export const isFetch = (bool: boolean): InteractiveAction => ({
    type: constants.FETCHING_STATUS,
    payload: bool,
});

export const isLoadingApp = (bool: boolean): InteractiveAction => ({
    type: constants.LOAD_SETTINGS,
    payload: bool,
});
