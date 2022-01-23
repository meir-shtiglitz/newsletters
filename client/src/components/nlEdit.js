import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNletter, sendLogo, updateNletter } from "../api/nletter";
import { UploadUrl } from "../uploadUrl";
import Inputs from "./inputs";
import { UseLoader } from "./hooks/useLoader";

const NlEdit = ({nletter, setNletter}) => {

    const [show, setShow] = useState(false);
    const [fields, setFields] = useState({...nletter});
    const [logo, setLogo] = useState('');
    const {token} = useSelector(state => state.user);
    const {setLoader} = UseLoader();
    useEffect(()=>{
        setFields({...nletter})
    },[nletter]);
    
    const history = useHistory();

    const handleClick = (e) => {
        setShow(!show);
        e && (e.target.previousElementSibling.previousElementSibling.disabled = !show);
    }

    const handleChange = (e) => {
        setFields({...fields, [e.target.name]: e.target.value});
    }

    const handleLogo = (e) => {
        const logo = e.target.files[0];
        const isImage = (file) => file['type'].includes('image');
        if(!isImage(logo)) return alert('please check a legal image file');
        setLogo(logo);
        setFields({...fields, logo:URL.createObjectURL(logo)});  
    }

    const save = async(e) => {
        e.preventDefault();
        setLoader(true);
        const fieldsWithLogo = {...fields};
        if(logo){
            const urlLogo = new Date().getTime()+'.'+logo.name.split('.')[1];
            fieldsWithLogo.logo = urlLogo;
            await sendLogo(logo,urlLogo);
        } else{
            if(!fieldsWithLogo.logo) fieldsWithLogo.logo="logo.png";
        }
        
        const res = nletter._id ? await updateNletter(token, fieldsWithLogo, logo) : await addNletter(token, fieldsWithLogo, logo);
        setNletter({...res});
        setFields({...res});
        handleClick();
        setLoader(false);
        history.push(`/newsletter/${res._id}`);
    }
    const inputCreator = (name,area) => (
        <Inputs key={name} name={name} value={fields[name]} area={area} change={handleChange} />
    )

    const formNl = () => (
        <div className={`nl-form overlay  ${show && "show"}` }>
                <form onSubmit={save}>
                    {["name", "title", "invitation"].map(item => inputCreator(item))}
                    {inputCreator("description",true)} 
                    <div className="row">                   
                        <div className="col-6 form-group">
                            <label>Logo image:
                                <input name="logo" type="file" onChange={(e)=>handleLogo(e)}  className="form-control" />
                                <div><img width="50px" alt="logo" src={(fields.logo && fields.logo.includes("blob")) ? fields.logo : `${UploadUrl}/images/${fields.logo}`} /></div>
                            </label>
                        </div>
                        <div className="col-6 form-group">
                            <label>Style:
                                <select onChange={handleChange} value={fields.classStyle} className="form-control" name="classStyle">
                                    {["classic", "gold", "diamond"].map(cstyle => <option key={cstyle} value={cstyle}>{cstyle}</option>)}
                                </select>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">{nletter._id ? "Update" : "Add"}</button>
                </form>
            </div>
    )
    return(
        <>
            {formNl()}
            <button onClick={handleClick} className={`btn btn-secondary fa fa-${show ? "times" : "pencil"}`}></button>
        </>
    )
}

export default NlEdit;