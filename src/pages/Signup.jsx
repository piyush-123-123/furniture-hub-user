
import { Form, Container, Card, Button } from "react-bootstrap";
import { useState } from "react";
import { API_KEY } from "../services/firebase";
import {useNavigate,Link} from "react-router-dom";

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const isCorrect = email && confirmPassword === password && password;
    const navigate=useNavigate();


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const url =
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        const user = {
            email,
            password,
            returnSecureToken: true,
        };
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })
            if (!response.ok) {
                throw new Error("Signup Failed");
            }
            const data = await response.json();

            alert("Signup Successful");
            navigate("/login");



        

        }
        catch (err) {
            alert(err.message);
        }


    }



    return (
        <Container className="mt-5 w-50 ">
            <Card className="p-4 shadow">
                <h2 className="text-center mb-4">User Sign Up</h2>

                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>

                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>

                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>

                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" className="w-100" disabled={!isCorrect}>
                        Sign Up
                    </Button>
                    <p>
                        Already Have an Account?<Link to ="/login">Log In </Link>
                    </p>
                </Form>
            </Card>
        </Container>



    )
}
export default Signup;

