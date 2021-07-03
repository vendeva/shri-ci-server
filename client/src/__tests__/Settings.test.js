import { it, expect } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import events from "@testing-library/user-event";
import constants from "../constants/constants";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { SettingsPage } from "../pages/SettingsPage";
import { StartPage } from "../pages/StartPage";
import { BuildListPage } from "../pages/BuildListPage";
import { getFetchSettings } from "../actions/settings";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers";
import { createMemoryHistory } from "history";

import settings from "../dataForTests/settings.json";
import settingsNewValues from "../dataForTests/settingsNewValues.json";

const middleware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

const fetchMock = (status, res) => {
    global.fetch = jest.fn().mockImplementation(
        async () =>
            await Promise.resolve(
                new window.Response(res, {
                    status: status,
                    headers: {
                        "Content-type": "application/json",
                    },
                })
            )
    );
};

it("если нет настроек репозитория отобразится стартовая страница", async () => {
    const history = createMemoryHistory({
        initialEntries: ["/"],
        initialIndex: 0,
    });

    const application = (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() =>
                            store.getState().settings.repoName ? <BuildListPage /> : <StartPage />
                        }
                    />
                </Switch>
            </Router>
        </Provider>
    );
    const { getByTestId } = render(application);
    expect(getByTestId("settings-open").textContent).toEqual("Open settings");
    screen.logTestingPlaygroundURL();
});

it("если настройки установлены, то поля формы заполнены соответствующими значениями", async () => {
    fetchMock(200, JSON.stringify(settings));
    const { repoName, buildCommand, mainBranch, period } = settings.data;

    await store.dispatch(getFetchSettings());
    const application = (
        <Provider store={store}>
            <BrowserRouter>
                <SettingsPage />
            </BrowserRouter>
        </Provider>
    );

    const { getByTestId } = render(application);
    expect(getByTestId("repoName")).toHaveValue(repoName);
    expect(getByTestId("buildCommand")).toHaveValue(buildCommand);
    expect(getByTestId("mainBranch")).toHaveValue(mainBranch);
    expect(getByTestId("period")).toHaveValue(period);
    screen.logTestingPlaygroundURL();
});

it("изменить настройки репозитория, проверить изменены ли значения в полях формы", async () => {
    fetchMock(200, JSON.stringify(settings));

    await store.dispatch(getFetchSettings());
    const application = (
        <Provider store={store}>
            <BrowserRouter>
                <SettingsPage />
            </BrowserRouter>
        </Provider>
    );

    fetchMock(200, JSON.stringify(settingsNewValues));
    const { repoName, buildCommand, mainBranch, period } = settingsNewValues.data;

    const { getByTestId, getAllByTestId } = render(application);
    getAllByTestId("clear-input").map((item) => events.click(item));
    events.type(getByTestId("repoName"), repoName);
    events.type(getByTestId("buildCommand"), buildCommand);
    events.type(getByTestId("mainBranch"), mainBranch);

    events.click(getByTestId("save-settings"));
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    await store.dispatch(getFetchSettings());

    expect(getByTestId("repoName")).toHaveValue(repoName);
    expect(getByTestId("buildCommand")).toHaveValue(buildCommand);
    expect(getByTestId("mainBranch")).toHaveValue(mainBranch);
    expect(getByTestId("period")).toHaveValue(period);
    screen.logTestingPlaygroundURL();
});
it("вывести предупреждения, если не заполнены поля формы", async () => {
    fetchMock(200, JSON.stringify(settings));

    await store.dispatch(getFetchSettings());
    const application = (
        <Provider store={store}>
            <BrowserRouter>
                <SettingsPage />
            </BrowserRouter>
        </Provider>
    );

    const { getByTestId, getAllByTestId } = render(application);
    getAllByTestId("clear-input").map((item) => events.click(item));
    events.click(getByTestId("save-settings"));

    expect(getByTestId("error-repoName").textContent).toBe(constants.ERROR_REPONAME);
    expect(getByTestId("error-buildCommand").textContent).toBe(constants.ERROR_BUILDCOMMAND);
    screen.logTestingPlaygroundURL();
});
