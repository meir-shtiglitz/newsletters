import { useEffect, useState } from "react";
import { getAllNletters } from "../api/nletter";
import Nletter from "./nletter";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./loader";
import NumbersTalk from "./numbersTalk";
import NlCarousel from "./nlCarousel";
import About from "./about";
import "../css/allNletters.css";


const AllNletters = ({fromUser}) => {
    const [nletters, setNletters] = useState();
    const {user} = useSelector(state => state.user);
    const userID = fromUser && user && user._id;

    useEffect(() => {
        const loadNl = async() =>{
            const allNl = await getAllNletters(userID);
            setNletters([...allNl]);
        }
        loadNl();
    },[userID])
    return(
        !nletters ? <Loader /> :
        <>
                {!fromUser ? 
                    <>
            <div className="container">
                        <div className="popular-crousel nl-list "><NlCarousel nletters={nletters} /></div> 
            </div>
                        <div id="about">
                            <div className="container">
                                <About />
                                <NumbersTalk nletters={nletters} />
                            </div>
                        </div>
                    </>
                : <div className="container admin-list">
                    <div><Link className="add-nl btn btn-primary" to="/add/newsletter">create new</Link></div>
                    {nletters.map((nl, index) => <Nletter key={index} nl={nl} isAdmin={true} />)}
                </div>}                        
        </>
    )
}

export default AllNletters;