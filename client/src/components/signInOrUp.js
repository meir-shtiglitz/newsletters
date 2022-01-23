import { useState } from "react"
import Login from "./login"
import Register from "./register"
import "../css/overlay.css";
import ForgotPassword from "./forgotPassword";
const SignInOrUp = () => {

    const [slide, setSlide] = useState(false)
    const [forgot, setForgot] = useState(false)

    const loginText = () => (
        <div className="login-text">
            <h1>welcome back</h1>
            <p>please enter your personal info</p>
            <button onClick={()=>{setSlide(true); setForgot(false)}}>Sign Up</button>
        </div>
    )
    const registerText = () => (
        <div className="registerText">
            <h1>Hello dear friend</h1>
            <p>please enter your personal details</p>
            <button onClick={()=>setSlide(false)}>Sign In</button>
        </div>
    )
    return(
        <div className={`container ${slide && "right-panel-active"}`} id="container">
                <div className={`login overlay ${!forgot && "show"}`}><Login setForgot={setForgot} /></div>
                <div className={`forgot overlay ${forgot && "show"}`}><ForgotPassword /></div>
                
                
                <Register />
                <button className="phone toSign" onClick={()=>{setSlide(preSlide => !preSlide); setForgot(false)}}>{slide ? 'Sign In' : 'Sign Up'}</button>
                <div className="over-container">
                    <div className="over">
                        <div className="over-panel over-left">{registerText()}</div>
                        <div className="over-panel over-right">{loginText()}</div>
                    </div>
                </div>
            </div>
    )
}
export default SignInOrUp;