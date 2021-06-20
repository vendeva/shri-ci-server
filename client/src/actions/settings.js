import constants from "../constants/constants";

export const setSettings = (obj) => ({
    type: constants.SETTINGS,
    payload: obj,
});
