import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FcContacts } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { FaEquals } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpne] = useState(false);
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="w-full md:rounded-full shadow-xl mt-2 md:h-[70px] hidden md:flex  items-center">
        {/* Desktop View  */}
        <div className=" flex  w-11/12 mx-auto  justify-between">
          <div className="px-0  flex items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWrzxFJUBHiepoNwhtKQIUJGKW9yoUUPttiwWmiSNzXVMaNFmEIsSfijGF_-ssEbAMEVE&usqp=CAU"
              alt=""
              className="w-[80px] rounded-full"
            />
          </div>
         
          <div className=" flex  items-center gap-20">
            <Link
              to="/"
              className=" text-gray-500 hover:text-orange-500  text-xl transition-all delay-150"
            >
              Home
            </Link>
            <Link
              to="/products"
              href="asdsa"
              className=" text-gray-500 hover:text-orange-500  text-xl transition-all delay-150"
            >
              Product
            </Link>
            <Link
              href="asdsa"
              className=" text-gray-500 hover:text-orange-500  text-xl transition-all delay-150"
            >
              Contact
            </Link>
            <Link
              href="asd"
              className=" text-gray-500 hover:text-orange-500  text-xl transition-all delay-150"
            >
              About
            </Link>
          </div>
          <div className=" flex items-center">
          <Link to="/search" className=" flex gap-5 rounded-xl cursor-pointer border-2 px-3 justify-center items-center h-[35px] w-[400px] ">
            <p className=" text-gray-400">Search......</p>
            <div className="  w-full flex items-end justify-end">
              <FaSearch className="  text-gray-500  transition-all delay-100" />
            </div>
          </Link>
          </div>
          <div className="flex items-center gap-10">
            <div className=" shadow-xl rounded-3xl px-3 h-[40px] flex items-center gap-3 hover:bg-orange-400 cursor-pointer  transition-all delay-200 text-gray-500">
              <CgProfile className=" text-[30px]" />
              <p>FirstName</p>
            </div>
            <div className=" relative shadow-xl rounded-3xl px-3 h-[40px] flex items-center gap-3 hover:bg-orange-400  cursor-pointer transition-all delay-150">
              <div className=" absolute text-gray-100 bg-red-500 rounded-full p-[5px] h-[25px] flex items-center top-0 -right-1">
                0
              </div>
              <IoCartOutline className=" text-[30px]" />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile View  */}

      <div className=" relative w:full md:hidden items-center h-[50px] shadow-xl ">
        <div className="flex gap-5 px-2 items-center">
          <div className="px-0  flex items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWrzxFJUBHiepoNwhtKQIUJGKW9yoUUPttiwWmiSNzXVMaNFmEIsSfijGF_-ssEbAMEVE&usqp=CAU"
              alt=""
              className="w-[70px] rounded-full flex items-center"
            />
          </div>
          <div className="bg-white h-[35px] flex  items-center justify-center w-full rounded-xl border-2 px-3  ">
            <input
              className=" outline-none w-full text-gray-500"
              type="text"
              placeholder="search...."
            />
            <div>
              <FaSearch className=" cursor-pointer hover:text-orange-500  transition-all delay-100" />
            </div>
          </div>
          <div className="flex ">
            {!open ? (
              <FaEquals
                className=" text-[30px]  "
                onClick={(e) => setOpne(!open)}
              />
            ) : (
              <MdClose
                className=" text-[40px]  text-red-400 font-bold hover:text-red-500 "
                onClick={(e) => setOpne(!open)}
              />
            )}
          </div>
        </div>

        <div>
          {open && (
            <div
              className={`md:hidden  bg-gray-100  w-[70%] h-full bottom-0 duration-500 ${
                open
                  ? "fixed left-0 top-0 h-auto z-100 translate-x-0"
                  : "left-[-100%]"
              }`}
            >
              <div className="px-2 flex flex-col mx-auto  justify-between">
                {login ? (
                  <div className="flex justify-between  mx-3 mt-2">
                    <div className="px-0  flex items-center">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWrzxFJUBHiepoNwhtKQIUJGKW9yoUUPttiwWmiSNzXVMaNFmEIsSfijGF_-ssEbAMEVE&usqp=CAU"
                        alt=""
                        className="w-[70px]"
                      />
                    </div>
                    <div className=" shadow-xl rounded-3xl px-3 h-[40px] flex items-center gap-3 hover:bg-orange-400 cursor-pointer  transition-all delay-200 text-gray-500">
                      <CgProfile className=" text-[30px]" />
                      <p>FirstName</p>
                    </div>
                    <div className=" relative shadow-xl rounded-3xl px-3 h-[40px] flex items-center gap-3 hover:bg-orange-400  cursor-pointer transition-all delay-150">
                      <div className=" absolute text-gray-100 bg-red-500 rounded-full p-[5px] h-[25px] flex items-center top-0 -right-1">
                        0
                      </div>
                      <IoCartOutline className=" text-[30px]" />
                    </div>
                  </div>
                ) : (
                  <div className="px-0 flex items-center justify-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWrzxFJUBHiepoNwhtKQIUJGKW9yoUUPttiwWmiSNzXVMaNFmEIsSfijGF_-ssEbAMEVE&usqp=CAU"
                      alt=""
                    />
                  </div>
                )}
                <div className=" flex  flex-col items-center mt-10 gap-5 ">
                  <Link
                    href="asdsad"
                    className=" text-gray-500 hover:text-orange-500  text-xl transition-all delay-150"
                  >
                    Home
                  </Link>
                  <Link
                    to="/products"
                    href="asdsa"
                    className=" text-gray-500 hover:text-orange-500  text-xl transition-all delay-150"
                  >
                    Product
                  </Link>
                  <Link
                    href="asdsa"
                    className=" text-gray-500 hover:text-orange-500  text-xl transition-all delay-150"
                  >
                    Contact
                  </Link>
                  <Link
                    href="asd"
                    className=" text-gray-500 hover:text-orange-500  text-xl transition-all delay-150"
                  >
                    About
                  </Link>
                  {login ? (
                    <div className=" w-full flex justify-center">
                      <button className=" bg-orange-500 w-full h-[40px] font-semibold hover:bg-orange-600 rounded-lg text-gray-200">
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className=" mt-2 w-full flex justify-center">
                      <button className=" bg-blue-500 w-full h-[40px] font-semibold hover:bg-blue-600 rounded-lg text-gray-200">
                        LogIn
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
