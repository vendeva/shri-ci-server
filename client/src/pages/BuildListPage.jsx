import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { BuildList } from "../components/BuildList";
import { Popup } from "../components/Popup.jsx";
import { getIsPopupActive } from "../reducers/interactive";
import { getSettings } from "../reducers/settings";
import { getBuilds } from "../reducers/builds";
import { getFetchBuilds } from "../actions/builds";
import { toggle } from "../actions/interactive";
import constants from "../constants/constants";

export const BuildListPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const test = searchParams.get("enable_exp");
        const testQuery = test ? { test } : {};
        dispatch(getFetchBuilds({ limit: constants.ADD_LIMIT, ...testQuery }));
    }, [dispatch]);
    const data = useSelector(getBuilds);
    const isPopupActive = useSelector(getIsPopupActive);

    let { repoName } = useSelector(getSettings);
    repoName = repoName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "");

    return (
        <>
            <Header
                classHeader="buildList"
                text={constants.RUN_BUILD}
                title={data[0] && `${data[0].authorName}/${repoName}`}
                clickButton={() => dispatch(toggle(true))}
                dataRunBuild="build-popup"
            />
            <div className="container" data-testid="build-list">
                <BuildList data={data} />
            </div>
            {isPopupActive && <Popup />}
        </>
    );
};
