import React, { useEffect, useState } from "react";
import { Button, Alert, Card, Form, FormGroup, InputGroup, Row, Col } from 'react-bootstrap';
import bcrypt from 'bcryptjs'

import 'bootstrap/dist/css/bootstrap.min.css';

function Logout() {


    useEffect(() => {
        localStorage.clear();
      }, [])




    return (
        <>
            <h1>Du är nu utloggad!</h1>
        </>
    );
}

export default Logout;