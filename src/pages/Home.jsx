import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import Categories from "../components/Categories";
import Products from "../pages/Products";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";

const Home = () => {
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