import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import round from "../assets/round.png";

function LoginBanner() {
  const slideDetail = [
    {
      img: img1,
      title: "Streamline Your Lead Management Effortlessly",
      para: "Capture, track, and convert leads effortlessly.",
    },
    {
      img: img2,
      title: "AI-Powered Conversation Summary",
      para: "Capture key interactions, track insights, and follow up seamlessly.",
    },
    {
      img: img3,
      title: "Collaborate & Close Deals Faster",
      para: "Capture, track, and convert leads Boost team productivity",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideDetail.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="loginbanner-container w-[100vw] xl:w-[50vw] h-[70vh] md:h-[90vh] xl:h-[100vh] flex justify-center items-center bg-[#3c6e71] bg-no-repeat bg-[length:auto] bg-[-320px_255px]"
      style={{ backgroundImage: `url(${round})` }}
    >
      <div className="flex justify-center items-center">
        <motion.div
          key={currentIndex}
          className="h-[60vh] xl:h-[90vh] w-[86vw] xl:w-[45vw] border rounded-lg border-white px-6 py-6 bg-white/12 backdrop-blur-sm relative"
        >
          <motion.h1
            className="text-xl xl:text-4xl font-semibold text-white lg:mt-4"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.9 }}
          >
            {slideDetail[currentIndex].title}
          </motion.h1>

          <motion.h6
            className="text-md xl:text-xl text-white mt-4 xl:mt-5 leading-6 xl:leading-7 w-70 xl:w-90"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.9 }}
          >
            {slideDetail[currentIndex].para}
          </motion.h6>

          <motion.img
            src={slideDetail[currentIndex].img}
            alt="image"
            className="w-xl absolute bottom-0 right-0"
            initial={{ opacity: 0, scale: 1, x: -40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          ></motion.img>

          <div className="flex mt-4 space-x-1 z-9 absolute bottom-10">
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
        </motion.div>
      </div>
    </div>
  );
}

export default LoginBanner;
