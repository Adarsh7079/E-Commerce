import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
   <div>
     <div className=" w-[250px] h-[370px] hover:border-[1px] border-gray-400 rounded-md ">
      <Link to={`/product/${product._id}`} className="  flex flex-col gap-2">
        <img
          src={product.images[0].url}
          alt={product.name}
          className=" w-full h-[250px]"
        />
        <div className=" px-2">
          <p className=" text-gray-500 text-xl">{product.name}</p>
          <div className=" flex  gap-2 items-center">
            <ReactStars {...options} />
            <span>({product.numOfReviews} reviews)</span>
          </div>
          <span className=" text-red-600 text-xl"> &#8377;{product.price}</span>
        </div>
      </Link>
    </div>
   </div>
  );
};

export default Product;
