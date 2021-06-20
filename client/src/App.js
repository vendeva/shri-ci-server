import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useEffect } from "react";

import { StartPage } from "./pages/StartPage.jsx";
import { SettingsPage } from "./pages/SettingsPage.jsx";
import { BuildListPage } from "./pages/BuildListPage.jsx";
import { BuildDetailsPage } from "./pages/BuildDetailsPage.jsx";
import { Footer } from "./components/Footer.jsx";
import { Popup } from "./components/Popup.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getIsPopupActive } from "./reducers/interactive";
import { setSettings } from "./actions/settings";
import settingsJson from "./data/settings.json";

function App() {
    const { data } = settingsJson;
    const dispatch = useDispatch();
    if (data && data.repoName) {
        const { repoName, buildCommand, mainBranch, period } = data;
        dispatch(setSettings({ repoName, buildCommand, mainBranch, period }));
    }
    const isPopupActive = useSelector(getIsPopupActive);
    useEffect(() => {
        const root = document.getElementById("root");
        if (isPopupActive) {
            root.classList.add("container_popup-active");
        } else {
            root.classList.remove("container_popup-active");
        }
    }, [isPopupActive]);

    return (
        <BrowserRouter>
            <div className="wrapper">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (data && data.repoName ? <BuildListPage /> : <StartPage />)}
                    />
                    <Route path="/build/:buildId" render={() => <BuildDetailsPage />} />
                    <Route path="/settings" render={() => <SettingsPage />} />
                </Switch>
            </div>
            <Footer />
            {isPopupActive && <Popup />}
        </BrowserRouter>
    );
}

export default App;
