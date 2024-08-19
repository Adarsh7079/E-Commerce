import React, { useEffect } from "react";
import Carousel from "../Carousel/Carousel.jsx";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../redux/actions/productAction.js";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "../Reviews/ReviewCard.jsx";
import Loader from "../loader/Loader.jsx";
import {useAlert} from "react-alert"

const ProductDetails = () => {
  const alert=useAlert();
  const { id } = useParams(); // Extract the 'id' from the URL parameters

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if(error)
    {
      alert.error(error);
      dispatch(clearErrors())
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id,error,alert]);

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
      {loading ? (
        <Loader />
      ) : (
        <div>
        <div className="w-full h-full py-10 ">
          <section className="w-2/3 mx-auto flex ">
            <div className=" w-full h-full ">
              {product.images &&
                product.images.map((item) => (
                  <Carousel image={item.url} key={item.url} />
                ))}
              {/* <Carousel product={product}/> */}
            </div>
            <div className=" w-full  px-14">
              <div className=" py-10">
                <h2 className=" font-bold text-2xl">{product.name}</h2>
                <p className=" text-gray-500">Product #{product._id}</p>
              </div>
              <div className=" border-b-[1px] border-t-[1px] border-gray-400 flex  py-5 gap-2 items-center">
                <ReactStars {...options} />
                <span className=" text-gray-500">
                  ({product.numOfReviews} reviews)
                </span>
              </div>
              <div>
                <h1 className=" font-bold text-2xl mt-7">
                  {" "}
                  &#8377;{product.price}
                </h1>
                <div className="mt-5 flex gap-5">
                  <div className=" flex ">
                    <button className=" w-[20px] bg-gray-700 text-white text-xl border-none">
                      -
                    </button>
                    <input
                      value="1"
                      type="number"
                      className=" border-2 w-[50px] text-center  border-none"
                    />
                    <button className=" w-[20px] bg-gray-700 text-white text-xl border-none">
                      +
                    </button>
                  </div>
                  <button className=" bg-orange-600 text-white w-[120px] rounded-full h-[35px] text-sm">
                    Add to cart
                  </button>
                </div>
                <div className=" border-b-[1px] border-t-[1px] mt-7 border-gray-400 py-3">
                  <p>
                    status:
                    <b
                      className={
                        product.Stock < 1
                          ? "text-red-700 mx-2"
                          : "text-green-700 mx-2"
                      }
                    >
                      {product.Stock < 1 ? "OutofStock" : "InStock"}
                    </b>
                  </p>
                </div>
              </div>

              <div className=" mt-5">
                <span className=" text-xl text-gray-800 ">
                  Description:
                </span>
                <p className=" text-sm  text-gray-600 ">
                  {product.description}
                </p>
              </div>
              <div className=" py-5">
                <button className=" bg-orange-600  w-[150px] rounded-full h-[35px] text-sm text-gray-100">
                  Submit Review
                </button>
              </div>
            </div>
          </section>
        </div>
        <section className=" overflow-y-auto w-full px-10">
          <div className=" py-10">
            <h3 className=" text-center text-5xl text-gray-600">REVIEW</h3>
            {product.reviews && product.reviews[0] ? (
              <div className=" flex  flex-wrap justify-between mt-5">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard review={review} />
                  ))}
              </div>
            ) : (
              <p>No Reviews Yet</p>
            )}
          </div>
        </section>
      </div>
      )}
    </div>
  );
};

export default ProductDetails;
