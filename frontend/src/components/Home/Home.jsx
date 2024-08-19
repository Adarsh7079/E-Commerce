import React, { useEffect } from 'react'
import ProductCard from './ProductCard.jsx'
import {clearErrors, getProduct} from "../../redux/actions/productAction";
import {useSelector,useDispatch} from "react-redux"
import Loader from '../loader/Loader.jsx';
import { useAlert } from 'react-alert';

const Home = () => {
  const alert=useAlert()
  const dispatch=useDispatch();
  const {loading,error,products,productCount}=useSelector(state=>state.products)

  useEffect(()=>{
    if(error)
    {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct())
  },[dispatch,error]);
  
  
  return (
   <>
    <div className='flex  w-2/3 mx-auto py-10'>
        <section className=' w-full' >
             <div className=' w-full flex justify-center items-center '>
                <p className=' w-[400px] border-b-[3px] text-3xl text-gray-500  border-gray-200 text-center pb-2'>Featured Product</p>
             </div>

           {
            loading ?(<Loader/>):(
              <div className='flex gap-20 justify-between flex-wrap mt-20'>
          {
            products && products.map(product=>(
              <ProductCard product={product}/>
            ))
          }
           </div>
            )
           }
        </section>
    </div>
   </>
  )
}

export default Home