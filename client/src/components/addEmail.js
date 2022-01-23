import React, {useState } from "react";
import { toast } from "react-toastify";
import { addMailToDb } from "../api/nletter";
import { validMail } from "../validations/user";

const AddEmail = ({nlId}) => {
   
    const [email, setEmail] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!nlId) return;
        const {error} = validMail({email});
        if(error) return toast.error("please enter a valid email address");
        const status = await addMailToDb(nlId,email);
        if(status) toast.success("email address is registered successfuly");
        setEmail('');
    }

    return(
        <>
            <form className="add-form d-flex justify-content-center" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        <input autoFocus onChange={(e)=> setEmail(e.target.value)} value={email} className="form-control" />
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">join me</button>
            </form>
        </>
    )
}

export default AddEmail;