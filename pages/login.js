import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

   useEffect(() => {
     if (localStorage.getItem("token")) {
       router.push("/");
     }
   });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formBody = { email, password };
    let res = await fetch(` ${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });
    let response = await res.json();
    console.log(response);
    console.log(response.Success)

    setPassword("");
    setEmail("");
    if (response.Success) {
      localStorage.setItem("token", response.token);
      toast.success("Logged in successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_HOST}`);
      }, 1000);
    } else {
      toast.error(response.error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <section className="h-screen ">
        <div className="container px-6 py-12 h-full ">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
            <div className=" px-6 py-8 rounded shadow-md text-black w-full">
              <form method="POST" onSubmit={handleSubmit}>
                <h1 className=" text-3xl text-center mb-6">Log In</h1>
                {/* <!-- Email input --> */}
                <div className="mb-6">
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    id="email"
                    type="email"
                    className="form-control block border-b border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Email address"
                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="mb-6">
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    id="password"
                    type="password"
                    className="form-control block border-b border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Password"
                  />
                </div>

                <div className="flex justify-end items-end mb-6">
                  <Link href={"/Forgot"}>
                    <a
                      href="#!"
                      className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out border-b border-grey-dark"
                    >
                      Forgot password?
                    </a>
                  </Link>
                </div>

                {/* <!-- Submit button --> */}
                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Sign in
                </button>
                <p className="text-center text-black my-4">
                  Don&apos;t have an account?{" "}
                  <Link href={"/signup"}>
                    <a className="border-b border-grey-dark text-blue-600">
                      Sign Up
                    </a>
                  </Link>{" "}
                </p>
            
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
