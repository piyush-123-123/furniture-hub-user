import { Form, Container, Card, Button } from "react-bootstrap";
import { useState } from "react";
import { API_KEY } from "../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();

        const url =
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
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
    throw new Error("Login Failed");
}
            const data = await response.json();
            alert("Login Successful");
            localStorage.setItem("token", data.idToken);
            localStorage.setItem("userId", data.localId);
          
            navigate("/");
        }
        catch (err) {
            alert(err.message);
        }
    }

    return (
        <Container className="mt-5 w-50 ">
            <Card className="p-4 shadow">
                <h2 className="text-center mb-4">User Log In</h2>

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


                    <Button type="submit" className="w-100" >
                        Log In
                    </Button>
                    <p>
                        Do not have an account? <Link to="/signup">SignUp</Link>
                    </p>
                </Form>
            </Card>
        </Container>

    )


}
export default Login;