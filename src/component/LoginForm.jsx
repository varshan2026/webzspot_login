import { useState } from "react";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import "./login.css";

function LoginForm() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const[showPassword, setshowPassword] = useState(false);
  const[active, setactive] = useState("admin");

  const passwordState = (e) => {
    e.preventDefault()
    setshowPassword(!showPassword)
  }

  const userAdmin = () => {
    setactive("admin")
  }

  const userStaff = () => {
    setactive("staff")
  }

  return (
    <div className="loginform-container">
      <div>
        <h1 className="text-4xl text-gray-800 font-semibold">Welcome Back!</h1>
        <p className="text-base text-gray-500 mt-3">
          Log in to streamline your sales process and close deals faster
        </p>
      </div>

      <div className="flex justify-between">
        <button 
        className={`accessButton ${active === "admin"?"active":"inactive"} p-3 md:p-4 lg:p-5 `}
        onClick={userAdmin}
        >
          Admin
        </button>

        <button 
        className={`accessButton ${active === "staff"?"active":"inactive"}`}
        onClick={userStaff}
        >
          Staff
        </button>
      </div>

      <form>
        <div className="form-container">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:outline-none"
              placeholder={active === "admin"?"admin@example.com":"staff@example.com"}
            />
          </div>

          <div>
            <div className="form-group relative">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:outline-none "
                placeholder={showPassword === true?"Login@123":"*********"}
              />

              <button
                className="absolute right-5 top-6 text-2xl cursor-pointer text-gray-500"
                onClick={passwordState}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p 
            className="forgot-password"
            >
              Forgot Password ?
            </p>
          </div>

          <div>
            <button 
            className="px-4 py-3 text-white border rounded-md bg-black w-full cursor-pointer"
            >
              Login
            </button>
            <p className="new-user">
              New User ? <span>Sign Up Now &#8594;</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
