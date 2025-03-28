import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"

function LoginBanner(){

    const slideDetail = [
        {
            img:img1,
            title:"Streamline Your Lead Management Effortlessly",
            para:"Capture, track, and convert leads effortlessly."
        },
        {
            img:img2,
            title:"AI-Powered Conversation Summary",
            para:"Capture key interactions, track insights, and follow up seamlessly."
        },
        {
            img:img3,
            title:"Collaborate & Close Deals Faster",
            para:"Capture, track, and convert leads Boost team productivity"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slideDetail.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);


    return(
        <div className="loginbanner-container">
            <div className="login-banner-content">
                <motion.div
                    key={currentIndex}
                >
                    <motion.h1
                        className="text-xl lg:text-3xl font-semibold text-white lg:mt-4"
                        initial={{ opacity: 0, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.9 }}
                    >
                        {slideDetail[currentIndex].title}
                    </motion.h1>

                    <motion.p
                        className="text-3xl text-white mt-4 lg:mt-5"
                        initial={{ opacity: 0, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.9 }}
                    >
                        {slideDetail[currentIndex].para}
                    </motion.p>

                    <motion.img
                        src={slideDetail[currentIndex].img}
                        alt="image"
                        className="slideImage"
                        initial={{ opacity: 0, scale: 1, x:-40 }}
                        animate={{ opacity: 1, scale: 1, x:0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                    >
                    </motion.img>
                </motion.div>

                <div className="flex mt-4 space-x-1 z-9">
                    {slideDetail.map((dot, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-600 ${
                                currentIndex === index
                                ? "w-8 h-3 bg-white rounded-full" 
                                : "w-3 h-3 bg-gray-400 rounded-full" 
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LoginBanner;

