import constants from "../constants/constants";

export const toggle = (bool) => ({
    type: constants.POPUP,
    payload: bool,
});
