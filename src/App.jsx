import {Route,Routes} from "react-router-dom";
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";
import Home from "../src/pages/Home";
import Header from "../src/components/Header";

const App=()=>{

  return (
  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  
  )


}

export default App;
