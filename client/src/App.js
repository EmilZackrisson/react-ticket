import React, { useEffect, useState } from "react";
// import { useForm } from 'react-hook-form';
import "./App.css";
import Axios from "axios";
import { Button, Alert, Card, Form, FormGroup, InputGroup, Row } from 'react-bootstrap';
import classNames from "classnames";


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [senderName, setSenderName] = useState('');
  const [issue, setIssue] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [issuesList, setIssuesList] = useState([]);


  const debug = true;

  console.log("docker env: ", process.env.MYSQL_HOST);


  useEffect(() => {
    console.log("Debug mode: ", debug);
    Axios.get("http://localhost:3001/api/get").then((response) => {
      if (debug) {
        console.log(response.data)
      }
      setIssuesList(response.data);
    })
  }, [])

  const updateList = () => {
    console.log("updating list")
    Axios.get("http://localhost:3001/api/get").then((response) => {
      if (debug) {
        console.log(response.data)
      }
      setIssuesList(response.data);
    })
  }


  function updateComplete(id, completeStatus) {
    if (debug) {
      console.log(id, completeStatus)
    }

    // console.log(id, completeStatus);
    Axios.post("http://localhost:3001/api/patch/complete", {
      complete: Number(completeStatus),
      id: id,
    }).then(() => {
      // setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: complete }])
      updateList();
      if (debug) {
        console.log("update complete ran")
      }
    });
  }

  // const handleSubmit = (event) =>
  const deleteIssue = (event) => {
    console.log(event);
    Axios.post("http://localhost:3001/api/delete/issue", {
      id: event,
    }).then(() => {
      // setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: complete }])
      updateList();
    });
  }

  // function FormIssue() {
  //   const [validated, setValidated] = useState(false);

  //   const handleSubmit = (event) => {
  //     const form = event.currentTarget;
  //     if (form.checkValidity() === false) {
  //       event.preventDefault();
  //       event.stopPropagation();
  //     }

  //     setValidated(true);
  //   }
  // };

  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: ""
  })

  const [issueUpdate, setIssueUpdate] = useState({
    issue: "",
    id: ""
  })

  const handleSubmit = (event) => {
    const form = event.currentTarget;
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
    if (form.checkValidity() === false) {
      console.log(formData);
      event.preventDefault();
      event.stopPropagation();

    }

    setValidated(true);
    submitUpdate();
  };

  const submitIssue = () => {
    console.log("försöker skicka")
    Axios.post("http://localhost:3001/api/insert", {
      senderName: formData.name,
      issue: formData.issue,
      senderEmail: formData.email,
      complete: 0,
    }).then(() => {
      console.log("skickat")
      //   setIssuesList([...issuesList, { senderName: senderName, senderEmail: senderEmail, issue: issue, complete: 0 }]);
      //   setTimeout(50);
      //   updateList();

    }).catch((error) => {
      console.log("det gick inte att skicka")
      console.log(error.message);
      if (error.message === "Request failed with status code 406") {
        alert("Error 406. Testa att skicka igen.")
      }
    });
  };

  function submitUpdate() {
    console.log("update sent");
    Axios.patch("http://localhost:3001/api/patch/issue", {
      issue: issueUpdate.issue,
      id: issueUpdate.id,
    }).then(() => {
      // setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: complete }])
      updateList();
    });
  }

  // function testSend() {

  //   // console.log(formData);

  //   Axios.post("http://localhost:3001/api/insert", {
  //     senderName: "test",
  //     issue: "formData.issue?",
  //     senderEmail: "formData.email",
  //     complete: 1,
  //   }).then(() => {
  //     setIssuesList([...issuesList, { senderName: senderName, senderEmail: senderEmail, issue: issue, complete: 0 }]);
  //     setTimeout(50);
  //     updateList();

  //   }).catch((error) => {
  //     console.log(error.message);
  //     if (error.message === "Request failed with status code 406") {
  //       alert("Error 406. Testa att skicka igen.")
  //     }
  //   });
  // };


  return (
    <>

      <Alert key="warning" variant="warning">
        Denna applikation är fortfarande inte färdig, så den kanske inte fungerar fullt som den ska.
      </Alert>

      <Form noValidate validated={validated} onSubmit={handleSubmit} className="container-xl mb-5 border p-3 rounded">
        <Row className="mb-3">
          <FormGroup md="4" controlId="validationCustom01">
            <Form.Label>Namn</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Namn"
              onChange={
                e => setFormData({ ...formData, name: e.target.value })
              }
            />
            <Form.Control.Feedback>Ser bra ut!</Form.Control.Feedback>
          </FormGroup>
          <Form.Group md="4" controlId="validationCustomUsername">
            <Form.Label>E-post</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="E-post"
                aria-describedby="inputGroupPrepend"
                required
                onChange={
                  e => setFormData({ ...formData, email: e.target.value })
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

              onChange={
                e => setFormData({ ...formData, issue: e.target.value })
              }
            />
            <Form.Label>Tänk på att inte använda " ? " i din text</Form.Label>
            <Form.Control.Feedback type="invalid">
              Vad är ditt problem?
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Skicka</Button>

        {/* <Button onClick={testSend}>Testa</Button> */}
      </Form>





      {issuesList.map((val) => {
        // console.log(val);

        var issueCardClasses = classNames(
          {
            "border-success": Boolean(val.complete),
            "border-warning": !Boolean(val.complete)
          },
          "mb-3",
          "container-xl"
        )


        return (
          // Issues cards are placed here
          <div id="issuesCards">

            <Card className={issueCardClasses}>
              {/* <Card.Header>{val.id}</Card.Header> */}
              <Card.Body>
                <Card.Title>#{val.id}</Card.Title>
                <Card.Text>
                  {val.issue}
                </Card.Text>
                <Form onSubmit={handleUpdate}>
                  <FormGroup controlId="validationUpdate">
                    <Form.Label>Uppdatera problem</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Problem"
                      onChange={
                        e => setIssueUpdate({ ...issueUpdate, issue: e.target.value, id: val.id })
                      }
                    />
                    <Form.Check type="checkbox" label="Markera som klar"
                      checked={val.complete}
                      onChange={
                        e => updateComplete(val.id, e.target.checked)
                      }
                    />
                  </FormGroup>
                  <Button type="submit">Uppdatera</Button>
                  <Button type="button" className="btn-danger" onClick={
                    e => deleteIssue(val.id)
                  }>Ta bort</Button>

                </Form>
              </Card.Body>
            </Card>

          </div>
        )
      })}

    </>
  );
}



export default App;
