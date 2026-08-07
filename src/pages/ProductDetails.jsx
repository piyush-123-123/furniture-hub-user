
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { DATABASE_URL } from "../services/firebase";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";



import {
    Container,
    Row,
    Col,
    Button,
} from "react-bootstrap";

const ProductDetails = () => {
    const navigate = useNavigate();
   
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


        dispatch(addToCart(product));


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
                        disabled={product.quantity===0}
                    >
                        Add to Cart
                    </Button>

                    <h5>
                        Quantity: {product.quantity}
                    </h5>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;
