import axios from "axios";
import { ApiUrl } from "../apiUrl";
import {validMail} from "../validations/user";
import {toast} from "react-toastify";


export const sendMailContact = async({from, msg}) => {
    const data = {from,msg};
    const {error} = validMail({email:from});
    if(error) return toast.error("email address is not valid");
    let result = await axios.post(`${ApiUrl}/contact/sendmail`, data,
    {headers:{
        "Content-Type": "application/json",
    }});
    toast.success("message sended successfuly");
    return result.data;
}