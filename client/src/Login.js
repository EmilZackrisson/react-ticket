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
  Modal,
} from "react-bootstrap";
import settings from "./settings.json"; // Set server url here
import bcrypt from "bcryptjs";
// import {} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [username, setUsername] = useState("");
  const [navButtonLink, setNavButtonLink] = useState("");
  const [navButtonText, setNavButtonText] = useState("");
  const [navUserState, setNavUserState] = useState("");
  const [navHello, setNavHello] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log("Login submitted");
    if (form.checkValidity() === false) {
      console.log(formData);
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    // submitIssue();
    checkUser();
  };

  function alreadyLoggedIn() {
    alert("Du är redan inloggad. Du kommer att skickas till startsidan.");
    window.location.replace("/");
  }

  useEffect(() => {
    const loggedIn = localStorage.getItem("user");
    if (loggedIn) {
      alreadyLoggedIn();
    }
    if (!loggedIn) {
      setNavButtonLink("/login");
      setNavButtonText("Logga in");
      setNavHello("Hej Världen!");
    }
  });

  function checkUser() {
    // var res = "";
    // const populateData = (data) => { setHash(data) }
    // console.log(response.data[0].hash)

    // addUser(formData.email, formData.password);

    var email = formData.email;
    var password = formData.password;

    if ((email !== "") | (password !== "")) {
      //Ladda användare från databas
      Axios.post(settings.SERVER_URL + "/api/user", {
        email: email,
      }).then(function (response) {
        console.log(response.data);

        console.log(typeof response.data);

        // Check if email exists in database
        if (response.data.length === 0) {
          alert("Fel inloggningsuppgifter.");
        }

        if (response.data.length !== 0) {
          // alert("E-post adressen är rätt.")

          const hash = response.data[0].hash;

          bcrypt.compare(password, hash).then((res) => {
            // res === true
            console.log("password ", res);

            if (res === true) {
              delete response.data[0].hash;
              localStorage.setItem("user", JSON.stringify(response.data[0]));

              Axios.post(settings.SERVER_URL + "/api/userLoggedIn", {
                email: response.data[0].email,
              }).then(function (response) {
                console.log("inserted time");
              });
              alert("Du kommer nu att skickas till startsidan.");
              window.location.replace("/");
            } else {
              alert("Fel inloggningsuppgifter.");
            }
          });
        }
      });
    } else {
      alert("Du måste skiva in både e-post och lösenord");
    }
  }

  return (
    <>
      <Alert key="warning" variant="warning" className="m-1">
        Denna applikation är fortfarande inte färdig, så den kanske inte
        fungerar fullt som den ska.
      </Alert>

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
      </Navbar>

      {/* <Button variant="warning" onClick={checkUser}>Test check user</Button> */}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="container-xl mb-5 border p-3 rounded"
      >
        <Row className="mb-3">
          <Form.Group md="4" controlId="validationEmail">
            <Form.Label>E-post</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="E-post"
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
              {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
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
        </Row>
        <Button type="button" onClick={checkUser}>
          Logga In
        </Button>
        {/* <Button variant="outline-secondary" className="mx-2">
          Glömt lösenord?
        </Button> */}
      </Form>
    </>
  );
}

export default Login;
