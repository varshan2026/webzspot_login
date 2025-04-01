import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import round from "../assets/round.png";

function LoginForm() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [active, setactive] = useState("admin");
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideDetail.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slideDetail.length]);

  const passwordState = () => {
    setshowPassword(!showPassword);
  };

  const userAdmin = () => {
    setactive("admin");
  };

  const userStaff = () => {
    setactive("staff");
  };

  const userLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;

    if (!Email && !Password) {
      toast.error("Please enter valid email and password!", {
        autoClose: 1000,
      });
    } else if (!Email) {
      toast.error("Email is required!", { autoClose: 1000 });
    } else if (!emailRegex.test(Email)) {
      toast.error("Invalid email format!", { autoClose: 1000 });
    } else if (!Password) {
      toast.error("Password is required!", { autoClose: 1000 });
    } else if (!passwordRegex.test(Password)) {
      toast.error(
        "Password must be at least 8 characters & combination of (e.g.,Aa, 123 !, @, #, $, %, &)",
        { autoClose: 1000 }
      );
    } else {
      toast.success("Login Successful!", { autoClose: 1000 });
    }

    setEmail("");
    setPassword("");

    console.log([`Email: ${Email} password: ${Password}`]);
  };

  return (
    <div className="flex flex-wrap">
      <section
        className="w-[100vw] lg:w-[50vw] h-[68vh] lg:h-[100vh] flex justify-center items-center bg-[#3c6e71] bg-no-repeat bg-[length:auto] bg-[-320px_255px]"
        style={{ backgroundImage: `url(${round})` }}
      >
        <div className="flex justify-center items-center">
          <motion.div
            key={currentIndex}
            className="h-[60vh] lg:h-[90vh] w-[85vw] lg:w-[45vw] border rounded-lg border-white px-6 py-6 bg-white/12 backdrop-blur-sm relative"
          >
            <motion.h1
              className="text-lg lg:text-4xl font-semibold text-white lg:mt-4"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.9 }}
            >
              {slideDetail[currentIndex].title}
            </motion.h1>

            <motion.h6
              className="text-md lg:text-xl text-white mt-4 lg:mt-5 leading-6 lg:leading-7 w-70 lg:w-90"
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
              className="w-lg absolute bottom-0 right-0"
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
      </section>

      <section className="px-8 my-12 flex justify-center items-center w-[100vw] lg:w-[50vw]">
        <div className="flex flex-col gap-y-10">
          <header>
            <h1 className="text-4xl text-gray-800 font-semibold">
              Welcome Back!
            </h1>
            <p className="text-base text-gray-500 mt-3">
              Log in to streamline your sales process and close deals faster
            </p>
          </header>

          <div className="flex justify-between">
            <button
              className={`max-w-[220px] w-full font-medium border-b-1 border-gray-300 transition duration-400 ${
                active === "admin"
                  ? "text-white bg-[#3C6E71] rounded-t-lg"
                  : "text-[#666666]"
              } p-3 md:p-4 lg:p-5`}
              onClick={userAdmin}
            >
              Admin
            </button>

            <button
              className={`max-w-[220px] w-full font-medium border-b-1 rounded-t-lg border-gray-300 transition duration-400 ${
                active === "staff"
                  ? "text-white bg-[#3C6E71] rounded-t-lg"
                  : "text-[#666666]"
              } p-3 md:p-4 lg:p-5`}
              onClick={userStaff}
            >
              Staff
            </button>
          </div>

          <form
            className="flex flex-col gap-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="border border-[#e9e9e9] rounded-md flex flex-col px-5 py-3">
              <label className="text-[#666666]">Email</label>
              <input
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:outline-none mt-1"
                placeholder={
                  active === "admin" ? "admin@example.com" : "staff@example.com"
                }
              />
            </div>

            <div>
              <div className="border border-[#e9e9e9] rounded-md relative flex flex-col justify-center px-5 py-3">
                <label className="text-[#666666]">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:outline-none mt-1"
                  placeholder={
                    showPassword === true ? "Login@123" : "*********"
                  }
                />

                <button
                  className="absolute right-5 top-6 text-2xl cursor-pointer text-gray-500"
                  onClick={passwordState}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className="text-end text-[#4c4c4c] cursor-pointer mt-2">
                Forgot Password ?
              </p>
            </div>

            <div>
              <button
                className="px-4 py-3 text-white border rounded-md bg-black w-full cursor-pointer"
                onClick={userLogin}
              >
                Login
              </button>
              <ToastContainer />
              <p className="text-[#666666] mt-5">
                New User ?{" "}
                <span className="cursor-pointer text-[#3c6e71] font-medium">
                  Sign Up Now &#8594;
                </span>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default LoginForm;
