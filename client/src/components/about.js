import "../css/about.css";
import aboutImg from "../assets/images/about.png";
import { useSlideOnScroll } from "./hooks/useSlide";
const About = () => {

    const { slideRef } = useSlideOnScroll();
    return (
        <div ref={slideRef} className="about-content">
            <h1>About Us</h1>
            <div className="about-text slide-left">
                <p>
                    Newsletters are one of the most powerful tools used by the
                    largest companies. They make you relevant and give you
                    high profile. It has never been easier to create your own
                    newsletter. Share your link and start sending your messages.
                </p>
            </div>
            <div className="about-img slide-right"><img src={aboutImg} alt="" /></div>
        </div>
    )
}
export default About;