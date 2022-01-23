import "../css/about.css";
import aboutImg from "../assets/images/about.png";
import {useSlideOnScroll} from "./hooks/useSlide";
const About = () => {

    const {slideRef} = useSlideOnScroll();
    return(
        <div ref={slideRef} className="about-content">
            <h1>About Us</h1>
            <div className="about-text slide-left">
                <p> Newsletters are one of the most powerful tools used by the largest companies, it makes you relevant and always leaves you in ads, it has never been easier to create your newsletter Share your link and start sending your messages</p>
            </div>
            <div className="about-img slide-right"><img src={aboutImg} alt=""/></div>
        </div>
    )
}
export default About;