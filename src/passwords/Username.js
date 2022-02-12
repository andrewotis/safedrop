import { useSelector } from "react-redux";
import { innerStars } from "./passwordUtils";

export default function Username({ userName, isHovering }) {
    const settings = useSelector(state => state.dropFile.data.settings);

    if(settings.maskUsername) {
        if(isHovering && settings.unmaskUsernameOnHover) {
            return userName;
        }
        return innerStars(userName, 1 );
    } else {
        return userName;
    }
}