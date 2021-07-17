import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { StartPage } from "./pages/StartPage";
import { SettingsPage } from "./pages/SettingsPage";
import { BuildListPage } from "./pages/BuildListPage";
import { BuildDetailsPage } from "./pages/BuildDetailsPage";
import { Footer } from "./components/Footer";
import { getIsPopupActive, getIsLoadingApp } from "./reducers/interactive";
import { getSettings } from "./reducers/settings";
import { getFetchSettings } from "./actions/settings";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const test = searchParams.get("enable_exp");
        const start = searchParams.get("start");
        const testQuery = start ? { start } : test ? { test } : {};
        dispatch(getFetchSettings({ ...testQuery }));
    }, [dispatch]);
    const { repoName } = useSelector(getSettings);
    const isPopupActive = useSelector(getIsPopupActive);
    const isLoadingApp = useSelector(getIsLoadingApp);

    useEffect(() => {
        const root = document.getElementById("root");

        if (isPopupActive) {
            root!.classList.add("container_popup-active");
        } else {
            root!.classList.remove("container_popup-active");
        }
    }, [isPopupActive]);

    return (
        <>
            {!isLoadingApp ? (
                <div className="loading">
                    <div className="loading__icon"></div>
                </div>
            ) : (
                <BrowserRouter>
                    <div className="wrapper">
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => (repoName ? <BuildListPage /> : <StartPage />)}
                            />
                            <Route path="/build/:buildId" render={() => <BuildDetailsPage />} />
                            <Route path="/settings" render={() => <SettingsPage />} />
                        </Switch>
                    </div>
                    <Footer />
                </BrowserRouter>
            )}
        </>
    );
}

export default App;
