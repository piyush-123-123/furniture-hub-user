
import {
    Navbar,
    Container,
    Form,
    FormControl,
    Button,
    Nav,
} from "react-bootstrap";

import { Link } from "react-router-dom";

const Header = () => {


    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    🛋 Furniture Hub
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
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
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )


}
export default Header;