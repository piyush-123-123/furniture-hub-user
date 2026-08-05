import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addAddress } from "../../store/addressSlice";

const AddressForm = () => {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  return (
    <Form>
     
    </Form>
  );
};

export default AddressForm;