import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks";
import pic from "../../../assets/img/brand/logo.svg";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const { signin } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.length === 0) {
      setUsernameInvalid(true);
    }
    if (password.length === 0) {
      setPasswordInvalid(true);
    } else {
      try {
        await signin(username, password);
        props.history.push("/wallet");
      } catch (e) {
        console.log("ERROIm hR", e);
        setPasswordInvalid(true);
        setUsernameInvalid(true);
      }
    }
  }

  return (
    <>
      <div className="app bg-dark d-flex justify-content-center align-items-center">
        <img src={pic} alt="travelWealth" className="loginLogo mt-n5" />
        <Card className="w-75 bg-light">
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <h1 className="text-primary">Login</h1>
              <div className="d-flex justify-content-between">
                <p className="text-primary">Sign In to your account</p>
                <Link to="/resetPassword">Forgot Password?</Link>
              </div>
              <InputGroup className="mb-5">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="bg-light">
                    <i className="fas fa-user"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  placeholder="Email"
                  autoComplete="email"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  invalid={usernameInvalid}
                />
                <FormFeedback invalid={usernameInvalid}>
                  The Email/Password You entered doesn't match our records.
                </FormFeedback>
              </InputGroup>
              <InputGroup className="mb-5">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="bg-light">
                    <i className="fas fa-lock"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  invalid={passwordInvalid}
                />
                <FormFeedback invalid={passwordInvalid}>
                  The Email/Password You entered doesn't match our records.
                </FormFeedback>
              </InputGroup>
              <Row>
                <Col xs="6" className="text-right"></Col>

                <Col xs="6">
                  <Button
                    type="submit"
                    color="primary"
                    className="px-4 btn-pill float-right"
                  >
                    Login
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default LoginForm;
