import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Carousel.css"
const dataHome = [
  {
    img: `Whiteland.webp`,
    place: `Smartworld One DXP`,
    sector: `Sector 113, Gurgaon`,
    price: `On Request`,
  },
  {
    img: `./M3M.webp`,
    place: `M3M Alltitude`,
    sector: `Sector 65, Gurgaon`,
    price: `On Request`,
  },
  {
    img: `Mansion.webp`,
    place: `M3M Mansion`,
    sector: `Sector 103, Gurgaon`,
    price: `On Request`,
  },
  {
    img: `M3M.webp`,
    place: `M3M Alltitude`,
    sector: `Sector 65, Gurgaon`,
    price: `On Request`,
  },
 
  {
    img: `M3M.webp`,
    place: `M3M Alltitude`,
    sector: `Sector 65, Gurgaon`,
    price: `On Request`,
  },
];


import "./Carousel.css"

const Carousel = ({image}) => {
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    dots: true,

   
  };

  return (
   <div>
     <div className="md:w-[500px]  h-full w-full py-10 flex flex-col mx-auto">
      <Slider {...settings}>
        {dataHome.map((d, index) => (
          <div key={index} className="relative px-2"> {/* Add padding here */}
            <div className=" h-[500px]  w-[400px] flex flex-col gap-5 rounded-2xl mx-auto bg-white overflow-hidden">
              <div className="flex">
                <img
                  src={image}
                  className="rounded-t-xl h-[400px] w-full"
                  alt="image loading"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
   </div>
  )
};

export default Carousel;
