import React, { useState } from "react";
import {signin} from "../actions/user"
import Inputs from "./inputs";
import { useDispatch } from 'react-redux';
import "../css/sign.css";
import {UseLoader} from "./hooks/useLoader";

const Login = ({setForgot}) => {

    const dispatch = useDispatch();
    const [fields, setFields] = useState({
        nameOrMail:     '',
        password: ''
    })
    const {setLoader} = UseLoader();
    const {nameOrMail, password} = fields;

    const handleChange = (e) => {
        setFields({...fields, [e.target.name]: e.target.value});
    }

    const send = (e) => {
        e.preventDefault();
        setLoader(true);
        dispatch(signin({nameOrMail, password}));
    }

    const login_form = () => (
        <form onSubmit={send}>
            <h1>sign in</h1>
            <Inputs name="nameOrMail" change={handleChange} label="Email" type="email" value={nameOrMail} />
            <Inputs name="password" change={handleChange} label="Password" type="password" value={password} />
            <button type="submit" className="btn btn-primary">Sign in</button>
            <span type="button" onClick={()=>setForgot(true)}>Forgot my password</span>
        </form>
    )

    return(
            <div className="form-container sign-in-container">
                {login_form()}
            </div>
    )
}

export default Login