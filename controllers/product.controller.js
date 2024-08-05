import {Product }from "../models/product.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { Apifeatures } from "../utils/features.js"
   


//create product -- Admin 
export const  createProduct=asyncHandler(async(req,res,next)=>{
  
  req.body.user=req.user.id;
  
  const product=await Product.create(req.body);

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

  const productCount=await Product.countDocuments()
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
    return next(new ErrorHandler('Product Not found',404))
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
    return next(new ErrorHandler(' Product Not found',500))
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

//create new review and update the review
export const createProductReview=asyncHandler(async(req,res,next)=>{
  
  const{rating,comment,productId}=req.body;
  const review={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  };

  const product=await Product.findById(productId);

  const isReviewed=product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString());

  if(isReviewed){
    product.reviews.forEach((rev) => {
      if(rev.user.toString()===req.user._id.toString())
      {
        (rev.rating=rating),
        (rev.comment=comment)
      }
      
    });
  }else{
    product.reviews.push(review),
    product.numOfReviews=product.reviews.length
  }

  let avg=0;
  product.reviews.forEach((rev)=>{
    avg+=rev.rating;
  });
  
  product.ratings=
  avg/product.reviews.length;

  await product.save({validateBeforeSave:false});

  res.status(200).json({
    success:true,
    message:"review added"
  })
});

export const getProductReviews=asyncHandler(async(req,res,next)=>{

  const product=await Product.findById(req.query.id);

  if(!product){
    return next(new ErrorHandler('Product Not found',404))
  }

  
  res.status(200).json({
    success:true,
    reviews:product.reviews
  });
});

//Delete Review

export const delteProductReviews=asyncHandler(async(req,res,next)=>{

  const product=await Product.findById(req.query.productId);

  if(!product){
    return next(new ErrorHandler('Product Not found',404))
  }

  const reviews=product.reviews.filter((rev)=>rev._id.toString() !==req.query.id.toString());


  let avg=0;

  reviews.forEach((rev)=>{
    avg+=rev.rating;
  });
  
  const ratings=avg/reviews.length;

  const numOfReviews=reviews.length;

  await product.save({validateBeforeSave:false});

  await product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numOfReviews
  },{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })

  res.status(200).json({
    success:true,
    
  });
});