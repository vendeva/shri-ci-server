import { useHistory } from "react-router-dom";

export interface Form extends React.FormEvent<HTMLFormElement> {
    target: any;
}

export type History = ReturnType<typeof useHistory>;

export interface queryParams {
    limit?: number;
    offset?: number;
    start?: string;
    test?: string;
}

export interface settingsData {
    repoName: string | null;
    buildCommand: string | null;
    mainBranch?: string;
    period?: number;
}
