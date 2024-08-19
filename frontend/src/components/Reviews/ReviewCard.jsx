import React from 'react'
import ReactStars from "react-rating-stars-component";
import profile from "../../../public/profile.png"


const ReviewCard = ({review}) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };
  return (
    <div className=' flex flex-wrap items-center justify-center flex-col border-2 border-gray-300 rounded-md w-[600px] h-[400px]'>
      <img src={profile} alt="user"  className=' w-[100px] rounded-full bg-red-400' />
      <p>{review.name}</p>
      <ReactStars {...options}/>
      <span className='px-10'> {review.comment}</span>    </div>
  )
}

export default ReviewCard