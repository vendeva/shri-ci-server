import { combineReducers } from "redux";

import settings from "./settings";
import interactive from "./interactive";

const rootReducer = combineReducers({
    settings,
    interactive,
});
export default rootReducer;
