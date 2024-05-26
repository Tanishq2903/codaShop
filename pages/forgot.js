import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Forgot = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  });

  return (
    <div className="flex min-h-full items-center justify-around py-12 px-4 sm:px-6 lg:px-8">
      <div className="md:w-8/12 lg:w-6/12 my-12 md:mb-0">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="w-full"
          alt="Phone image"
        />
      </div>
      <div className="w-full max-w-md space-y-8 shadow-md p-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email and we&apos;ll send you a link to reset your
            password.
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="text"
                className="block border-b border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/* <!-- Heroicon name: mini/lock-closed --> */}
              </span>
              Reset your password
            </button>
          </div>
        </form>
        <p className="text-center text-black my-4">
          Don&apos;t have an account?
          <Link href={"/signup"}>
            <a className="border-b border-grey-dark text-blue-600">Sign Up</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Forgot;
