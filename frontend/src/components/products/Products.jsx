import React, { useEffect, useState } from "react";
import { clearErrors, getProduct } from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loader/Loader.jsx";
import ProductCard from "../Home/ProductCard.jsx";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import "./Products.css";

const categories=[
  "Laptop",
  "Footwar",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones"
]

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category,setCategory] = useState("");
  const[ratings,setRatings]=useState(0)

  const { 
    products, 
    error,
    loading, 
    productsCount, 
    resultPerPage,
    filteredProductsCount
   } =
    useSelector((state) => state.products);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage,price,category,ratings));
  }, [dispatch, keyword, currentPage,price,category,ratings]);

  let count=filteredProductsCount;
  return (
    <div className=" flex">
      {/* Filter box */}
      <section className=" mt-32">
        <div className=" px-10 w-[300px]">
          <Typography>Price</Typography>
          <Slider
            value={price}
            onChange={(e, newValue) => setPrice(newValue)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={25000}
          />
        </div>
        <div className="px-10">
          <Typography>Categories</Typography>
          <ul >
            {
              categories.map((category)=>(
                <li
                 className=" text-gray-500 cursor-pointer"
                 key={category}
                 onClick={()=>setCategory(category)}>
                  {category}
                </li>
              ))
            }
          </ul>
          <fieldset className=" border-2 border-gray-600 p-2">
            <Typography component="legend">Rating Above</Typography>
            <Slider
            value={ratings}
            onChange={(e,newRating)=>{
              setRatings(newRating)
            }}
            aria-labelledby="continuos-slider"
            min={0}
            max={5}
            />
          </fieldset>
        </div>
      </section>
      <div className="w-2/3 mx-auto">
        <section>
          <div className="w-full flex justify-center items-center mt-5">
            <p className="w-[400px] border-b-[3px] text-3xl text-gray-500 border-gray-200 text-center pb-2">
              Products
            </p>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="flex flex-wrap gap-14 py-24">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          )}
        </section>

        <section>
          {resultPerPage < count && (
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="First"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          )}
          
        </section>
      </div>
    </div>
  );
};

export default Products;
