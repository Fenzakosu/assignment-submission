import React, { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";

import { useLocalState } from "../util/useLocalStorage";

const Login = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function sendLoginRequest() {
    const reqBody = {
      username: username,
      password: password,
    };

    fetch("api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.json(), response.headers]);
        else {
          return Promise.reject("Invalid Login Attempt!");
        }
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        console.log(jwt);
        window.location.href = "dashboard";
      })
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="8" lg="6">
          <Form.Group className="mb-3" controlId="username">
            <Form.Label className="fs-4">Username</Form.Label>
            <Form.Control
              type="email"
              value={username}
              placeholder="joe@gmail.com"
              size="lg"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8" lg="6">
          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="fs-4">Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Type in Your Password"
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col
          md="8"
          lg="6"
          className="mt-2 d-flex flex-column gap-4 flex-md-row justify-content-md-between"
        >
          <Button
            id="submit"
            type="button"
            size="lg"
            onClick={() => sendLoginRequest()}
          >
            Login
          </Button>
          <Button
            id="submit"
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => (window.location.href = "/")}
          >
            Exit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
