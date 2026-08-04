import {Route,Routes} from "react-router-dom";
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";
import Home from "../src/pages/Home";
import  Products from "../src/pages/Products";
import ProductDetails from "../src/pages/ProductDetails";
import ProtectedRoute from "./components/ProtectedRoute";

const App=()=>{

  return (
  
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/products" element={<Products />} />
  <Route
  path="/product/:id"
  element={
    <ProtectedRoute>
      <ProductDetails />
    </ProtectedRoute>
  }
/>
  
</Routes>
  
  )


}

export default App;
