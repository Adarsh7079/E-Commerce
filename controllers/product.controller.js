import {Product }from "../models/product.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Apifeatures } from "../utils/features.js"
   


//create product -- Admin 
export const createProduct=asyncHandler(async(req,res,next)=>{
  const product=await Product.create(req.body)
  res.status(201).json({
      success:true,
      product
  })
}
)

//get all product
export const getAllProducts=asyncHandler(async(req,res)=>{
 
  //this feature allow to show limited itemsd on page using pagination
  const resultPerPage=5;

  const productCount=await Product.countDocument()
  const Apifeature=new Apifeatures(Product.find(),req.query)
  .search().filter().pagination(resultPerPage)

  const products= await Apifeature.query
  res.status(200).json({
    success:true,
    products,
    productCount
  })
}
)
//update product -- Admin

export const updatePoduct=asyncHandler(async(req,res,next)=>{
  //  const product=await Product
  let product=Product.findById(req.params.id);

  if(!product)
  {
   return res.status(404).json({
      success:false,
      message:"not found"
    })
  }
  product=await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })
  res.status(200).json({
    success:true,
    product
  })
})

//delete product 
export const deleteProduct=asyncHandler(async(req,res,next)=>{
  const product=await Product.findById(req.params.id);
  

  if(!product){
    return res.status(500).json({
      success:true,
      message:"product not found"
    })
  }
  await Product.deleteOne(product._id);
  res.status(200).json({
    success:true,
    message:"Product delete successfully"
  })
}
)
//product details 

export const getProductDetails=asyncHandler(async(req,res,next)=>{
  const product=await Product.findById(req.params.id);

  if(!product){
    return next(new ErrorHandler(' Product Not found',404))
  }
  res.status(200).json({
    success:true,
    product
  })
})