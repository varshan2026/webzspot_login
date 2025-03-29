import LoginBanner from "../component/loginBanner";
import LoginForm from "../component/LoginForm";

function Login() {
  return (
    <div className="flex flex-wrap">
      <LoginBanner />
      <LoginForm />
    </div>
  );
}

export default Login;
