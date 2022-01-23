import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/images/logo.png"
import { useCloseMobileMenu } from "./hooks/closeMobileMenu";
import Logout from "./logout";
import "../css/nav.css";
import { UseNavScroller } from "./hooks/useNavScroller";

const Nav = ({...props}) => {
    const [show, setShow] = useState(false);
    const [showMobile, setShowMobile] = useState(false);
    const {user} = useSelector(state => state.user);
    const {toScroll} = UseNavScroller();
    const { innerBorderRef, oneMore } = useCloseMobileMenu(() => {setShowMobile(false); setShow(false)});

    const toggle_mob_menu = () => {
        setShowMobile(!showMobile);
    }

    const drop = () => {
        setShow(!show);
    }

    const logedornot = () => (
        !user ? <Link to="/account" className="fa fa-lock btn-login btn btn-primary-outline border border-dark mr-5">   Log in   </Link>
              : <div className="nav-item dropdown mr-5">
                    <span ref={oneMore} onClick={drop} className="nav-link dropdown-toggle" id="navbarDropdown">{user.name} Logged in </span>
                    <div className={`dropdown-menu ${show && "show"}`} aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/">edit profile</Link>
                        <Logout />
                    </div>
                </div>
    )

    const navItem = (path, text) => (
        <li className="nav-item">
            <NavLink onClick={toScroll} activeClassName="selected" exact to={path} className="nav-link">{text}</NavLink>
        </li>
    )
    
    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="logo"/>
                    </Link>
                    <button onClick={toggle_mob_menu} className="navbar-toggler" type="button">
                        <span ref={innerBorderRef} className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${showMobile && "show"}`} id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {navItem("/","Home")}
                            {navItem("/#about","About")}
                            {navItem("/nletter/my","My Newsletters")}
                            {navItem("/#contact","Contact")}
                        </ul>
                        <div className="text-start">{logedornot()}</div>
                    </div>
                </div>
            </nav>
        );
}
 
export default Nav;