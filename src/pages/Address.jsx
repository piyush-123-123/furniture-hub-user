import { Container, Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { DATABASE_URL } from "../services/firebase";


const Address = () => {

    const [addresses, setAddresses] = useState([]);
const [showForm, setShowForm] = useState(false);

const { sendRequest } = useApi();
useEffect(() => {
  const fetchAddresses = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const data = await sendRequest({
        url: `${DATABASE_URL}/addresses/${userId}.json`,
      });

      if (!data) {
        setAddresses([]);
        return;
      }

      const loadedAddresses = [];

      for (const key in data) {
        loadedAddresses.push({
          id: key,
          ...data[key],
        });
      }

      setAddresses(loadedAddresses);
    } catch (err) {
      alert(err.message);
    }
  };

  fetchAddresses();
}, [sendRequest]);

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

      <p className="mb-1">{address.phone}</p>

      <p className="mb-1">{address.address}</p>

      <p>
        {address.city} - {address.pincode}
      </p>
    </Card>
  ))
)}
      </Card>

   

      <Card className="p-3 shadow">
        <h5>Add New Address</h5>
      </Card>
    </Container>
  );
};

export default Address;