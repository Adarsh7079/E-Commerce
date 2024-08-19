import React from "react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { IoMdAppstore } from "react-icons/io";

const Footer = () => {
  return (
    <>
      <div className=" w-full bg-gray-700 text-white py-10">
        <footer className=" w-11/12 mx-auto flex  justify-between">
          {/* Left footer */}
          <div className=" text-center w-[350px]">
            <h4 className=" uppercase">Download our app</h4>
            <p>Download App for Android and IOS mobile phone</p>
          </div>
          {/* Middle footer */}
          <div className=" text-center w-[350px] flex flex-col gap-10">
            <h1 className=" uppercase text-5xl font-semibold text-orange-500">
              ecommerce
            </h1>
            <div>
              <p>High Quality is our first priority</p>
              <p>copyright 2021 &#169; AdarshParitosh</p>
            </div>
          </div>

          {/* Right Footer */}
          <div className="flex flex-col gap-7 text-center ">
            <h4 className=" underline text-3xl">Follow Us</h4>
            <div className=" flex flex-col gap-2">
              <a href="">Linkedin</a>
              <a href="">Instagram</a>
              <a href="">Facebook</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
