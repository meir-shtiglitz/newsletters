// thing's to fix
// if the url is'nt add or an id line 22
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getNletter } from "../api/nletter";
import { UploadUrl } from "../uploadUrl";
import AddEmail from "./addEmail";
import NlDelete from "./nlDelete";
import NlEdit from "./nlEdit";
import SendMail from "./sendMail";
import "../css/nletter.css";
import Loader from "./loader";

const Newsletter = ({addNew}) => {
    const {user} = useSelector(state => state);
    const {nlId} = useParams();
    const [nletter, setNletter] = useState('');
    const history = useHistory();
    useEffect(()=>{
        const GetNl = async() => {
            if(addNew) return initNletter();
            const res = await getNletter(nlId);
            if(!res) return history.push("/404");
            setNletter({...res});
        }
        GetNl();
    },[addNew,history,nlId])

    const initNletter = () => {
        setNletter({
            name: 'newsletter name',
            title: 'write Here your title',
            description: 'write here your description...',
            invitation: 'come join the team... write here your Invitation... ',
            logo: 'initLogo.png',
            classStyle: 'classic'
        })
    }
    const isAdmin = () =>(!nletter.parent || (user.user && nletter.parent === user.user._id))
    
    return(
        !nletter ? <Loader /> :
        <>
            <div className={`wrap ${nletter.classStyle}`}>
                {isAdmin() && <div className="admin-tools">
                    <SendMail nlId={nletter._id} />
                    <NlEdit setNletter={setNletter} nletter={nletter} />
                    <NlDelete token={user.token} nlId={nletter._id} /> 
                </div>}
                <div className="nletter-section">
                    <div className="icon-letter"><p className="icon-back"><i className="fa fa-envelope"></i></p></div>
                    <div className={`nl-text ${isAdmin() && 'admin'}`}>
                        <h1 className="nl-title">{nletter.title}</h1>
                        <p className="nl-description">{nletter.description}</p>
                        <AddEmail nlId={nlId} />
                        <h3 className="nl-invite">{nletter.invitation}</h3>
                        <img alt="logo" src={`${UploadUrl}/images/${nletter.logo}`} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Newsletter;