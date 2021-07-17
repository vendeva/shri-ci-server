import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "../components/Header/Header";
import { BuildCard } from "../components/BuildCard/BuildCard";
import { Log } from "../components/Log/Log";
import * as constants from "../constants/constants";
import { addNewBuild, getFetchBuildById } from "../actions/builds";
import { getBuildDetail, getBuildError } from "../reducers/builds";
import { getSettings } from "../reducers/settings";

export const BuildDetailsPage = () => {
    const { buildId } = useParams<{ buildId: string }>();
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: constants.DETAIL_BUILD,
            payload: {},
        });

        dispatch(getFetchBuildById(buildId));
    }, [dispatch, buildId]);

    const data = useSelector(getBuildDetail);
    const error = useSelector(getBuildError);

    let { repoName } = useSelector(getSettings);
    repoName = repoName!
        .split("/")
        .reverse()[0]
        .replace(/\.\w+$/, "");

    return (
        <>
            {data && (
                <>
                    <Header
                        classHeader="buildDetail"
                        text={constants.constants.REBUILD}
                        title={`${data.authorName}/${repoName}`}
                        clickButton={() => dispatch(addNewBuild(data.commitHash, history))}
                    />
                    <div className="container">
                        <BuildCard data={data} key={buildId} />
                        {data.log ? (
                            <Log log={data.log} />
                        ) : (
                            !error && (
                                <div className="loading">
                                    <div className="loading__icon"></div>
                                </div>
                            )
                        )}
                    </div>
                </>
            )}
        </>
    );
};
