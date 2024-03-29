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
  Navbar,
  Badge,
} from "react-bootstrap";
import classNames from "classnames";
import settings from "./settings.json"; // Set server url here
// import Navbar from "./Navbar";
import lastActive from "./lastActive";
import Linkify from "react-linkify";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // const serverUrl = localStorage.getItem("serverUrl");

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
    priority: "",
  });

  var priorityList = [
    { text: "Inte Specificerad", value: 0 },
    { text: "Låg", value: 1 },
    { text: "Medel", value: 2 },
    { text: "Hög", value: 3 },
  ];

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

  const priorities = priorityList.map((item) => {
    return (
      <option key={item.value} value={item.value}>
        {item.text}
      </option>
    );
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("user");
    const changedIssueStorage = localStorage.getItem("changedIssue");
    const changedIssue = JSON.parse(changedIssueStorage);
    if (loggedIn) {
      const loggedInUser = JSON.parse(loggedIn);
      // setUser(foundUser);
      console.log("local storage: ", loggedInUser);

      setUsername(loggedInUser.name);
      setEmail(loggedInUser.email);
      setLoggedIn(true);

      lastActive();

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
    if (changedIssue) {
      // document.getElementById(changedIssue.id).scrollIntoView();
      localStorage.removeItem("changedIssue");
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
    if (!loggedIn) {
      alert("Du måste vara inloggad för att uppdatera");
      return;
    }

    Axios.post(settings.SERVER_URL + "/api/patch/complete", {
      complete: Number(completeStatus),
      id: id,
    }).then(() => {
      updateList();
      if (debug) {
        console.log("update complete ran");
      }
    });
  }

  function updateCategory(id, category) {
    console.log(id, category);
    if (!loggedIn) {
      alert("Du måste vara inloggad för att uppdatera");
      return;
    }

    Axios.patch(settings.SERVER_URL + "/api/patch/category", {
      category: String(category),
      id: id,
    }).then(() => {
      updateList();
      if (debug) {
        console.log("update category ran");
      }
    });
  }

  function updatePriority(id, priority) {
    console.log(id, priority);

    Axios.patch(settings.SERVER_URL + "/api/patch/priority", {
      priority: priority,
      id: id,
    }).then(() => {
      updateList();
      if (debug) {
        console.log("update priority ran");
      }
    });
  }

  const deleteIssue = (event) => {
    console.log(event);

    if (!loggedIn) {
      alert("Du måste vara inloggad för att uppdatera");
      return;
    }

    Axios.post(settings.SERVER_URL + "/api/delete/issue", {
      id: event,
    }).then(() => {
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
    if (!loggedIn) {
      alert("Du måste vara inloggad för att uppdatera");
      return;
    }
    console.log("försöker skicka");

    Axios.post(settings.SERVER_URL + "/api/createIssue", {
      senderName: formData.name,
      issue: formData.issue,
      senderEmail: formData.email,
      complete: 0,
      category: formData.category,
      priority: formData.priority,
    })
      .then(() => {
        console.log("successfully sended issue to server");
        window.location.reload(false);
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
    if (!loggedIn) {
      alert("Du måste vara inloggad för att uppdatera");
      return;
    }

    console.log("update sent");
    Axios.patch(settings.SERVER_URL + "/api/patch/issue", {
      issue: issueUpdate.issue,
      id: issueUpdate.id,
      category: issueUpdate.category,
      updater: username,
    }).then(() => {
      updateList();
      localStorage.setItem(
        "changedIssue",
        JSON.stringify({ id: issueUpdate.id })
      );
    });
  }

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
          <Form.Group>
            <Form.Label>Prioritet</Form.Label>
            <Form.Select
              aria-label="Prioritet"
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
            >
              {priorities}
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

        const time = new Date(val.timestamp).toLocaleString("sv-SE");
        // console.log(val.id, val.priority)

        if (val.priority !== "") {
          var priorityText = "Prioritet: " + priorityList[val.priority].text;
          // console.log("Prioritet id", val.id, " = ", priorityText)
          var priorityBadgeBg = classNames(
            {
              secondary: val.priority === "0",
              info: val.priority === "1",
              warning: val.priority === "2",
              danger: val.priority === "3",
            },
            "mx-1"
          );
        }

        // Check if issue is JSON
        try {
          var issueJson = JSON.parse(val.issue);
          const issueLength = issueJson.length;
          console.log(issueJson);

          // console.log("längd: ",issueLength);

          if (issueLength > 1) {
            // Om problem har blivit uppdaterat
            const timeUpdated = new Date(
              issueJson[issueLength - 1].timestamp
            ).toLocaleString("sv-SE");
            var updated = "| Uppdaterades den " + timeUpdated;

            var issue = issueJson[issueLength - 1].issue;
            var updater = issueJson[issueLength - 1].updater;
          } else {
            var issue = issueJson.issue;
          }
        } catch (e) {
          var issue = val.issue;
          // const updated = "";
        }

        // var issue = val.issue;

        return (
          // Issues cards are placed here
          <div id={val.id} key={val.id}>
            <Card className={issueCardClasses}>
              <Card.Body>
                <Card.Title>
                  #{val.id} | {val.senderName}{" "}
                  <a href={"mailto:" + val.senderEmail}>{val.senderEmail}</a> |{" "}
                  {val.category} | {time}
                  <Badge bg={priorityBadgeBg}>{priorityText}</Badge>
                </Card.Title>
                <Card.Text>
                  <Linkify>{issue}</Linkify>
                </Card.Text>
                <Form onSubmit={handleUpdate}>
                  <FormGroup controlId="validationUpdate">
                    <Form.Label>
                      Uppdatera problem {updated} av {updater}
                    </Form.Label>
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
                      defaultValue={issue}
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
                  <Form.Group>
                    <Form.Label>Prioritet</Form.Label>
                    <Form.Select
                      aria-label="Prioritet"
                      onChange={(e) => updatePriority(val.id, e.target.value)}
                      defaultValue={val.priority}
                    >
                      {priorities}
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
