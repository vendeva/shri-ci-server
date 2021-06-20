import constants from "../constants/constants";

const interactiveReducer = (
    state = {
        isPopupActive: false,
    },
    action
) => {
    switch (action.type) {
        case constants.POPUP:
            return {
                ...state,
                isPopupActive: action.payload,
            };
        default:
            return state;
    }
};
export default interactiveReducer;

export const getIsPopupActive = (state) => state.interactive.isPopupActive;
