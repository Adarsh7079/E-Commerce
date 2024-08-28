import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { Tabs, Tab } from "./Tabs";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdFace6 } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  login,
  register,
} from "../../redux/actions/userAction.js";
import { useAlert } from "react-alert";

const LoginSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const { error, loading } = useSelector((state) => state.user);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const signSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((e) => {
      return { ...e, [name]: value };
    });
    console.log("formadat", formData);
  };

  useEffect(() => {
    if (error) {
      alert.error("Something wrong");
      dispatch(clearErrors());
    }
   
  }, [dispatch, error, alert]);
  return (
    <div className=" py-10">
      {loading ? (
        <Loader />
      ) : (
        <Tabs>
          <Tab label="Login">
            <form action="" onSubmit={loginSubmit}>
              <div className=" flex flex-col gap-10 py-16 ">
                <div className=" flex gap-5 items-center  border-2 px-5 h-[50px] rounded-md">
                  <TfiEmail className=" text-2xl" />
                  <input
                    type="text"
                    className=" outline-none text-gray-500"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className=" flex gap-5 items-center  border-2 px-5 h-[50px] rounded-md">
                  <RiLockPasswordFill />
                  <input
                    type="text"
                    className=" outline-none text-gray-500"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className=" w-full">
                  <Link className=" flex justify-end ">Forget Password?</Link>
                </div>
                <button className=" w-full bg-orange-400 h-[45px] rounded-md hover:bg-orange-500 text-white">
                  Login
                </button>
              </div>
            </form>
          </Tab>
          <Tab label="SignUp">
            <form onSubmit={signSubmit}>
              <div className="flex flex-col gap-7 py-12">
                <div className="flex gap-5 items-center border-2 px-5 h-[50px] rounded-md">
                  <MdFace6 className="text-2xl" />
                  <input
                    type="text"
                    className="outline-none text-gray-500"
                    placeholder="Name"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInput}
                  />
                </div>
                <div className="flex gap-5 items-center border-2 px-5 h-[50px] rounded-md">
                  <TfiEmail className="text-2xl" />
                  <input
                    type="text"
                    className="outline-none text-gray-500"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInput}
                  />
                </div>
                <div className="flex gap-5 items-center border-2 px-5 h-[50px] rounded-md">
                  <RiLockPasswordFill />
                  <input
                    type="password"
                    className="outline-none text-gray-500"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInput}
                  />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <img
                    src="./profile.png"
                    alt="avatar"
                    className="w-[40px] h-[40px] rounded-full"
                  />
                  <input
                    type="file"
                   
                    className="border-2 h-[30px] rounded-md cursor-pointer"
                    id="avatar"
                     name="avatar"
                    accept="image/*"
                    onChange={handleInput}
                  />
                </div>

                <button className="w-full bg-orange-400 h-[45px] rounded-md hover:bg-orange-500 text-white">
                  Register
                </button>
              </div>
            </form>
          </Tab>
        </Tabs>
      )} 
    </div>
  );
};

export default LoginSignUp;
