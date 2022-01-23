import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import {signup} from "../actions/user"
import {toast} from "react-toastify";
import Inputs from "./inputs";
import { UseLoader } from "./hooks/useLoader";

const Register = () => {
    const [fields, setFields] = useState({})
    const {name, email, password, confirm} = fields;
    const dispatch = useDispatch();
    const {setLoader} = UseLoader();


    const handleChange = (e) => {
        if(e.target.name === 'confirm'){
            e.target.value !== password ? (e.target.style.backgroundColor = '#ff000042'): (e.target.style.backgroundColor = 'transparent');
        }
        setFields({...fields, [e.target.name]: e.target.value});
    }

    const send = (e) => {
        e.preventDefault();
        if(password !== confirm) return toast.error('password and confirm are not match') 
        setLoader(true);
        dispatch(signup({name, email, password}));
    }

    const inputCreator = (name,type=name, label) => (
        <Inputs key={name} name={name} value={fields[name]} type={type} label={label} change={handleChange} />
    )

    const register_form = () => (
        <form onSubmit={send}>
            <h1>create account</h1>
            {["name","email","password"].map((item) => inputCreator(item))}
            {inputCreator("confirm","password","Confirm Password")}
            <button type="submit" className="btn btn-primary">Sign up</button>
        </form>
    )

    return(
            <div className="form-container sign-up-container">{register_form()}</div>
    )
}

export default Register