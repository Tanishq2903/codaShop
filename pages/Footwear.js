import React from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "../models/Product";

const Footwear = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object.keys(products).length === 0 && 
              <p>New Stock Coming soon</p>}
            {Object.keys(products).map((item) => {
              return (
                <Link 
                  passhref={true}
                  key={products[item]._id}
                  href={`/Product/${products[item].slug}`}
                >
                  <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg ml-8">
                    <a className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object-cover object-center w-full h-full block"
                        src={products[item].img}
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {products[item].category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p className="mt-1">${products[item].price}</p>
                      <div className="mt-1">
                        {products[item].size.includes("S") && (
                          <span className="px-1 border-2 border-gray-200">
                            S
                          </span>
                        )}
                        {products[item].size.includes("M") && (
                          <span className="px-1 border-2 border-gray-200">
                            M
                          </span>
                        )}
                        {products[item].size.includes("L") && (
                          <span className="px-1 border-2 border-gray-200">
                            L
                          </span>
                        )}
                        {products[item].size.includes("XL") && (
                          <span className="px-1 border-2 border-gray-200">
                            XL
                          </span>
                        )}
                        {products[item].size.includes("2XL") && (
                          <span className="px-1 border-2 border-gray-200">
                            2XL
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                      {products[item].color.includes("Red") && (
                          <button className="p-1 my-1 bg-red-700 rounded-lg w-6 h-6 mr-1"></button>
                        )}
                      {products[item].color.includes("Blue") && (
                          <button className="p-1 my-1 bg-blue-700 rounded-lg w-6 h-6 mr-1"></button>
                        )}
                      {products[item].color.includes("Black") && (
                          <button className="p-1 my-1 bg-black rounded-lg w-6 h-6 mr-1"></button>
                        )}
                      {products[item].color.includes("Green") && (
                          <button className="p-1 my-1 bg-green-700 rounded-lg w-6 h-6 mr-1"></button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({ category: "footwear" });
  let foots = {};
  for (let item of products) {
    if (item.title in foots) {
      if (
        !foots[item.title].color.includes[item.color] &&
        item.availableQty > 0
      ) {
        foots[item.title].color.push(item.color);
      }
      if (
        !foots[item.title].size.includes[item.size] &&
        item.availableQty > 0
      ) {
        foots[item.title].size.push(item.size);
      }
    } else {
      foots[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        foots[item.title].color = [item.color];
        foots[item.title].size = [item.size];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(foots)) },
  };
}
export default Footwear;
