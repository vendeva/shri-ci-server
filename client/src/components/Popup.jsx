import { useDispatch } from "react-redux";
import { toggle } from "../actions/interactive";
import { Input } from "./Input";

export const Popup = () => {
    const componentName = "popup";
    const dispatch = useDispatch();
    return (
        <div className={componentName}>
            <form className="form">
                <div className="form__title">New build</div>
                <div className="form__subTitle">Enter the commit hash which you want to build.</div>
                <Input placeholder="Commit hash" required="required" pattern="\S+" />
                <div className="button">
                    <button className="button_action button_condition-yellow">Run build</button>
                    <button
                        className="button_cancel button_condition-grey"
                        onClick={() => dispatch(toggle(false))}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};
