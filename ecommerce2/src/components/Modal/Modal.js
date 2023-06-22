import { React, useState } from 'react';
import { motion } from 'framer-motion'
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm'
import './Modal.css';

export default function Modal({ open, onClose }) {

    let [authMode, setAuthMode] = useState("Sign In");
    const changeAuthMode = () => {
        setAuthMode(authMode === "Sign In" ? "Sign Up" : "Sign In");
    }

    let [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = (event) => {
        event.preventDefault();
        setIsLoggedIn(true);
        setAuthMode("Logged");
    }

    const modalAnimation = {
        initial: {opacity: 0,scale: 0.75,},
        animate: {opacity: 1,scale: 1,transition: {ease: "easeOut",duration: 0.15}},
        exit: {opacity: 0,scale: 0.75,transition: {ease: "easeIn",duration: 0.15}}
      };
      

    if (!open) return null;

    return (
        <div className='Modal'>
            <motion.div {...modalAnimation} className='ModalContent'>
                <div className='signInHeader'>
                    <h2>{authMode}</h2>
                    <button className="closeBtn" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                {isLoggedIn === false ? (
                    <>
                        {authMode === 'Sign In' ?
                            (<SignInForm changeAuthMode={changeAuthMode} handleLogin={handleLogin} />)
                            :
                            (<SignUpForm changeAuthMode={changeAuthMode} />)
                        }
                    </>
                ) : (
                    <>You already logged in.</>
                )}
            </motion.div>
        </div>
    )
}
