import { Link } from 'react-router-dom';
import { Button, Container, Form, Nav, Navbar,NavItem} from 'react-bootstrap';


function navbar() {
  return (
    <Navbar expand="lg" className="bg-info">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          ><NavItem className="p-2">
              <Link to="/home">Home</Link>
            </NavItem>
            <NavItem className="p-2">
              <Link to="/login">Login</Link>
            </NavItem>
            {/* <Nav.Link><Link to="/home">Home</Link></Nav.Link>
            <Nav.Link><Link to="/login">Login</Link></Nav.Link> */}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success bg-primary text-white">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar;