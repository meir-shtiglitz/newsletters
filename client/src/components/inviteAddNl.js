import {Link} from "react-router-dom";
import backImg from "../assets/images/invite_back.jpg";
import "../css/invite.css";
const InviteAddNl = () => {
    
    return(
        <div id="invite" className="invite">
            <img alt="" src={backImg} />
            <div className="back-invite"></div>
            <div className="text">
                <h1>create your newsletter in two minute</h1>
                <Link className="btn btn-primary" to="/add/newsletter">lets go</Link>
            </div>
        </div>
    )
}
export default InviteAddNl;