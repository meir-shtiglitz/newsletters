import axios from "axios";
import {useState} from "react";
import { toast } from "react-toastify";
import {ApiUrl} from "../apiUrl";
import { validMail } from "../validations/user";
import Inputs from "./inputs";

const ForgotSetMail = ({numsValid, mailSet}) => {

    const [email, setEmail] = useState();

    const send = async(e) => {
        e.preventDefault();
        const {error} = validMail({email});
        if (error) return toast.error("email address is not valid")
        const data = {
            email: email,
            numsValid: numsValid
        }
        const headers = {
            "Content-type": "application/json"
        }
        const sending = await axios.post(`${ApiUrl}/user/forgot/validmail`, data, {headers});
        if(sending) mailSet(email);
    }

    const formSendMail = () => (
        <form onSubmit={send}>
                <h1>Forgot password</h1>
                <Inputs name="email" type="email" autoFocus={true} value={email} change={(e)=> setEmail(e.target.value)} />
            <button type="submit" className="btn btn-primary">Send</button>
        </form>
    )

    return(
        formSendMail()
    )
}

export default ForgotSetMail;