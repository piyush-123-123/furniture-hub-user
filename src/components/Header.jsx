
import {
    Navbar,
    Container,
    Form,
    FormControl,
    Button,
    Nav,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
   
const logoutHandler = () => {
  localStorage.removeItem("token");
  navigate("/");
};


    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    🛋 Furniture Hub
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
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