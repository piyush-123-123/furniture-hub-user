import { Container, Card, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import AddressForm from "../pages/AddressForm";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddresses, addressActions } from "../store/addressSlice";
import { useNavigate } from "react-router-dom";

const Address = () => {


    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const {
        addresses,
        selectedAddress,
        loading,
        error,
    } = useSelector((state) => state.address);

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);
    useEffect(() => {
        if (
            addresses.length > 0 &&
            !selectedAddress
        ) {
            dispatch(addressActions.selectAddress(addresses[0]));
        }
    }, [addresses, selectedAddress, dispatch]);


    return (
        <Container className="mt-4">
            <h2 className="mb-4">Select Delivery Address</h2>



            <Card className="p-3 mb-4 shadow">
                <h5>Saved Addresses</h5>

                {addresses.length === 0 ? (
                    <p>No saved addresses.</p>
                ) : (
                    addresses.map((address) => (
                        <Card key={address.id} className="p-3 mb-2">
                            <div className="d-flex align-items-start">

                                <Form.Check
                                    type="radio"
                                    name="selectedAddress"
                                    checked={selectedAddress?.id === address.id}
                                    onChange={() =>
                                        dispatch(addressActions.selectAddress(address))
                                    }
                                    className="me-3 mt-1"
                                />

                                <div>
                                    <h6>{address.fullName}</h6>

                                    <p>{address.phone}</p>

                                    <p>{address.address}</p>

                                    <p>
                                        {address.city} - {address.pincode}
                                    </p>
                                </div>

                            </div>
                        </Card>
                    ))
                )}
            </Card>



            <Card className="p-3 shadow">
                <div className="d-flex justify-content-between align-items-center">
                    <h5>Add New Address</h5>

                    <Button
                        variant="primary"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "Cancel" : "+ Add"}
                    </Button>
                </div>
                {showForm && <AddressForm onSuccess={() => setShowForm(false)} />}
            </Card>
            <div className="text-end mt-4">
                <Button
                    variant="success"
                    disabled={!selectedAddress}
                    onClick={() => navigate("/checkout")}
                >
                    Continue
                </Button>
            </div>
        </Container>
    );
};

export default Address;