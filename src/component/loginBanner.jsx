import img1 from "../assets/img1.png"

function LoginBanner(){
    return(
        <div className="hidden lg:flex loginbanner-container ">
            <div className="login-banner-content relative">
                <div>
                    <h1
                    className="lg:text-3xl font-semibold text-white mt-4" 
                    >
                        Streamline Your Lead Management Effortlessly
                    </h1>

                    <p
                    className="text-3xl text-white mt-8"
                    >
                        Capture, track, and convert leads effortlessly.
                    </p>
                </div>

                <img 
                    src={img1} alt="image" 
                    className="w-xl absolute bottom-0 right-0"
                />
            </div>
        </div>
    )
}

export default LoginBanner;