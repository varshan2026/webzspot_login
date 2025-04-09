import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import round from "../assets/round.png";

function SignUpForm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [Step, setStep] = useState(1);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [businessName, setbusinessName] = useState("");
  const [businessType, setbusinessType] = useState("");
  const [url, setUrl] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [formErrors, setFormErrors] = useState({});
  const [isError, setisError] = useState(false);
  const progress = [1, 2, 3, 4];

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const validateStep = () => {
    const errors = {};

    if (Step === 1) {
      if (!Name.trim()) errors.Name = "Name is required";
      if (!emailRegex.test(Email)) errors.Email = "Invalid email address";
      if (!phoneRegex.test(Phone)) errors.Phone = "Phone number must be 10 digits";
      if (Password.length < 8) errors.Password = "Must be minimum 8 character";
      if (Password !== rePassword) {
        setisError(true);
      } else {
        setisError(false);
      }
    }

    if (Step === 2) {
      if (!businessName.trim())
        errors.businessName = "Business name is required";
      if (!businessType.trim())
        errors.businessType = "Business type is required";
    }

    if (Step === 3) {
      if (otp.some((digit) => digit.trim() === ""))
        errors.otp = "All OTP fields must be filled";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (Step < 4) setStep(Step + 1);
    }
  };

  const otpChange = (e, index) => {
    let value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) value = value.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = e.target.nextSibling;
      if (nextInput) nextInput.focus();
    }
  };

  const showData = () => {
    console.log(`
      Name: ${Name}, 
      Email: ${Email}, 
      Phone: ${Phone}, 
      Password: ${Password}, 
      RePassword: ${rePassword}, 
      Business Name: ${businessName}, 
      Business Type: ${businessType}, 
      OTP: ${otp.join("")}, 
      URL: ${url}
    `);
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap">
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

      <section className="w-[100vw] lg:w-[50vw] h-[auto] lg:h-[100vh] my-10 lg:my-0 px-7 flex justify-center">
        <div className="flex flex-col gap-y-6 my-auto w-[520px]">
          <header>
            <h1 className="text-[#3c6e71] font-[600] text-[18px] lg:text-[26px]">
              Simplify Your Lead Management
            </h1>
            <p className="text-sm lg:text-md text-[#6f6c90]">
              Register now to streamline your sales pipeline.
            </p>
          </header>

          <div>
            <section>
              {Step === 1 && (
                <motion.header
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                >
                  <h1 className="text-[#333333] text-lg lg:text-[22px] font-[600]">
                    Tell Us About Yourself
                  </h1>
                  <p className="text-[#6f6c90] font-[400] text-sm lg:text-md">
                    Enter your basic details to get started with our CRM
                    experience.
                  </p>
                </motion.header>
              )}
              {Step === 2 && (
                <motion.header
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                >
                  <h1 className="text-[#333333] text-lg lg:text-[22px] font-[600]">
                    Set Up Your Business Profile
                  </h1>
                  <p className="text-[#6f6c90] font-[400] text-sm lg:text-md">
                    Provide business details for better lead management.
                  </p>
                </motion.header>
              )}
              {Step === 3 && (
                <motion.header
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                >
                  <h1 className="text-[#333333] text-lg lg:text-[22px] font-[600]">
                    Verify Your Identity
                  </h1>
                  <p className="text-[#6f6c90] font-[400] text-sm lg:text-md">
                    Enter the OTP sent to your phone/email to secure your
                    account.
                  </p>
                </motion.header>
              )}
              {Step === 4 && (
                <motion.header
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                >
                  <h1 className="text-[#333333] text-lg lg:text-[22px] font-[600]">
                    Subscription & Payment
                  </h1>
                  <p className="text-[#6f6c90] font-[400] text-sm lg:text-md">
                    Complete payment to unlock full access and manage leads
                    efficiently
                  </p>
                </motion.header>
              )}

              <div className="flex justify-between items-center mt-5">
                {progress.map((item, index) => {
                  const isComplete = index <= Step - 1;

                  return (
                    <div key={index} className="relative flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex justify-center items-center  text-[16px] z-10 transition-all duration-1000
                        ${
                          isComplete
                            ? " bg-[#3C6E71] text-white"
                            : "bg-[#EFF0F6] text-[#6F6C90]"
                        } `}
                      >
                        {item}
                      </div>

                      {index !== progress.length - 1 && (
                        <div
                          className={`absolute left-12.5 top-4.5 w-24 h-1.5 rounded-2xl transition-all duration-1000
                          ${isComplete ? "bg-[#3C6E71]" : "bg-[#EFF0F6]"} `}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <motion.form
            className="transition-all duration-1000"
            onSubmit={(e) => e.preventDefault()}
          >
            <AnimatePresence mode="wait">
              {Step === 1 && (
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-4.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                >
                  <div className="col-span-1 lg:col-span-2 border border-[#e9e9e9] rounded-md px-5 py-2 text-base ">
                    <label className="text-[#666666] block">Full Name</label>
                    <input
                      type="text"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      className="focus:outline-none mt-1 w-full placeholder:text-[14px]"
                      placeholder="Enter your full name"
                    />
                    {formErrors.Name && (
                      <p className="text-[#F23645] text-xs mt-1">
                        {formErrors.Name}
                      </p>
                    )}
                  </div>

                  <div className="border border-[#e9e9e9] rounded-md px-5 py-2 text-base">
                    <label className="text-[#666666] block">Email</label>
                    <input
                      type="email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus:outline-none mt-1 w-full placeholder:text-[14px]"
                      placeholder="enter valid Email"
                    />
                    {formErrors.Email && (
                      <p className="text-[#F23645] text-xs mt-1">
                        {formErrors.Email}
                      </p>
                    )}
                  </div>

                  <div className="border border-[#e9e9e9] rounded-md px-5 py-2 text-base">
                    <label className="text-[#666666] block">Phone Number</label>
                    <input
                      type="text"
                      value={Phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="focus:outline-none mt-1 w-full placeholder:text-[14px]"
                      placeholder="Enter valid number"
                    />
                    {formErrors.Phone && (
                      <p className="text-[#F23645] text-xs mt-1">
                        {formErrors.Phone}
                      </p>
                    )}
                  </div>

                  <div className="border border-[#e9e9e9] rounded-md px-5 py-2 text-base">
                    <label className="text-[#666666] block">
                      Enter New Password
                    </label>
                    <input
                      type="password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="focus:outline-none mt-1 w-full placeholder:text-[14px]"
                      placeholder="Enter new password"
                    />
                    {formErrors.Password && (
                      <p className="text-[#F23645] text-xs mt-1">
                        {formErrors.Password}
                      </p>
                    )}
                  </div>

                  <div className="border border-[#e9e9e9] rounded-md px-5 py-2 text-base">
                    <label className="text-[#666666] block">
                      Re Enter Password
                    </label>
                    <input
                      type="password"
                      value={rePassword}
                      onChange={(e) => setRepassword(e.target.value)}
                      className="focus:outline-0 mt-1 w-full placeholder:text-[14px]"
                      placeholder="re-enter password"
                    />
                    {formErrors.Password && (
                      <p className="text-[#F23645] text-xs mt-1">
                        {formErrors.Password}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1 lg:col-span-2 bg-[#f5f7fe] py-2 px-4 rounded-md">
                    <p className="text-black text-[12px] font-medium">Note:</p>
                    {isError ? (
                      <p className="text-[12px] text-[#F23645]">
                        New password and re-entered password do not match.
                        Please try again.
                      </p>
                    ) : (
                      <p className="text-[12px] text-[#6f6c90]">
                        Your password should be at least 8 characters long and
                        include uppercase and lowercase letters, a number, and a
                        special character
                        <span className="text-black font-medium">
                          (e.g., !, @, #, $, %, &)
                        </span>
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {Step === 2 && (
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                >
                  <div className="col-span-1 lg:col-span-2 border border-[#e9e9e9] rounded-md px-5 py-2 text-base">
                    <label className="text-[#666666] block">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setbusinessName(e.target.value)}
                      className="focus:outline-none mt-1 w-full placeholder:text-[14px]"
                      placeholder="Your business name"
                    />
                    {formErrors.businessName && (
                      <p className="text-[#F23645] text-xs mt-1">
                        {formErrors.businessName}
                      </p>
                    )}
                  </div>

                  <div className="border border-[#e9e9e9] rounded-md px-5 py-2 text-base">
                    <label className="text-[#666666] block">
                      Type of Business
                    </label>
                    <select
                      type="text"
                      value={businessType}
                      onChange={(e) => setbusinessType(e.target.value)}
                      className="focus:outline-none mt-1 w-full"
                      placeholder="select business type"
                    >
                      <option>IT Service</option>
                      <option>Business Consulting</option>
                      <option>Digital Marketing</option>
                      <option>Data Analyst</option>
                    </select>
                    {formErrors.businessType && (
                      <p className="text-[#F23645] text-xs mt-1">
                        {formErrors.businessType}
                      </p>
                    )}
                  </div>

                  <div className="border border-[#e9e9e9] rounded-md px-5 py-2 text-base">
                    <label className="text-[#666666] block">
                      URL(Optional)
                    </label>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="focus:outline-none mt-1 w-full placeholder:text-[14px]"
                      placeholder="Enter URL"
                    />
                  </div>
                </motion.div>
              )}

              {Step === 3 && (
                <motion.div
                  className="flex flex-col gap-3.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                >
                  <div className="flex flex-col gap-y-1">
                    <div className="flex gap-x-2 lg:gap-x-6">
                      {otp.map((data, index) => (
                        <input
                          key={index}
                          type="text"
                          value={data}
                          onChange={(e) => otpChange(e, index)}
                          className="w-12 lg:w-14 h-12 lg:h-14 border border-[#e9e9e9] text-center focus:outline-0"
                        />
                      ))}
                    </div>

                    {formErrors.otp && (
                      <p className="text-[#F23645] text-xs mt-1">
                        {formErrors.otp}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <p className="text-[#999999] text-sm">
                      Time Remaining 01.25s
                    </p>
                    <p className="text-[#4c4c4c] text-base">Resend OTP</p>
                  </div>
                </motion.div>
              )}

              {Step === 4 && (
                <motion.div
                  className="flex flex-col gap-5 p-4.5 border rounded-md border-[#e9e9e9]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                >
                  <header className="text-center">
                    <h1 className="text-[#3c6e71] text-xl font-[600]">
                      Standard Plan
                    </h1>
                    <p className="text-[15px] text-[#4c4c4c] mt-1.5">
                      Get Started with Essential Features
                    </p>
                  </header>

                  <div className="bg-[#E2F2F3] px-4 py-2.5 border rounded-lg border-[#3C6E71] text-center">
                    <h1 className="text-2xl font-medium">
                      ₹499
                      <span className="text-[#666666] text-base ml-1.5">
                        | 3 months
                      </span>
                    </h1>
                  </div>

                  <div>
                    <ul className="text-[#4c4c4c] text-[15px] border border-[#E5EFFF] rounded-xl px-6 flex flex-col justify-center">
                      <li className="border-b-2 border-[#E5EFFF] py-4">
                        <span className="w-[10px] h-[10px] bg-[#3C6E71] rounded-full inline-block mr-2.5"></span>
                        2 Factor Authentication
                      </li>
                      <li className="border-b-2 border-[#E5EFFF] py-4">
                        <span className="w-[10px] h-[10px] bg-[#3C6E71] rounded-full inline-block mr-2.5"></span>
                        SMS Reminder
                      </li>
                      <li className="py-4">
                        <span className="w-[10px] h-[10px] bg-[#3C6E71] rounded-full inline-block mr-2.5"></span>
                        Team Members - 50
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className="text-white font-medium bg-black text-center py-2.5 mt-6 border rounded-md cursor-pointer"
              onClick={nextStep}
            >
              {Step === 4 ? (
                <button className="cursor-pointer" onClick={showData}>
                  Buy Now
                </button>
              ) : (
                <button className="cursor-pointer">Continue</button>
              )}
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}

export default SignUpForm;
