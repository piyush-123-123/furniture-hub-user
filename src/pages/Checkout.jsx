import { Container, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    fetchAddresses,
    addressActions,
} from "../store/addressSlice";
import { placeOrder } from "../store/orderSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/cartSlice";
import { DATABASE_URL } from "../services/firebase";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const items = useSelector((state) => state.cart.items);

    const {
        addresses,
        selectedAddress,
    } = useSelector((state) => state.address);

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);

    useEffect(() => {
        if (addresses.length === 0 || selectedAddress) return;

        const savedId = localStorage.getItem("selectedAddressId");

        const savedAddress = addresses.find(
            (address) => address.id === savedId
        );

        if (savedAddress) {
            dispatch(addressActions.selectAddress(savedAddress));
        } else {
            dispatch(addressActions.selectAddress(addresses[0]));
        }
    }, [addresses, selectedAddress, dispatch]);

    const totalAmount = items.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );

    if (items.length === 0) {
        return (
            <Container className="mt-4">
                <h3>Your cart is empty.</h3>
            </Container>
        );
    }
    const placeOrderHandler = async () => {
        try {
            const order = {
                name: selectedAddress.fullName,
                phone: selectedAddress.phone,
                address: selectedAddress.address,
                city: selectedAddress.city,
                pincode: selectedAddress.pincode,

                items,
                totalAmount,
                paymentMethod: "Cash On Delivery",
                status: "Placed",
                orderDate: new Date().toISOString(),
            };

            await dispatch(placeOrder(order)).unwrap();
            for (const item of items) {
                const newQuantity = item.stock - item.quantity;

                await fetch(`${DATABASE_URL}/products/${item.id}.json`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        quantity: newQuantity,
                        inStock: newQuantity > 0,
                    }),
                });
            }
            await dispatch(clearCart()).unwrap();

            alert("Order Placed Successfully");

            navigate("/orders");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Order Summary</h2>

            <Card className="p-4 shadow">
                <h4>Products</h4>

                {items.map((item) => (
                    <Card key={item.id} className="p-2 mb-2">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h6>{item.title}</h6>
                                <small>Qty: {item.quantity}</small>
                            </div>

                            <h6>
                                ₹{Number(item.price) * item.quantity}
                            </h6>
                        </div>
                    </Card>
                ))}

                <hr />

                <h4>Delivery Address</h4>

                <Card className="p-3">
                    <h6>{selectedAddress?.fullName}</h6>

                    <p>{selectedAddress?.phone}</p>

                    <p>{selectedAddress?.address}</p>

                    <p>
                        {selectedAddress?.city} - {selectedAddress?.pincode}
                    </p>
                </Card>

                <hr />

                <h3 className="mt-3">
                    Total : ₹{totalAmount}
                </h3>

                <Button
                    variant="success"
                    className="mt-3"
                    onClick={placeOrderHandler}
                >
                    Place Order
                </Button>
            </Card>
        </Container>
    );
};

export default Checkout;