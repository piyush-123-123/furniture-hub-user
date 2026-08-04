import { useEffect, useState } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi"
import { DATABASE_URL } from "../services/firebase";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
} from "react-bootstrap";


const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const { sendRequest, loading, error } = useApi();

    const [searchParams] = useSearchParams();

    const category = searchParams.get("category");
    const filteredProducts = category
        ? products.filter((product) => product.category === category)
        : products;
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await sendRequest({
                    url: `${DATABASE_URL}/products.json`,
                });

                if (!data) {
                    setProducts([]);
                    return;
                }

                const loadedProducts = [];

                for (const key in data) {
                    loadedProducts.push({
                        id: key,
                        ...data[key],
                    });
                }

                setProducts(loadedProducts);
            } catch (err) {
                alert(err.message);
            }
        };

        fetchProducts();
    }, [sendRequest]);
    if (loading) {
        return <h3>Loading...</h3>;
    }

    if (error) {
        return <h3>{error}</h3>;
    }


    return (
        <Container className="mt-4">
            <h2>Products</h2>
            <Row className="mt-4">
                {filteredProducts.map((product) => (
                    <Col md={3} key={product.id} className="mb-4">
                        <Card className="h-100 shadow">
                            <Card.Img
                                variant="top"
                                src={product.image}
                                style={{
                                    height: "220px",
                                    objectFit: "cover",
                                }}
                            />

                            <Card.Body >
                                <Card.Title>{product.title}</Card.Title>

                                <Card.Text>₹{product.price}</Card.Text>
                                <Button
                                    variant="outline-dark"
                                  
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );

};

export default Products;