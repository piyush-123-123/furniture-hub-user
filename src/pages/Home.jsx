import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import Categories from "../components/Categories";
import Products from "../pages/Products";
import {useNavigate} from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

  return (
    <>
      <Header />
      <HeroSlider />
      <Categories />
      <Products />


    </>
  );
};

export default Home;