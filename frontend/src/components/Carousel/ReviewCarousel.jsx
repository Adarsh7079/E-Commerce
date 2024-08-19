import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Review.css";
import Slider from "react-slick";
import ReactStars from "react-rating-stars-component";
import profile from "../../../public/profile.png";

import "./Carousel.css";

const ReviewCarousel = ({ review }) => {
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
  };
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (
  <div>
     <Slider {...settings}>
     <div className=" flex flex-wrap items-center justify-center flex-col border-2 border-gray-300 rounded-md w-[600px] h-[400px]">
      <img
        src={profile}
        alt="user"
        className=" w-[100px] rounded-full bg-red-400"
      />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="px-10"> {review.comment}</span>
    </div>
     </Slider>
   
  </div>
  );
};

export default ReviewCarousel;
