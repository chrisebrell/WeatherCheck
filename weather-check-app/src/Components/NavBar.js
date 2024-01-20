//Code imported from React Bootstrap Documentation

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles.css'

function NavBar() {
return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
        <Navbar.Toggle style={{ visibility:"hidden" }} />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link className="navbarItem" href="/">Home</Nav.Link>
            <Nav.Link className="navbarItem" href="">About</Nav.Link>
            <Nav.Link className="navbarItem" href="">Add Location</Nav.Link>
            <Nav.Link className="navbarItem" href="">Remove Location</Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
);
}

export default NavBar