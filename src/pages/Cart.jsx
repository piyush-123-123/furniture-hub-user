import { useSelector } from "react-redux";
import {
    Container,
    Card,
    Row,
    Col,
    Button,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
} from "../store/cartSlice";
import { useNavigate } from "react-router-dom";


const Cart = () => {

    const items = useSelector((state) => state.cart.items);
    const totalAmount = items.reduce((total, item) => {
        return total + Number(item.price) * item.quantity;
    }, 0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Shopping Cart</h2>

            {items.length === 0 ? (
                <h4>Your cart is empty.</h4>
            ) : (
                <Row>
                    {items.map((item) => (
                        <Col md={6} key={item.id} className="mb-3">
                            <Card className="p-3 shadow">
                                <h5>{item.title}</h5>

                                <p>₹{item.price}</p>

                                <p>Quantity: {item.quantity}</p>
                                <div className="d-flex gap-2">
                                    <Button
                                        variant="secondary"
                                        onClick={() =>
                                            dispatch(decreaseQuantity(item.id))
                                        }
                                    >
                                        -
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        onClick={() =>
                                            dispatch(increaseQuantity(item.id))
                                        }
                                    >
                                        +
                                    </Button>

                                    <Button
                                        variant="danger"
                                        onClick={() =>
                                            dispatch(removeItem(item.id))
                                        }
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                    <h3 className="text-end mt-4">
                        Total: ₹{totalAmount}
                    </h3>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <Button
                            variant="danger"
                            onClick={() => dispatch(clearCart())}
                        >
                            Clear Cart
                        </Button>

                        <Button
                            variant="success"
                            onClick={() => navigate("/address")}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </Row>
            )}
        </Container>
    );
};

export default Cart;
