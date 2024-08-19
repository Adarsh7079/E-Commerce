import React from "react";
import Loader from "../loader/Loader";
import { Tabs, Tab } from "./Tabs";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const LoginSignUp = () => {
  return (
    <div className=" py-10">
      <Tabs>
        <Tab label="Login">
          <form action="">
            <div className=" flex flex-col gap-10 py-16 ">
              <div className=" flex gap-5 items-center  border-2 px-5 h-[50px] rounded-md">
                <TfiEmail className=" text-2xl" />
                <input
                  type="text"
                  className=" outline-none text-gray-500"
                  placeholder="Email"
                />
              </div>
              <div className=" flex gap-5 items-center  border-2 px-5 h-[50px] rounded-md">
                <RiLockPasswordFill />
                <input
                  type="text"
                  className=" outline-none text-gray-500"
                  placeholder="Email"
                />
              </div>
              <div>
                <Link className="  w-full bg-red-400 justify-end font-bold">
                  Forget Password?
                </Link>
              </div>
              <button>Login</button>
            </div>
          </form>
        </Tab>
        <Tab label="SignUp">
          <h1>SignUp</h1>
        </Tab>
      </Tabs>
    </div>
  );
};

export default LoginSignUp;
