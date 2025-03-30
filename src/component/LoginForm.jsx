import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "./login.css";

function LoginForm() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [active, setactive] = useState("admin");

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
    <div className="px-8 my-12 flex justify-center items-center w-[100vw] xl:w-[50vw]">
      <div className="flex flex-col gap-y-10">
        <div>
          <h1 className="text-4xl text-gray-800 font-semibold">
            Welcome Back!
          </h1>
          <p className="text-base text-gray-500 mt-3">
            Log in to streamline your sales process and close deals faster
          </p>
        </div>

        <div className="flex justify-between">
          <button
            className={`accessButton ${
              active === "admin" ? "active" : "inactive"
            } p-3 md:p-4 lg:p-5 `}
            onClick={userAdmin}
          >
            Admin
          </button>

          <button
            className={`accessButton ${
              active === "staff" ? "active" : "inactive"
            }`}
            onClick={userStaff}
          >
            Staff
          </button>
        </div>

        <div className="flex flex-col gap-y-4">
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
            <p 
              className="text-end text-[#4c4c4c] cursor-pointer mt-2"
            >
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
              New User ? <span className="cursor-pointer text-[#3c6e71] font-medium">Sign Up Now &#8594;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default LoginForm;
