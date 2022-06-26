import React, { useEffect, useState } from "react";
// import { useForm } from 'react-hook-form';
import "./App.css";
import Axios from "axios";
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
  Navbar
} from "react-bootstrap";
import classNames from "classnames";
import settings from "./settings.json"; // Set server url here
// import Navbar from "./Navbar";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [issuesList, setIssuesList] = useState([]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(Boolean);
  const [navButtonLink, setNavButtonLink] = useState("");
  const [navButtonText, setNavButtonText] = useState("");
  const [navUserState, setNavUserState] = useState("");
  const [navHello, setNavHello] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    category: "",
  });

  const debug = true;
  const categoriesArray = [
    "Klicka för att välja kategori",
    "React Ticket",
    "Home Assistant",
    "zServer",
    "Docker",
    "Berit",
    "Alice Home Assistant",
    "Alice Lägenhet",
    "Övrigt",
  ];

  const categories = categoriesArray.map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("user");
    if (loggedIn) {
      const loggedInUser = JSON.parse(loggedIn);
      // setUser(foundUser);
      console.log("local storage: ", loggedInUser);

      setUsername(loggedInUser.name);
      setEmail(loggedInUser.email);
      setLoggedIn(true);

      setNavButtonLink("/logout");
      setNavButtonText("Logga ut");
      setNavHello("Hej " + loggedInUser.name + "!");
      setNavUserState("Inloggad som ", loggedInUser.name);

      setFormData({
        ...formData,
        name: loggedInUser.name,
        email: loggedInUser.email,
      });

      // For debug
      console.log("Username:", loggedInUser.name);
      console.log("email: ", loggedInUser.email);
    }
    if (!loggedIn) {
      setNavButtonLink("/login");
      setNavButtonText("Logga in");
      setNavHello("Hej Världen!");
    }

    Axios.get(settings.SERVER_URL + "/api/get")
      .then((response) => {
        setIssuesList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateList = () => {
    console.log("updating list");
    Axios.get(settings.SERVER_URL + "/api/get").then((response) => {
      if (debug) {
        console.log(response.data);
      }
      setIssuesList(response.data);
      window.location.reload(false);
    });
  };

  function updateComplete(id, completeStatus) {
    if (debug) {
      console.log(id, completeStatus);
    }

    // console.log(id, completeStatus);
    Axios.post(settings.SERVER_URL + "/api/patch/complete", {
      complete: Number(completeStatus),
      id: id,
    }).then(() => {
      // setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: complete }])
      updateList();
      if (debug) {
        console.log("update complete ran");
      }
    });
  }

  function updateCategory(id, category) {
    console.log(id, category);

    // console.log(id, category);
    Axios.patch(settings.SERVER_URL + "/api/patch/category", {
      category: String(category),
      id: id,
    }).then(() => {
      // setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: complete }])
      updateList();
      if (debug) {
        console.log("update category ran");
      }
    });
  }

  // const handleSubmit = (event) =>
  const deleteIssue = (event) => {
    console.log(event);
    Axios.post(settings.SERVER_URL + "/api/delete/issue", {
      id: event,
    }).then(() => {
      // setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: complete }])
      updateList();
    });
  };

  const [validated, setValidated] = useState(false);

  const [issueUpdate, setIssueUpdate] = useState({
    issue: "",
    id: "",
    category: "",
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      console.log(formData);
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    submitIssue();
    // testSubmit();
  };

  const handleUpdate = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      console.log(formData);
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    submitUpdate();
  };

  const submitIssue = () => {
    console.log("försöker skicka");

    Axios.post(settings.SERVER_URL + "/api/insert", {
      senderName: formData.name,
      issue: formData.issue,
      senderEmail: formData.email,
      complete: 0,
      category: formData.category,
    })
      .then(() => {
        console.log("skickat");
        window.location.reload(false);
        //   setIssuesList([...issuesList, { senderName: senderName, senderEmail: senderEmail, issue: issue, complete: 0 }]);
        //   setTimeout(50);
        //   updateList();
      })
      .catch((error) => {
        console.log("det gick inte att skicka");
        console.log(error.message);
        if (error.message === "Request failed with status code 406") {
          alert("Error 406. Testa att skicka igen.");
        }
      });
  };

  function submitUpdate() {
    console.log("update sent");
    Axios.patch(settings.SERVER_URL + "/api/patch/issue", {
      issue: issueUpdate.issue,
      id: issueUpdate.id,
      category: issueUpdate.category,
    }).then(() => {
      // setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: complete }])
      updateList();
    });
  }

  // function submitUpdateCategory(list) {
  //   console.log("update sent");
  //   Axios.patch(settings.SERVER_URL + "/api/patch/category", {
  //     category: issueUpdate.category,
  //     id: issueUpdate.id,
  //   }).then(() => {
  //     // setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: complete }])
  //     updateList();
  //   });
  // }

  return (
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

      <div className="jumbotron m-3">
        <h1 className="display-4">{navHello}</h1>
        <p className="lead">
          Det här är ett egenbyggt ticket system av Emil Zackrisson
        </p>
        <hr className="my-4" />
      </div>

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="container-xl mb-5 border p-3 rounded"
      >
        <Row className="mb-3">
          <FormGroup md="4" controlId="validationCustom01">
            <Form.Label>Namn</Form.Label>

            <Form.Control
              required
              type="text"
              placeholder="Namn"
              // defaultValue={username}
              value={username}
              readOnly={loggedIn}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Form.Control.Feedback>Ser bra ut!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Du måste ange ditt namn.
            </Form.Control.Feedback>
          </FormGroup>
          <Form.Group md="4" controlId="validationCustomUsername">
            <Form.Label>E-post</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="E-post"
                aria-describedby="inputGroupPrepend"
                // defaultValue={email}
                value={email}
                readOnly={loggedIn}
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
        </Row>
        <Row className="mb-3">
          <Form.Group md="6" controlId="validationCustom03">
            <Form.Label>Problem</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Jag har problem med..."
              required
              onChange={(e) =>
                setFormData({ ...formData, issue: e.target.value })
              }
            />
            <Form.Label>Tänk på att inte använda " ? " i din text</Form.Label>
            <Form.Control.Feedback type="invalid">
              Vad är ditt problem?
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Kategori</Form.Label>
            <Form.Select
              aria-label="Kategori"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {categories}
            </Form.Select>
          </Form.Group>
          {/* {console.log(formData.category)} */}
        </Row>
        <Button type="submit">Skicka</Button>
        {/* <Button onClick={updateList} className="m-2 btn-warning">test ladda lista</Button> */}

        {/* <Button onClick={testSend}>Testa</Button> */}
      </Form>

      {issuesList.map((val) => {
        // console.log(val);

        // Sätter klasser och specifik färg beroende på om den är klar.
        var issueCardClasses = classNames(
          {
            "border-success": Boolean(val.complete), // Kant grön
            "border-warning": !Boolean(val.complete), // Kant röd
          },
          "mb-3",
          "container-xl"
        );

        // var issue = val.issue;

        return (
          // Issues cards are placed here
          <div id="issuesCards" key={val.id}>
            <Card className={issueCardClasses}>
              <Card.Body>
                <Card.Title>
                  #{val.id} | {val.senderName}{" "}
                  <a href={"mailto:" + val.senderEmail}>{val.senderEmail}</a> |{" "}
                  {val.category}
                </Card.Title>
                <Card.Text>{val.issue}</Card.Text>
                <Form onSubmit={handleUpdate}>
                  <FormGroup controlId="validationUpdate">
                    <Form.Label>Uppdatera problem</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Problem"
                      onChange={(e) =>
                        setIssueUpdate({
                          ...issueUpdate,
                          issue: e.target.value,
                          id: val.id,
                        })
                      }
                      defaultValue={val.issue}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Markera som klar"
                      checked={val.complete}
                      onChange={(e) => updateComplete(val.id, e.target.checked)}
                    />
                  </FormGroup>
                  <Form.Group>
                    <Form.Label>Kategori</Form.Label>
                    <Form.Select
                      aria-label="Kategori"
                      onChange={(e) => updateCategory(val.id, e.target.value)}
                      defaultValue={val.category}
                    >
                      {categories}
                    </Form.Select>
                  </Form.Group>
                  <Button type="submit">Uppdatera</Button>
                  <Button
                    type="button"
                    className="btn-danger m-2"
                    onClick={(e) => deleteIssue(val.id)}
                  >
                    Ta bort
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </>
  );
}

export default App;
