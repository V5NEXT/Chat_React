import React from 'react';
import { GoogleOutlined } from '@ant-design/icons'
import "firebase/app"

import { auth } from "./firebase"
import firebase from 'firebase/app';
import { Container, Row, Col, Button } from 'react-bootstrap';
import companyLogo from '../img/logo.png';



const Login = () => {
    return (
        <div id="login-page">
            <div id="center-div">
                <Container >
                    <Row style={{ textAlign: "center" }}>
                        <Col xs={11}><h1>Welcome to DRGT Chat!</h1></Col>
                        <Col>
                            <Button variant="info">Contact Admin?</Button>
                        </Col>
                    </Row>
                    <Row id="main-content-div">
                        <Col xs={6}>
                            <img src={companyLogo} />
                        </Col>

                        <Col xs={6} id="google-div">
                            <div className="login-button google" onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                                <GoogleOutlined /> Sign in with Google
                            </div></Col>
                    </Row>
                </Container>

            </div>
        </div>
    );
}


export default Login