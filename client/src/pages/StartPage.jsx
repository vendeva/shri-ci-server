import { Header } from "../components/Header";
import { Start } from "../components/Start";
import constants from "../constants/constants";

export const StartPage = () => {
    return (
        <>
            <Header
                classHeader="startPage"
                title={constants.SITE_NAME}
                text={constants.TO_SETTINGS}
            />
            <div className="container">
                <Start />
            </div>
        </>
    );
};
