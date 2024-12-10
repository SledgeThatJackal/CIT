import { User } from "@schema/User";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import "@styles/Login.css";
import { SuccessBanner } from "@components/general/Banners";

function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<User>();

  const navigate = useNavigate();
  const location = useLocation();

  const [isLogout, setIsLogout] = useState<boolean>(false);

  const onSubmit = async (loginData: User) => {
    const response = await axios.post(
      `/login?username=${loginData.username}&password=${loginData.password}`,
    );

    const url = new URL(response.request.responseURL);
    const searchParams = new URLSearchParams(url.search);

    if (searchParams.get("error")) {
      setError("password", {
        type: "manual",
        message: "Username and/or Password was not accepted.",
      });
    } else {
      clearErrors();
      navigate("/");
    }
  };

  useEffect(() => {
    const { success } = location.state || {};

    if (success) {
      setIsLogout(true);
    }
  }, []);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}>
      <Container
        className="rounded text-light w-50 shadow"
        style={{ background: "rgb(15, 25, 37)" }}>
        {isLogout && <SuccessBanner setState={setIsLogout} />}
        <Row className="mb-2">
          <Col as="h1">Login</Col>
        </Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="usernameForm" className="mb-4">
            <FloatingLabel label="Username" controlId="floatingUsername">
              <Form.Control
                {...register("username")}
                type="text"
                isInvalid={!!errors.username?.message}
                placeholder="Username"
                className={`text-light loginInput ps-1 pb-1 ${errors.password?.message && "is-invalid"}`}
                required
                autoFocus
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="passwordForm" className="mb-4">
            <FloatingLabel label={"Password"} controlId="floatingPassword">
              <Form.Control
                {...register("password")}
                type="password"
                isInvalid={!!errors.password?.message}
                placeholder="Password"
                className="text-light loginInput ps-1 pb-1"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Button variant="outline-info" type="submit" className="mb-4">
            Login
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default LoginPage;
