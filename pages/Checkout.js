import React, { useState,useEffect } from "react";
import Link from "next/link";
import {
  AiOutlineCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkout } from "./api/checkout";
import { useRouter } from "next/router";

const Checkout = ({ cart, subTotal, addToCart, removeFromCart }) => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    } 
  }, []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleChange = async (e) => {
 
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    } else if (e.target.name === "pincode") {
      setPincode(e.target.value);
      if(e.target.value.length==6){
        let pins = await fetch(` ${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
      let pinJson = await pins.json();
      if(Object.keys(pinJson).includes(e.target.value)){
        setCity(pinJson[e.target.value][0]);
        setState(pinJson[e.target.value][1]);
      }
      else{
        setCity("");
        setState("");
      }
    }
    else{
      setCity("");
      setState("");
    }
    }
    if (
      name.length > 3 &&
      phone.length > 3 &&
      email.length > 3 &&
      address.length > 3 &&
      pincode.length > 3
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div className="checkout-form">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div>
        <section className="text-gray-600 body-font relative">
          <div className="container py-10 px-4">
            <div className="flex flex-col text-center w-full mb-4">
              <h1 className="text-3xl font-medium title-font mb-4 text-gray-900">
                Delivery Details
              </h1>
            </div>
            <div className=" md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      onChange={handleChange}
                      value={name}
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Phone No.
                    </label>
                    <input
                      onChange={handleChange}
                      value={phone}
                      type="text"
                      id="phone"
                      name="phone"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email address
                    </label>
                    <input
                      onChange={handleChange}
                      value={email}
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="address"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Address
                    </label>
                    <textarea
                      onChange={handleChange}
                      value={address}
                      id="address"
                      name="address"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-1/3">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Pincode
                    </label>
                    <input
                      onChange={handleChange}
                      value={pincode}
                      type="text"
                      id="pincode"
                      name="pincode"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/3">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      City
                    </label>
                    <input
                      onChange={handleChange}
                      value={city}
                      type="text"
                      id="city"
                      name="city"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      // readOnly={true}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/3">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      State
                    </label>
                    <input
                      onChange={handleChange}
                      value={state}
                      type="text"
                      id="state"
                      name="state"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "
                      // readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <section className="text-gray-600 body-font relative w-full lg:mr-48 md:mx">
          <div className="container py-10 mx-auto">
            <div className="flex flex-col w-full">
              <h2 className=" text-3xl font-medium title-font mb-4 text-gray-900 ml-2">
                Shopping Cart
              </h2>

              {Object.keys(cart).length != 0 && (
                <span className="subtotal sm:text-xl text-xl font-medium title-font mb-4 text-gray-900 mt-2 ml-2">
                  Your Cart total is : &#8377;{subTotal}
                </span>
              )}
            </div>

            <div className="sidebar pl-6">
              <ol className="list-decimal font-semibold">
                {Object.keys(cart).length === 0 && (
                  <div>
                    <p className="my-4 text-xl pl-16">Your Cart is Empty!</p>
                    <p className="my-4 text-sm text-gray-400 text-left">
                      Explore our collections and find something you like
                    </p>
                  </div>
                )}

                {Object.keys(cart).map((k) => {
                  return (
                    <li key={k}>
                      <div className="item flex my-3">
                        <div className="font-semibold text-xl">
                          {cart[k].name}({cart[k].size}/{cart[k].variant})
                        </div>
                        <div className="w-1/3 flex items-center justify-center text-xl">
                          <AiFillMinusCircle
                            onClick={() => {
                              removeFromCart(
                                k,
                                1,
                                cart[k].price,
                                cart[k].name,
                                cart[k].size,
                                cart[k].variant
                              );
                            }}
                            className="cursor-pointer"
                          />
                          <span className="mx-2">{cart[k].qty}</span>
                          <AiFillPlusCircle
                            onClick={() => {
                              addToCart(
                                k,
                                1,
                                cart[k].price,
                                cart[k].name,
                                cart[k].size,
                                cart[k].variant
                              );
                            }}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
              {Object.keys(cart).length === 0 ? (
                <div className="ml-24">
                  <Link href={"/"}>
                    <button className=" text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded text-lg my-4">
                      Explore
                    </button>
                  </Link>
                </div>
              ) : (
                <div className=" w-3/4 flex justify-center ">
                  <button
                    onClick={() => {
                      const lineItems = Object.keys(cart).map((k) => ({
                        price: cart[k].priceId, // Replace with the actual price ID
                        quantity: cart[k].qty,
                      }));
                      console.log(lineItems);
                      checkout({
                        lineItems,
                        email: email,
                        name,
                        phone,
                        address,
                        pincode,
                      });
                    }}
                    className=" text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded text-lg my-4 disabled:bg-indigo-300"
                    disabled={disabled}
                  >
                    Proceed to Buy
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
