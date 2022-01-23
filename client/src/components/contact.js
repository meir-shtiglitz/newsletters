import Inputs from "./inputs";
import {useState} from "react";
import {sendMailContact} from "../api/contact";
import { useSlideOnScroll } from "./hooks/useSlide";
import "../css/contact.css";
import contactBack from "../assets/images/contact_back.jpg";
import {UseLoader} from "./hooks/useLoader";

const Contact = () => {
    const {slideRef} = useSlideOnScroll();
    const [fields, setFields] = useState({});
    const {setLoader} = UseLoader();

    const handleChange = (e) => {
        setFields({...fields, [e.target.name]:e.target.value});
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoader(true);
        await sendMailContact(fields,setFields);
        setFields({from:'',msg:''});
        setLoader(false);
        
    }
    return(
        <div className="wrap-contact">
            <img src={contactBack} alt="" />
            <div className="container">
                <h1>Contact Us</h1>
                <div ref={slideRef} id="contact" className="text-center">
                    <div className="social-contact slide-top">
                        <div className="social-phone"><a href="tel:+972555538958"><i className="fa fa-phone"></i><span> +972-5555-38-958</span></a></div>
                        <div className="social-email"><a href="mailto:m.stigel@gmail.com"><i className="fa fa-envelope"></i><span> contact@newsletters.com</span></a></div>
                        <div className="social-whatsapp"><a href='https://api.whatsapp.com/send?phone=0555538958'><i className="fa fa-whatsapp"></i><span> send us a whatsapp massege</span></a></div>
                        <div className="social-facebook"> <a href={`https://facebook.com/ori-itzhak`}><i className="fa fa-facebook"></i> <span> visit us at facebook</span></a></div>
                    </div>
                    <form className="slide-top" onSubmit={handleSubmit}>
                        <Inputs name="from" value={fields.from} label="your email address" change={handleChange} />
                        <Inputs name="msg" value={fields.msg} label="your masseege" area={true} change={handleChange} />
                        <button className="btn btn-primary">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Contact;