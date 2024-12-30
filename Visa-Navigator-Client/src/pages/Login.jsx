import { useState, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function LogIn() {
  const { setUser, userLogin, googleLogIn } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Helmet>
        <title>Log In | Visa Navigator</title>
      </Helmet>
      <section className="mx-auto w-11/12 max-w-screen-xl py-16">
        <div className="mx-auto flex max-w-[500px] items-center justify-center">
          <div className="w-full rounded p-8 shadow">
            <h1 className="pb-8 text-center text-3xl font-semibold">Log In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="email">
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                  className="w-full rounded border p-2"
                  ref={emailRef}
                  required
                />
              </label>
              <label htmlFor="password">
                <p>Password</p>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    id="password"
                    className="w-full rounded border p-2"
                    required
                  />
                  {showPassword ? (
                    <FaRegEyeSlash
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={toggleShowPassword}
                    />
                  ) : (
                    <FaRegEye
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={toggleShowPassword}
                    />
                  )}
                </div>
              </label>

              {error && (
                <p className="text-justify text-sm text-red-500">{error}</p>
              )}
              <div>
                <button type="button" className="inline underline">
                  Forgot Password
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <button
                  type="submit"
                  className="w-full rounded bg-[#4682A9] p-2 font-bold text-white"
                >
                  Log In
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center justify-center">
              <hr className="h-1 w-full" /> <span className="px-4">or</span>
              <hr className="h-1 w-full" />
            </div>
            <button
              onClick={handleGoogleLogIn}
              type="submit"
              className="mt-4 w-full rounded border border-[#4682A9] p-2 font-bold text-[#4682A9]"
            >
              Log In with Google
            </button>
            <div className="mt-4 text-center">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
