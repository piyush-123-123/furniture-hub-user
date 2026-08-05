import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addAddress } from "../store/addressSlice";

const AddressForm = ({onSuccess}) => {
    const dispatch = useDispatch();

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const submitHandler = async (e) => {
  e.preventDefault();

  if (
    !fullName.trim() ||
    !phone.trim() ||
    !address.trim() ||
    !city.trim() ||
    !pincode.trim()
  ) {
    alert("Please fill all fields");
    return;
  }

  try {
    await dispatch(
      addAddress({
        fullName,
        phone,
        address,
        city,
        pincode,
      })
    ).unwrap();

onSuccess();

    alert("Address Saved Successfully");

    setFullName("");
    setPhone("");
    setAddress("");
    setCity("");
    setPincode("");
  } catch (err) {
    alert(err.message || "Failed to save address");
  }
};

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>

                <Form.Control
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter Full Name"
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>

                <Form.Control
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter Phone Number"
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>

                <Form.Control
                    as="textarea"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>

                <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>

                <Form.Control
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                />
            </Form.Group>
            <Button type="submit" variant="success">
                Save Address
            </Button>

        </Form>
    );
};

export default AddressForm;