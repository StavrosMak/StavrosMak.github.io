import React, { useState, useEffect, useContext } from "react"
import { motion } from "framer-motion";
import { Link } from "react-router-dom"
import NavbarItems from '../data/Links.json'
import Modal from "../Modal/Modal"
import logo from '../../Images/logo3.png'
import CartContext from "../../Context/CartContext";
import "../style.css"
import "./Navbar.css"


export default function Navbar() {

    const { cartLength, toggleCart } = useContext(CartContext);

    const [openModal, setModal] = useState(false)
    const [navbarIcon, setNavbarIcon] = React.useState("fas fa-bars") //Initialize menu icon
    const [menuOpen, setMenuOpen] = React.useState(false) //Init state -> closed
    const [animateCart, setAnimateCart] = useState(false); //Init state -> not animating


    function handleNavbar() {
        setNavbarIcon(prevIcon => prevIcon === "fas fa-bars" ? "fas fa-times" : "fas fa-bars");
        setMenuOpen(prevOpen => !prevOpen) // toggle the menu open/closed
    }

    useEffect(() => {
        if (cartLength > 0) {
            setAnimateCart(true);
            const timer = setTimeout(() => setAnimateCart(false), 200);
            return () => clearTimeout(timer);
        }
    }, [cartLength])

    return (
        <nav className="Navbar">
            <div className="NavbarItems">
                <div className="NavbarSiteBrand"><Link to="/"><img src={logo} alt="logoImg" /></Link></div>
                <div className="menu-icon"><i className={navbarIcon} onClick={handleNavbar}></i></div>
                <div className="NavbarLinks">
                    <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
                        {NavbarItems.map((item, index) => {
                            return (
                                <li key={index} className={`${item.cName}`}>
                                    <Link to={item.url} className="linkItem" onClick={() => { handleNavbar(); }} >{item.title}</Link>
                                </li>

                            )
                        })}
                        <li className="mobile-actions">
                            <button aria-label="ProfileActions" onClick={() => { setModal(true); }}>Sign Up</button>
                            <Modal open={openModal} onClose={() => setModal(false)} />
                            <button onClick={toggleCart}>Cart<span className="cartLength">({cartLength})</span></button>
                        </li>

                    </ul>

                </div>
                <div className="NavbarActions">
                    <div className="singUpIconSection">
                        <button aria-label="ProfileActions" onClick={() => setModal(true)}><i className="fa-solid fa-user"></i></button>
                    </div>
                    <Modal open={openModal} onClose={() => setModal(false)} />
                    <motion.div animate={animateCart ? { scale: [1, 1.2, 1], transition: { duration: 0.2 } } : {}} className="cartIconSection">
                        <button onClick={toggleCart}>
                            <i className="fa-solid fa-cart-shopping">

                            </i>
                        </button>
                        <span className="cartLength">
                            <small>( {cartLength} )</small>
                        </span>

                    </motion.div >
                </div>
            </div>
        </nav>
    )

}