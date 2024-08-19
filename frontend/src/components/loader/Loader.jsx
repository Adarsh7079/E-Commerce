
import {React, CSSProperties,useState} from 'react'
import MoonLoader  from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  
  
const Loader = () => {

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
  return (
    <MoonLoader
    color={color}
    loading={loading}
    cssOverride={override}
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  )
}

export default Loader