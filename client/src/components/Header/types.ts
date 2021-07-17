export interface HeaderProps {
    classHeader: string;
    title: string;
    text?: string;
    clickButton?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    dataRunBuild?: string;
}
