import { useState } from "react";
import { Form, Container } from "react-bootstrap";
import HeroSlider from "../components/HeroSlider";
import Categories from "../components/Categories";
import Products from "../pages/Products";

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <HeroSlider />
      <Categories />

      <Container className="mt-4">
        <Form.Control
          type="text"
          placeholder="Search furniture..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Container>

      <Products search={search} />
    </>
  );
};

export default Home;