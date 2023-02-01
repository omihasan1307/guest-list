import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase.init";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Logo from "../img/loginLogo.png";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);
  const navigate = useNavigate();

  if (user) {
    navigate("/profile/info");
  }

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);

    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);

  return (
    <div className="hero min-h-screen customLogin">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          {/* <h1 className="mb-5 text-5xl font-bold">Guest List</h1> */}
          <img src={Logo} alt="" className="mx-auto w-3/5" />
          <p className="mb-5 text-white">
            Welcome to the Event! We are thrilled to welcome you to this
            exciting gathering, where you will have the opportunity to connect,
            learn, and have fun. Whether you are here for business or pleasure.
          </p>
          <div
            onClick={() => signInWithGoogle()}
            className="cursor-pointer bg-white w-3/5 lg:w-3/6 text-slate-800 font-bold py-2 rounded-full flex justify-center mx-auto"
          >
            <FcGoogle className="text-3xl mr-2" />
            <button>Continue with Google</button>
          </div>
        </div>
      </div>
      <Particles
        id="tsparticles"
        url="http://foo.bar/particles.json"
        init={particlesInit}
        loaded={particlesLoaded}
      />
    </div>
  );
};

export default Login;
