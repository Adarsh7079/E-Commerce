import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ALL_CLEAR_ERRORS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    console,log("run rhiss ");
    dispatch({type:LOGIN_REQUEST})

    const config={headers:{"content-Type":"application/json"}};

    const {data}=await axios.post(`http://localhost:4000/api/v1/login`,{email,password},config)

    dispatch({type:LOGIN_SUCCESS,payload:data.user})
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response });
  }
};

export const register=(userData)=>async (dispatch)=>{
  try {
    console.log("i am here in action : ",userData)
    dispatch({type:REGISTER_USER_REQUEST})

    
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const {data}=await axios.post(`http://localhost:4000/api/v1/register`,userData,config)

    dispatch({type:REGISTER_USER_SUCCESS,payload:data.user})
    
  } catch (error) {
    dispatch({type:REGISTER_USER_FAIL,payload:error})
    console.log('erere',error)
  }
}

//it will clear or null the error
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: ALL_CLEAR_ERRORS });
  };
  
