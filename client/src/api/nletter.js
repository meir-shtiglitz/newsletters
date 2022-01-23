import axios from "axios";
import { ApiUrl } from "../apiUrl";
import { UploadUrl } from "../uploadUrl";

// get the all newsletters
export const getAllNletters = async(fromUser="all") => {

    let result = await axios.get(`${ApiUrl}/nletters/all/${fromUser}`,
    {headers:{
        "Content-Type": "application/json",
    }});
    return result.data;
}

export const addMailToDb = async(listId, email) => {
    let result = await axios.post(`${ApiUrl}/nletter/mails/add`,{listId,email},{headers:{"Content-Type": "application/json"}});
    return result.data;
}

export const addNletter = async(token, nletter) => {
    let result = await axios.post(`${ApiUrl}/nletter/add`,{...nletter},
    {headers:{
        "Content-Type": "application/json",
        "authorization": token
    }});
    return result.data;
}

export const updateNletter = async(token, nletter) => {
    let result = await axios.put(`${ApiUrl}/nletter/update`,{...nletter},
    {headers:{
        "Content-Type": "application/json",
        "authorization": token
    }});
    return result.data;
}

export const deleteNletter = async(token, nlId, img) => {
    const data = {_id:nlId};
    let result = await axios.delete(`${ApiUrl}/nletter/delete`,{data,
    headers:{
        "Content-Type": "application/json",
        "authorization": token
    }});

    return result.data;
}

export const getNletter = async(nLId) => {
    try{
        let result = await axios.get(`${ApiUrl}/nletter/get/${nLId}`,
        {headers:{
            "Content-Type": "application/json",
        }});
        return result.data;
    } catch(err){
        return null
    }
}

export const sendMailApi = async(token, mail, files) => {
    const {_id, subject, title, text} = mail;
    let fd = new FormData();
    if(files){
        for(let num = 0; num < files.length; num++){
            fd.append("files", files[num]);
        }
    }
    fd.append("_id",_id);
    fd.append("subject",subject);
    fd.append("title",title);
    fd.append("text",text);
    let result = await axios.post(`${ApiUrl}/nletter/sendmail`, fd,
    {headers:{
        "Content-Type": "multipart/form-data",
        "authorization": token
    }});
    return result.data;
}

export const sendLogo = async(logo,name) => {
    let fd = new FormData();
    fd.append("file", logo);
    fd.append("name", name);
    let result = await axios.post(`${UploadUrl}/`,fd,
    {headers:{
        "Content-Type": "multipart/form-data"
    }});
    return result.data;
}
