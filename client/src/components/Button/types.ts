export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    elementClass?: string;
    view: "cancel" | "action";
    text?: string;
    click?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    data_testid?: string;
}
