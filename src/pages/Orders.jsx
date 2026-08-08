import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/orderSlice";
import { Container, Card } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

const Orders = () => {
    const dispatch = useDispatch();

    const orders = useSelector((state) => state.order.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    return  ( 
        <Container className="mt-4">
            <h2>My Orders</h2>

            {orders.length === 0 ? (
                <h4>No Orders Found</h4>
            ) : (

                orders.map((order) => (
                    <Card key={order.id} className="p-3 mb-3">
                        <h5>Status: {order.status}</h5>

                        <p>Payment: {order.paymentMethod}</p>

                        <p>Total: ₹{order.totalAmount}</p>

                        <p>Date: {new Date(order.orderDate).toLocaleString()}</p>

                        <hr />

                        {order.items.map((item) => (
                            <div key={item.id}>
                                <strong>{item.title}</strong>

                                <p>
                                    Qty: {item.quantity} | ₹
                                    {Number(item.price) * item.quantity}
                                </p>
                                <p>
                              
                                </p>
                            </div>
                        ))}
                    </Card>
                ))
            )}
        </Container>
    );
};

export default Orders;