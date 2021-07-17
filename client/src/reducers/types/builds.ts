import * as constants from "../../constants/constants";
import { BuildModel } from "../../common/api";

export interface BuildDetail extends BuildModel {
    log?: string | null;
}

export interface Error {
    error: string | null;
}

// State
export interface BuildsState {
    data: BuildModel[] | [];
    detail: BuildDetail | null;
    error: string | null;
}

// Actions
interface IBUILDS {
    type: typeof constants.BUILDS;
    payload: BuildModel[];
}

interface IMORE_BUILDS {
    type: typeof constants.MORE_BUILDS;
    payload: BuildModel[];
}

interface INEW_BUILD {
    type: typeof constants.NEW_BUILD;
    payload: BuildModel;
}

interface IDETAIL_BUILD {
    type: typeof constants.DETAIL_BUILD;
    payload: BuildModel;
}

interface IDETAIL_LOG {
    type: typeof constants.DETAIL_LOG;
    payload: string;
}

interface IERROR_BUILD {
    type: typeof constants.ERROR_BUILD;
    payload: Error;
}

export type BuildsAction =
    | IBUILDS
    | IMORE_BUILDS
    | INEW_BUILD
    | IDETAIL_BUILD
    | IDETAIL_LOG
    | IERROR_BUILD;
