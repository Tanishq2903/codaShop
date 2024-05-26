import React from "react";
import { useState,useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const SignUp = () => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  });


  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formBody = { name, email, password };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });
    let response = await res.json();
    console.log(response);
    setName("");
    setPassword("");
    setEmail("");
    toast.success('Signed Up Successfully', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  };

  return (
    <div>
      <div className="bg-grey-lighter min-h-screen flex justify-between ">
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
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className=" px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className=" text-3xl text-center">Sign up</h1>
            <p className="text-black my-2 text-center">
              Already have an account?&nbsp;
              <Link href={"/login"}>
                <a className="text-blue-600 border-b border-grey-dark ">
                  Log in
                </a>
              </Link>
            </p>
            <form action="" method="POST" onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                value={name}
                type="text"
                className="block border-b border-grey-light w-full p-3 rounded mb-4"
                name="name"
                placeholder="Name"
              />

              <input
                onChange={handleChange}
                value={email}
                type="email"
                className="block border-b border-grey-light w-full p-3 rounded mb-4"
                name="email"
                id="email"
                placeholder="Email"
              />

              <input
                onChange={handleChange}
                value={password}
                type="password"
                className="block border-b border-grey-light w-full p-3 rounded mb-4"
                name="password"
                id="password"
                placeholder="Password"
              />
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>
            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>
              &nbsp;and&nbsp;
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
