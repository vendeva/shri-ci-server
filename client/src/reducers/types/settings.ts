import * as constants from "../../constants/constants";

// State
export interface SettingsState {
    repoName: string | null;
    buildCommand: string | null;
    mainBranch: string | null;
    period: number | null;
    error?: string | null;
}

// Actions

export interface SettingsPayload {
    repoName?: string | "";
    buildCommand?: string | "";
    mainBranch?: string | "";
    period?: number | null;
    error?: string | null;
}

interface ISETTINGS {
    type: typeof constants.SETTINGS;
    payload: SettingsPayload;
}

export type SettingsAction = ISETTINGS;
