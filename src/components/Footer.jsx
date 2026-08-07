import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <Container className="text-center">
        <p className="mb-1">
          © 2026 Furniture Hub. All Rights Reserved.
        </p>

        <small>
          Built with React, Redux Toolkit & Firebase
        </small>
      </Container>
    </footer>
  );
};

export default Footer;