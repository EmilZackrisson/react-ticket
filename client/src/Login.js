import React, { useEffect, useState } from "react";
// import { useForm } from 'react-hook-form';
import Axios from "axios";
import { Button, Alert, Card, Form, FormGroup, InputGroup, Row, Col } from 'react-bootstrap';
import classNames from "classnames";
import settings from "./settings.json"; // Set server url here
import bcrypt from 'bcryptjs'
import reactCookie from 'react-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {

    const [validated, setValidated] = useState(false);
    // const [hash, setHash] = useState("");



    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

    const submitIssue = () => {
        console.log(formData);
        checkUser();
    };

    function addUser(name, email, password) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                console.log("name:", name, " email: ", email, " hash: ", hash);
                // Store hash in your password DB.

            });
        });
    }

    function checkUser() {


        // var res = "";
        // const populateData = (data) => { setHash(data) }
        // console.log(response.data[0].hash)

        var email = formData.email;
        var password = formData.password;

        //Ladda användare från databas
        Axios.post(settings.SERVER_URL + "/api/user", {
            email: email,
        }).then(function (response) {
            // console.log(response.data[0].hash);
            const hash = response.data[0].hash;

            bcrypt.compare(password, hash).then((res) => {
                // res === true
                console.log("password ", res);
                alert(res);

                var today = new Date();
                var tomorrow = new Date();
                tomorrow.setDate(today.getDate() + 1);

                reactCookie.save(email, "logged-in", {
                    expires: tomorrow // Will expire after 24hr from setting (value is in Date object)
                });
            });

        })

        //   bcrypt.compare(password, hash).then((res) => {
        //     // res === true
        //     console.log("password " , res);
        // });
    }



    return (
        <>
            <Button variant="warning" onClick={checkUser}>Test check user</Button>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="container-xl mb-5 border p-3 rounded">
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
                                onChange={
                                    e => setFormData({ ...formData, email: e.target.value })
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
                                onChange={
                                    e => setFormData({ ...formData, password: e.target.value })
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                Du måste ange ditt lösenord.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Button type="submit">Skicka</Button>
                {/* <Button onClick={updateList} className="m-2 btn-warning">test ladda lista</Button> */}

                {/* <Button onClick={testSend}>Testa</Button> */}
            </Form>
        </>
    );
}

export default Login;