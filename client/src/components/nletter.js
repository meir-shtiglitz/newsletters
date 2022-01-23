import { Link } from "react-router-dom"
import { UploadUrl } from '../uploadUrl';

const Nletter = ({nl, isAdmin}) => {
    return(
        <Link to={`/newsletter/${nl._id}`} className={`${isAdmin ? 'admin-nl' : 'car-nl' }`}>
                <img src={UploadUrl+"/images/"+nl.logo} alt="" />
                <h1>{nl.title}</h1>
                {/* <h4>{nl.name}</h4> */}
                {isAdmin && <h5>members: {nl.emails.length}</h5>}
        </Link>
    )
}

export default Nletter;