import { useDispatch } from "react-redux"
import { SignOut } from "../actions/user";

const Logout = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(SignOut());
    }

    return <button onClick={handleClick} className="dropdown-item">Log out</button>
}

export default Logout;