import React, { useState } from "react";
import {
    Button,
    Alert,
    Card,
    Form,
    FormGroup,
    InputGroup,
    Row,
    Container,
    Nav,
  } from "react-bootstrap";

function Navbar(){
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [navButtonLink, setNavButtonLink] = useState("");
    const [navButtonText, setNavButtonText] = useState("");
    const [navUserState, setNavUserState] = useState("");
    const [navHello, setNavHello] = useState("");


    const loggedIn = localStorage.getItem("user");
    if (loggedIn) {
      const loggedInUser = JSON.parse(loggedIn);

      setNavButtonLink("/logout");
      setNavButtonText("Logga ut");
    }
    if (!loggedIn) {
        setNavButtonLink("/login");
        setNavButtonText("Logga in");
      }

    return(
        <>
        <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">React Ticket</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Hem</Nav.Link>
              <Nav.Link href="/settings">Inställningar</Nav.Link>
              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link> */}
            </Nav>
            <Form className="d-flex">
            <Navbar.Text className="mx-2">
              {navUserState} {username}
            </Navbar.Text>
              <Button variant="primary" href={navButtonLink}>
              {navButtonText}
            </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Alert key="warning" variant="warning" className="m-1">
        Denna applikation är fortfarande inte färdig, så den kanske inte
        fungerar fullt som den ska.
      </Alert>
        </>
    )
    
}

export default Navbar;