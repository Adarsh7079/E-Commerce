import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./redux/store.js"
import {positions,transitions,Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic"

// const options={
//   timeout:5000,
//   position:positions.BOTTOM_CENTER,
//   transition:transitions.SCALE
// }
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
createRoot(document.getElementById('root')).render(
 <Provider store={store}>
   <AlertProvider template={AlertTemplate} {...options}>
   <Router>
    <App/>
  </Router>
   </AlertProvider>
 </Provider>
)
