import { useState } from "react";
import CountRun from "./countRun"
import "../css/numberTalk.css";
import { useSlideOnScroll } from "./hooks/useSlide";
const NumbersTalk = ({nletters}) => {
    const [isScroll, setIsScroll] = useState(false);
    const {slideRef} = useSlideOnScroll(setIsScroll);

    const getUsers = () => {
        let users = [];
        nletters.forEach(n => !users.includes(n.parent) && users.push(n.parent));
        return users.length + 200;
    }

    const getMails = () => (nletters.reduce((sum, nl) => sum + nl.emails.length,0)+5200);

    return(
        <div ref={slideRef} >
        <div id="num-talk-wrap" className="mt-5 num-talk-wrap">
            <div className="num-talk">
                <CountRun go={isScroll} end={nletters.length + 250} />
                <h3>news letters</h3>
            </div>
            <div className="num-talk">
                <CountRun go={isScroll} end={getUsers()} />
                <h3>users</h3>
            </div>
            <div className="num-talk">
                <CountRun go={isScroll} end={getMails()} />
                <h3>Subscribers</h3>
            </div>
        </div>
        </div>
    )
}

export default NumbersTalk;