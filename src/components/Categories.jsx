import { Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Categories = () => {
    const navigate = useNavigate();
    const categories = [
        "1 Door Wardrobe",
        "2 Door Wardrobe",
        "Sliding Wardrobe",
        "Sofa",
        "Bed",
        "Dining Table",
        "Chair",
        "Study Table",
    ];
    return (
        <>
            <h2 className="text-center mt-5 mb-4">
                Shop by Category
            </h2>

            <Row>
                {categories.map((category) => (
                    <Col md={3} className="mb-4" key={category}>
                        <Card
                            className="text-center p-3 shadow"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                navigate(`/products?category=${encodeURIComponent(category)}`)
                            }
                        >
                            <Card.Body>
                                <Card.Title>{category}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>

                ))}

            </Row>
        </>
    );
};

export default Categories;