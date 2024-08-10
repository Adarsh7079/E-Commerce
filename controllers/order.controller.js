import { Order } from "../models/order.models.js";
import { Product } from "../models/product.models.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const newOrder = asyncHandler(async (req, res, next) => {
  const { 
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order=await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id
  });

  res.status(201).json({
    success:true,
    order
  })
});

//get single order
export const getSingleOrder=asyncHandler(async(req,res,next)=>{

  const order=await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if(!order){
    return next(new ErrorHandler("Order not found with this Id",404))
  }

  res.status(200).json({
    success:true,
    order
  })
})

//Get Loggesd In User Orders 
export const myOrders=asyncHandler(async(req,res,next)=>{

  const orders=await Order.find({user:req.user._id});

  if(!orders){
    return next(new ErrorHandler("Order not found with this Id",404))
  }

  res.status(200).json({
    success:true,
    orders
  })
})


//Get All Orders -- Admin
export const getAllOrders=asyncHandler(async(req,res,next)=>{

  const orders=await Order.find();

  let totalAmount=0;
  orders.forEach((order) => {
    totalAmount+=order.totalAmount;
  });


  res.status(200).json({
    success:true,
    orders
  })
});



//Update  Orders Status -- Admin
export const updateOrder=asyncHandler(async(req,res,next)=>{

  const order=await Order.findById(req.params.id);

  if(order.orderStatus==="Delivered"){
    return next(new ErrorHandler("You have already delivered this ",404))
  }

  order.orderItems.forEach(async(order)=>{
    await updateStock(order.product,order.quantity);  
  });

  order.orderStatus=req.body.status;

  if(req.body.status=="Delivered"){
    order.deliveredAt=Date.now()

  }
  await order.save({validateBeforeSave :false})

  res.status(200).json({
    success:true,
    order
  })
});



//Delte Orders -- Admin
export const delteOrder=asyncHandler(async(req,res,next)=>{

  const order=await Order.findById(req.params.id);

  if(!order){
    return next(new ErrorHandler("Order not found with this Id",404))
  }
  await order.deleteOne(order._id);
  res.status(200).json({
    success:true,
    message:"Order delete Successfully"
  })
});

async function updateStock(id,quantity) {

  const product=await Product.findById(id);
  product.stock-=quantity;

  await product.save({validateBeforeSave:false});
}