import * as constants from "../../constants/constants";

// State
export interface InteractiveState {
    isPopupActive: boolean;
    isFetch: boolean;
    isLoadingApp: boolean;
    isShowEnd: boolean;
}

// Actions
interface IPOPUP {
    type: typeof constants.POPUP;
    payload: InteractiveState["isPopupActive"];
}

interface IFETCHING_STATUS {
    type: typeof constants.FETCHING_STATUS;
    payload: InteractiveState["isFetch"];
}

interface ILOAD_SETTINGS {
    type: typeof constants.LOAD_SETTINGS;
    payload: InteractiveState["isLoadingApp"];
}

interface ISHOW_END {
    type: typeof constants.SHOW_END;
    payload: InteractiveState["isShowEnd"];
}
export type InteractiveAction = IPOPUP | IFETCHING_STATUS | ILOAD_SETTINGS | ISHOW_END;
