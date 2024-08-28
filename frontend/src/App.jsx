import {React} from 'react'
import Header  from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import {Route,Routes} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import ProductCardDetails from "./components/Product/ProductCardDetails.jsx"
import Products from './components/products/Products.jsx';
import Search from './components/products/Search.jsx';
import Pagination from "react-js-pagination";
import LoginSignUp from './components/user/LoginSignUp.jsx';


const App = () => {
 
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginSignUp/>}/>
        <Route path='/product/:id' element={<ProductCardDetails/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:keyword' element={<Products/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
     
      {/* <Footer/> */}
    </>
  )
}

export default App