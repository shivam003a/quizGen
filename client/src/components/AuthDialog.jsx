import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import signUpImage from '../assets/signup.jpg'
import loginImage from '../assets/login.jpg'
import { MdLockPerson } from "react-icons/md";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";


const AuthDialog = ({ isOpen, onClose, header, footer, type }) => {

    const navigate = useNavigate()

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div className="bg-white shadow-sm w-full sm:w-148 relative animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                {
                    header && <div className="flex justify-between items-center bg-cs-dark-blue px-2 py-3">
                        <span className="text-lg font-montserrat text-white">{header}</span>
                        <button
                            className="text-gray-600 hover:text-gray-900"
                            onClick={onClose}
                        >
                            <span className="font-montserrat font-semibold text-white text-2xl cursor-pointer">×</span>
                        </button>
                    </div>
                }

                {/* ///////////////////////////////////////////////////////////////////////////////////////////// */}
                {/* Body */}
                {type === 'auth' ? (
                    <div className="bg-blue-100 flex items-center justify-center">
                        <div className="flex-1/2 flex items-center justify-center relative overflow-hidden">
                            <img src={signUpImage} className="bg-black/50 opacity-40" />
                            <div
                                className="absolute left-0 right-0 bottom-0 top-0 flex flex-col gap-2 items-center justify-center hover:bg-black/50 hover:text-white transition-all cursor-pointer"
                                onClick={() => navigate('/signup')}
                            >
                                <MdLockPerson size={64} />
                                <span className="font-leckerli text-4xl font-extrabold tracking-wider">SignUp</span>
                            </div>

                        </div>
                        <div className="w-[1px] h-full border"></div>
                        <div className="flex-1/2 flex items-center justify-center relative">
                            <img src={loginImage} className="bg-black/50 opacity-40" />
                            <div
                                className="absolute left-0 right-0 bottom-0 top-0 flex flex-col gap-2 items-center justify-center hover:bg-black/50 hover:text-white transition-all cursor-pointer"
                                onClick={() => navigate('/signin')}
                            >
                                <FaPersonWalkingArrowRight size={64} />
                                <span className="font-leckerli text-4xl font-extrabold tracking-wider">SignIn</span>
                            </div>
                        </div>
                    </div>
                ) : null}

                {type === "demo" ? (
                    <div className="w-full h-full overflow-hidden">
                        <iframe width="600" height="315" src="https://www.youtube.com/embed/ubpl78Px1p8?si=d6Gfg1bgQBWmUY4H" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                ) : null}
                {/* /////////////////////////////////////////////////////////////////////////////////////////// */}

                {/* Footer */}
                {
                    footer && <div>Footer</div>
                }
            </div>
        </div>
    );
};

export default AuthDialog;
