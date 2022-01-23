import { useState } from "react"
import { useSelector } from "react-redux";
import { sendMailApi } from "../api/nletter";
import { UseLoader } from "./hooks/useLoader";
import Inputs from "./inputs";

const SendMail = ({nlId}) => {

    const [fields, setFields] = useState({});
    const [files, setFiles] = useState();
    const [show, setShow] = useState(false);
    const {token} = useSelector(state => state.user);
    const {setLoader} = UseLoader();
    
    const handleChange = (e) => {
        setFields({...fields, [e.target.name]: e.target.value});
    }

    const handleClick = (e) => {
        setShow(!show);
        e && (e.target.nextElementSibling.nextElementSibling.disabled = !show);
    }

    const handleFiles = (e) => {
        setFiles(e.target.files);
    }

    const inputCreator = (name,area) => (
        <Inputs key={name} name={name} value={fields[name]} area={area} change={handleChange} />
    )

    const save = async(e) => {
        e.preventDefault();
        setLoader(true);
        const fieldsWithId = {...fields, _id: nlId};
        const res = await sendMailApi(token, fieldsWithId, files);
        if(res){
            setLoader(false);
            alert("sended clean inputs...")
        };
    }

    const formSM = () => (
        <div className={`nl-form overlay ${show && 'show'}`}>
                <form onSubmit={save}>
                    {["subject", "title"].map(item => inputCreator(item))}
                    {inputCreator("text",true)}
                    <label>
                        <Inputs name="files" change={handleFiles} multiple={true} type="file" />
                        <div className="files">
                            {!files ? "drop files here" : [].map.call(files, f => <>{f.name}<br /></>)}
                        </div>
                    </label>                   
                    <button type="submit" className="btn btn-primary">Send</button>
                </form>
            </div>
    )
    return(
        <>
           {formSM()} 
           {nlId && <button onClick={handleClick}  className={`btn btn-primary fa fa-${show ? "times" : "envelope"}`}></button>}
        </>
    )
}
export default SendMail;