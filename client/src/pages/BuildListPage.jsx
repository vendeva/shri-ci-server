import { Header } from "../components/Header";
import { BuildList } from "../components/BuildList";
import constants from "../constants/constants";

export const BuildListPage = () => {
    const repoName = "vendeva/yandex_task1";
    return (
        <>
            <Header classHeader="buildList" text={constants.RUN_BUILD} title={repoName} />
            <div className="container">
                <BuildList />
            </div>
        </>
    );
};
