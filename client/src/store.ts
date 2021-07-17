import { createStore, applyMiddleware, Middleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";

const middleware: Middleware<{}, any, any>[] = [thunk];

if (process.env.NODE_ENV !== "production") {
    middleware.push(createLogger());
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
//Middleware < any, {}, any > [];
