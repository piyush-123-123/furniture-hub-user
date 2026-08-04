
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { DATABASE_URL } from "../services/firebase";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



import {
    Container,
    Row,
    Col,
    Card,
    Button,
} from "react-bootstrap";

const ProductDetails = () => {
    const navigate = useNavigate();
    const items = useSelector((state) => state.cart.items);

useEffect(() => {
  console.log("Cart Items:", items);
}, [items]);
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();

    const { sendRequest, loading, error } = useApi();

    const { id } = useParams();
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await sendRequest({
                    url: `${DATABASE_URL}/products/${id}.json`,
                });

               setProduct({
  id,
  ...data,
});
            } catch (err) {
                alert(err.message);
            }
        };

        fetchProduct();

    }, [id, sendRequest]);


    if (loading) {
        return <h3>Loading...</h3>;
    }

    if (error) {
        return <h3>{error}</h3>;
    }

    if (!product) {
        return <h3>Product Not Found</h3>;
    }
    const addToCartHandler = () => {
 
 console.log("Dispatching:", product);

  dispatch(cartActions.addItem(product));

  console.log("Dispatched");

  alert("Product Added to Cart");
};




    return (
        <Container className="mt-4">
            <Row>
                <Col md={6}>
                    <img
                        src={product.image}
                        alt={product.title}
                        style={{
                            width: "100%",
                            borderRadius: "10px",
                        }}
                    />
                </Col>

                <Col md={6}>
                    <h2>{product.title}</h2>
                    <h4>₹{product.price}</h4>
                    <p className="mt-3">
                        {product.description}
                    </p>
                    <h5 className={product.inStock ? "text-success" : "text-danger"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                    </h5>
                    <Button
                        variant="primary"
                        className="mt-3"
                        onClick={addToCartHandler}
                    >
                        Add to Cart
                    </Button>

                    <h5>
                        Quantity: {product.quantity}
                    </h5>
                </Col>
            </Row>
            <Button
  variant="success"
  className="ms-2 mt-3"
  onClick={() => navigate("/cart")}
>
  Go to Cart
</Button>
        </Container>
    );
};

export default ProductDetails;
