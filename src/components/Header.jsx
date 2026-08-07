import {
    Navbar,
    Container,
    Button,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const items = useSelector((state) => state.cart.items);

    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
    };


    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    🛋 Furniture Hub
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    {token && (
                        <Button
                            as={Link}
                            to="/cart"
                            variant="outline-light"
                            className="me-2"
                        >
                            🛒 Cart ({items.length})
                        </Button>


                    )}
                    {token && (
                        <Button
                            as={Link}
                            to="/orders"
                            variant="outline-light"
                            className="me-2"
                        >
                            📦 Orders
                        </Button>
                    )}
                    {token ? (
                        <Button variant="danger" onClick={logoutHandler}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button
                                as={Link}
                                to="/login"
                                variant="outline-light"
                                className="me-2"
                            >
                                Login
                            </Button>

                            <Button
                                as={Link}
                                to="/signup"
                                variant="warning"
                            >
                                Register
                            </Button>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )


}
export default Header;