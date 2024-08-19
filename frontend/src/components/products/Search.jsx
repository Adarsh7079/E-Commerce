import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = ({history}) => {
    const navigate = useNavigate();
    const [keyword,setkeyword]=useState("");

    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    }
  return (
    <div className=' w-full  h-screen flex  items-center justify-center'>
        <form className=' border-2 border-gray-400 rounded-md h-[50px] ' onSubmit={searchSubmitHandler}>
            <input type="text"
            className=' outline-none px-3 h-full w-[500px]'
            placeholder='Search a product......' 
            onChange={(e)=>setkeyword(e.target.value)}/>
            <input type="submit" value="search" className=' text-white text-lg bg-orange-500 h-full w-[100px] ' />
        </form>
    </div>
  )
}

export default Search