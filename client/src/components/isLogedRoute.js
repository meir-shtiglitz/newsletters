import { useSelector } from "react-redux"
import { Route } from "react-router-dom";
import SignInOrUp from "./signInOrUp";
const IsLogedRoute = ({...props}) => {
    const {user} = useSelector(state => state);

    return(
        <> 
            {user && user.isAuthenticated ? <Route {...props} /> : <SignInOrUp />}
        </>
    )
}
export default IsLogedRoute;