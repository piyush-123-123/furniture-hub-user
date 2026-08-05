import { Container, Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import AddressForm from "../pages/AddressForm";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddresses } from "../store/addressSlice";


const Address = () => {


    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();

    const { addresses, loading, error } = useSelector(
        (state) => state.address
    );

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);


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
                            <h6>{address.fullName}</h6>

                            <p>{address.phone}</p>

                            <p>{address.address}</p>

                            <p>
                                {address.city} - {address.pincode}
                            </p>
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
        </Container>
    );
};

export default Address;