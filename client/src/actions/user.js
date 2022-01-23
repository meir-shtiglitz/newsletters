import axios from "axios";
import {toast} from "react-toastify";
import {signinValid, signupValid, validPassword} from "../validations/user";
import {ApiUrl} from "../apiUrl";

export const signup = data => async dispatch => {
    const {error} = signupValid(data);
    if(error){
        dispatch({
            type: "REGISTER_FAIL",
        })
        return toast.error(error.details[0].message);
    } else{

        try{
            const headers = {"Content-Type": "application/json"}
            const user = await axios.post(`${ApiUrl}/user/signup`, data, headers);
                dispatch({
                    type: "REGISTER_SUCCESS",
                    payload: user.data
                })
        } catch(err){
                toast.error(err.response.data.error);
                dispatch({
                    type: "REGISTER_FAIL",
                })
        }
    }
}

export const signin = data => async dispatch => {
    const {error} = signinValid(data);
    if(error){
        dispatch({
            type: "LOGIN_FAIL",
        })
        return toast.error(error.details[0].message);
    } else{

        
        try{
            const headers = {"Content-Type": "application/json"}
            const user = await axios.post(`${ApiUrl}/user/signin`, data, headers);
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: user.data
            })
        } catch(err){
            toast.error("details is not match");
            dispatch({
                type: "LOGIN_FAIL",
            })
        }
    }
}


export const signByToken = data => async dispatch => {
        
        try{
            const headers = {
                "Content-Type":"application/json"
            }
            const user = await axios.post(`${ApiUrl}/user/signbytoken`, data, headers);
            dispatch({
                type: "LOGIN_BY_TOKEN",
                payload: user.data
            })
        } catch(err){
            dispatch({
                type: "LOGIN_BY_TOKEN_FAIL",
            })
        }
}

export const newPassword = data => async dispatch => {
    const {error} = validPassword({password:data.password});
    if (error){
        return toast.error(error.details[0].message);
    }else{
        try{
            const setData = {
                email: data.email,
                password: data.password
            }
            const headers = {"Content-Type": "application/json"}
        
            const user = await axios.post(`${ApiUrl}/user/profile/update`, setData, {headers});
            dispatch({
                type: "NEW_PASSWORD",
                payload: user.data
            })
        } catch(err){
            dispatch({
                type: "NEW_PASSWORD_FAIL",
            })
        }
    }
}

export const SignOut = data => dispatch => {
    dispatch({
        type: "LOG_OUT"
    })
}




export const setLoaderAction = status => dispatch =>{
    dispatch({
        type: "SET_LOADER",
        payload: status
    })
}
