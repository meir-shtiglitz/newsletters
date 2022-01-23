import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom";

const IsUnLogedRoute = ({...props}) => {
    const {user} = useSelector(state => state);

    return(
        <>
            {!user || !user.isAuthenticated ? <Route {...props} /> : <Redirect to="/" />}
        </>
    )
}
export default IsUnLogedRoute;