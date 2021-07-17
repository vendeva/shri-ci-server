import * as constants from "../constants/constants";
import { InteractiveState, InteractiveAction } from "./types/interactive";
import { RootState } from ".";

const interactiveReducer = (
    state: InteractiveState = {
        isPopupActive: false,
        isFetch: false,
        isLoadingApp: false,
        isShowEnd: false,
    },
    action: InteractiveAction
) => {
    switch (action.type) {
        case constants.POPUP:
            return {
                ...state,
                isPopupActive: action.payload,
            };
        case constants.FETCHING_STATUS:
            return {
                ...state,
                isFetch: action.payload,
            };
        case constants.LOAD_SETTINGS:
            return {
                ...state,
                isLoadingApp: action.payload,
            };
        case constants.SHOW_END:
            return {
                ...state,
                isShowEnd: action.payload,
            };
        default:
            return state;
    }
};
export default interactiveReducer;

export const getIsPopupActive = (state: RootState) => state.interactive.isPopupActive;

export const getIsFetchingStatus = (state: RootState) => state.interactive.isFetch;

export const getIsLoadingApp = (state: RootState) => state.interactive.isLoadingApp;

export const getIsShowEnd = (state: RootState) => state.interactive.isShowEnd;
