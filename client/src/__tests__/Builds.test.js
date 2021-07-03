import { it, expect } from "@jest/globals";
import { render, screen, waitFor, within } from "@testing-library/react";
import { Provider } from "react-redux";
import events from "@testing-library/user-event";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { BuildListPage } from "../pages/BuildListPage";
import { BuildDetailsPage } from "../pages/BuildDetailsPage";
import { setSettings } from "../actions/settings";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers";
import { createMemoryHistory } from "history";

import dataJson from "../dataForTests/buildList.json";
import moreBuilds from "../dataForTests/moreBuilds.json";
import newBuild from "../dataForTests/newBuild.json";
import settings from "../dataForTests/settings.json";

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

it("если добавить билд он появится на экране  в списке билдов", async () => {
    await store.dispatch(setSettings({ ...settings.data, error: null }));
    fetchMock(200, JSON.stringify(dataJson));

    const application = (
        <Provider store={store}>
            <BrowserRouter>
                <BuildListPage />
            </BrowserRouter>
        </Provider>
    );

    const { getByTestId } = render(application);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    events.click(getByTestId("build-popup"));
    const commitHash = "3a83100f74cf120c96f62b0bc086e0e1acc64e9b";
    events.type(getByTestId("build-input"), commitHash);

    fetchMock(200, JSON.stringify(newBuild));
    events.click(getByTestId("build-done"));
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const list = within(getByTestId("build-list")).getAllByTestId("build-commitHash");

    expect(list.map((item) => item.textContent)).toContain(commitHash.slice(0, 7));
    screen.logTestingPlaygroundURL();
});

it("если нажать кнопку Show More добавятся билды", async () => {
    await store.dispatch(setSettings({ ...settings.data, error: null }));
    fetchMock(200, JSON.stringify(dataJson));

    const application = (
        <Provider store={store}>
            <BrowserRouter>
                <BuildListPage />
            </BrowserRouter>
        </Provider>
    );

    const { getByTestId } = render(application);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    fetchMock(200, JSON.stringify(moreBuilds));
    const stateBuilds = store.getState().builds;
    const commitHash = moreBuilds.data[0].commitHash;
    events.click(getByTestId("build-show"));
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const list = within(getByTestId("build-list")).getAllByTestId("build-commitHash");
    const expectLength = [...stateBuilds.data, ...moreBuilds.data].length;
    expect(list.map((item) => item.textContent)).toContain(commitHash.slice(0, 7));
    expect(list.length).toEqual(expectLength);
    screen.logTestingPlaygroundURL();
});

it("если кликнуть на билд в списке откроется детальная страница этого билда", async () => {
    await store.dispatch(setSettings({ ...settings.data, error: null }));
    const history = createMemoryHistory({
        initialEntries: ["/"],
        initialIndex: 0,
    });
    fetchMock(200, JSON.stringify(dataJson));

    const application = (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" render={() => <BuildListPage />} />
                    <Route path="/build/:buildId" render={() => <BuildDetailsPage />} />
                </Switch>
            </Router>
        </Provider>
    );

    const { getByTestId } = render(application);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const getBuildById = { data: { ...dataJson.data[0] } };
    fetchMock(200, JSON.stringify(getBuildById));
    events.click(getByTestId("build-link"));
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const buildById = getByTestId("build-commitHash");
    const commitHashById = dataJson.data[0].commitHash;
    expect(buildById.textContent).toEqual(commitHashById.slice(0, 7));
    screen.logTestingPlaygroundURL();
});
