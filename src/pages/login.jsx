import LoginBanner from "../component/loginBanner";
import LoginForm from "../component/LoginForm";

function Login(){
    return(
        <div className="Login-container">
            <LoginBanner/>
            <LoginForm/>
        </div>
    )
}

export default Login;