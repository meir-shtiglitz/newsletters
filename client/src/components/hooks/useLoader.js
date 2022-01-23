import {useDispatch} from "react-redux";
import {setLoaderAction} from "../../actions/user"

export const UseLoader = () => {
    const dispatch = useDispatch();

    const setLoader = (status) => {
        dispatch(setLoaderAction({status}))
    }

    return {setLoader}
}