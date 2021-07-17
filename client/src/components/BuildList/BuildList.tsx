import { FC } from "react";
import { BuildCard } from "../BuildCard/BuildCard";
import { Button } from "../Button/Button";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFetchBuilds } from "../../actions/builds";
import { getIsShowEnd } from "../../reducers/interactive";
import { BuildListProps } from "./types";
import { constants } from "../../constants/constants";

export const BuildList: FC<BuildListProps> = (params) => {
    const { data } = params;
    const dispatch = useDispatch();
    const isShowEnd = useSelector(getIsShowEnd);
    const handleShowMore = useCallback(
        () => dispatch(getFetchBuilds({ limit: constants.ADD_LIMIT, offset: data.length }, true)),
        [dispatch, data.length]
    );

    return (
        <>
            {data.map((item, i) => (
                <BuildCard
                    link={`/build/${item.id}`}
                    data={item}
                    key={item.id}
                    data_testid={!i && "build-link"}
                />
            ))}
            <Button
                text="Show more"
                view="cancel"
                click={handleShowMore}
                elementClass={`container__show ${isShowEnd ? "button_none" : ""}`}
                data_testid="build-show"
            />
        </>
    );
};

export default BuildList;
