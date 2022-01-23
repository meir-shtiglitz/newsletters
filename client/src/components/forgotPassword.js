import {useState} from "react";
import ForgotConfirm from "./forgot_confirm";
import ForgotNewPassword from "./forgot_newPassword";
import ForgotSetMail from "./Forgot_setMail";

const ForgotPassword = () => {

    const generateNums = () => {
        const string = '1234567890';
        let nums = '';
        for(let count = 0; count < 6; count++){
            nums += string.indexOf(Math.floor( Math.random() * string.length ));
        }
        return nums;
    }
    const [confirmAcount, setConfirmAcount] = useState(false);
    const [numsValid] = useState(generateNums());
    const [email, setEmail] = useState(false);

    const updateEmail = (mail) => {
        setEmail(mail);
    }

    return(
        !email ?
            <ForgotSetMail mailSet={updateEmail} numsValid={numsValid} />
            :
            !confirmAcount ?    
                <ForgotConfirm numsValid={numsValid} confirmMail={setConfirmAcount} />
            :   <ForgotNewPassword email={email} />
    )
}

export default ForgotPassword;