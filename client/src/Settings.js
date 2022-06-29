import React, { useState, useEffect } from "react";
// import { useForm } from 'react-hook-form';
import Axios from "axios";
import {
  Button,
  Form,
  InputGroup,
  Row,
  Alert,
  Navbar,
  Container,
  Nav,
  Card,
} from "react-bootstrap";
import settings from "./settings.json"; // Set server url here
import bcrypt from "bcryptjs";

function Settings() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    permissionLevel: "",
  });
  const [validated, setValidated] = useState(false);
  const [loggedIn, setLoggedIn] = useState(Boolean);
  const [permissionLevel, setPermissionLevel] = useState("");
  const [userList, setUserList] = useState([]);

  const [loaded, setLoaded] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    console.log("Login submitted");
    if (form.checkValidity() === false) {
      console.log(formData);

      event.stopPropagation();
    }

    setValidated(true);
    addUser();
  };

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      const loggedInUser = JSON.parse(userStorage);
      // setUser(foundUser);
      console.log("local storage: ", loggedInUser);

      setLoggedIn(true);
      setPermissionLevel(loggedInUser.permissionlevel);

      getAllUsers();

      
    }
    if (!userStorage) {
      alert("Du är inte inloggad.");
      window.location.replace("/login");
    }
  }, []);

  function addUser() {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(formData.password, salt, function(err, hash) {
        console.log("email: ", formData.email, " hash: ", hash);
        // Store hash in your password DB.

        console.log("försöker skicka");
        console.log("permission send", formData.permissionLevel);

        Axios.post(settings.SERVER_URL + "/api/user/add", {
          name: formData.name,
          email: formData.email,
          hash: hash,
          permissionLevel: formData.permissionLevel,
        })
          .then(() => {
            console.log("new user added");
            window.location.reload(false);
          })
          .catch((error) => {
            console.log("det gick inte att skicka");
            console.log(error.message);
            if (error.message === "Request failed with status code 406") {
              alert("Error 406. Testa att skicka igen.");
            }
          });
      });
    });
  }

  function getAllUsers(){
    Axios.get(settings.SERVER_URL + "/api/listUsers").then((response) => {
      
        
        const users = response.data;
        delete response.data[0].hash;
        console.log(users);
        setUserList(users);
    });
  }

  

  if (loggedIn === true && permissionLevel === "3") {
    return (
      <>
        <Navbar bg="light" variant="light">
          <Container fluid>
            <Navbar.Brand href="#home">React Ticket</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Hem</Nav.Link>
              <Nav.Link href="/settings">Inställningar</Nav.Link>
              {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
          </Container>
        </Navbar>

        <Alert key="warning" variant="warning" className="m-1">
          Denna applikation är fortfarande inte färdig, så den kanske inte
          fungerar fullt som den ska.
        </Alert>
        {/* 
          <Navbar className="container-fluid text-bg-dark p-3">
            <Container className="container-fluid">
              <Navbar.Brand href="/">React Ticket</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="m-2">
                  {navUserState} {username}
                </Navbar.Text>
                <Button variant="primary" href={navButtonLink}>
                  {navButtonText}
                </Button>
              </Navbar.Collapse>
            </Container>
          </Navbar> */}

        {/* <Button variant="warning" onClick={checkUser}>Test check user</Button> */}

        <div className="jumbotron m-3"> 
          <h1 className="display-4">Inställningar</h1>
          {/* <p className="lead">Det här är ett egenbyggt ticket system av Emil Zackrisson</p> */}
          <hr className="my-4" />
        </div>

        <section className="container border p-3 rounded">
          <h4 className="display-6 m-3 ">Användare</h4>
          <section className="container border p-3 rounded">
          <h4 className="display-6 m-3 ">Lägg till Användare</h4>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="container-xl m-3"
            >
              <Form.Group md="4" controlId="validationName">
                <Form.Label>För och efternamn</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Ex. Anders Andersson"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Du måste ange ditt lösenord.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Row className="mb-3">
                <Form.Group md="4" controlId="validationEmail">
                  <Form.Label>E-post</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Ex. anders.andersson@gmail.com"
                      aria-describedby="inputGroupPrepend"
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Du måste ange din E-post.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group md="4" controlId="validationPassword">
                  <Form.Label>Lösenord</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-key"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Lösenord"
                      aria-describedby="inputGroupPrepend"
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Du måste ange ditt lösenord.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tillstånd</Form.Label>
                  <Form.Select
                    aria-label="Tillstånd"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        permissionLevel: e.target.value,
                      })
                    }
                  >
                    <option>Öppna menyn för att välja</option>
                    <option value="1">1 - Användare</option>
                    <option value="3">3 - Admin</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Button type="submit">Lägg till användare</Button>
              {/* <Button type="submit">Skicka</Button> */}
              {/* <Button onClick={updateList} className="m-2 btn-warning">test ladda lista</Button> */}

              {/* <Button onClick={testSend}>Testa</Button> */}
            </Form>
          </section>
          <section className="userList container border p-3 rounded my-3">

        <h4 className="display-6 m-3 ">Alla användare</h4>
          {userList.map((val) => {
            if(val.permissionlevel === 1){
              const permissionLevelText = "1 - Användare";
            }
            if(val.permissionlevel === 3){
              const permissionLevelText = "3 - Admin";
            }
      
            const timestamp = Date(val.lastLogin)
            const date = new Date(timestamp).toLocaleString("sv-SE");

            return(
              <Card className="my-3">
                <Card.Body>
                  <Card.Title>{val.name}</Card.Title>
                  <Card.Text>E-post: {val.email}</Card.Text>
                  <Card.Text>Permission Level: {val.permissionlevel}</Card.Text>
                  <Card.Text>Senaste inloggningen: {date}</Card.Text>
                </Card.Body>
              </Card>
            )
          })}
        </section>
        </section>

        
      </>
    );
  }
  if (permissionLevel !== "3") {
    console.log(permissionLevel);
    return (
      <>
        <h1>Error - Not Allowed</h1>
        <p>You have not the permission to access the settings.</p>
      </>
    );
  }
}

export default Settings;
