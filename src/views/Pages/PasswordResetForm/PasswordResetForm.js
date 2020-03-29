import React, { useState, useEffect } from "react"
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
  Row,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap"
import pic from "../../../assets/img/brand/logo.svg"
import axios from "axios"
import { isEmail } from "validator"
import { Link } from "react-router-dom"

//{"name": "Mickey", "email": "mickey@disney.com", "phone": "1234567058"}
function ResetPassword(props) {
  useEffect(() => {
    if (!props.match.params.token) {
      props.history.push("/resetPassword")
    }
  }, [props.match.params])

  const [password, setPassword] = useState("")
  const [passwordInvalid, setPasswordInvalid] = useState(false)
  const [confPassword, setConfPassword] = useState("")
  const [confPasswordInvalid, setConfPasswordInvalid] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalText, setModalText] = useState("")

  const toggle = () => setModal(!modal)

  async function handleSubmit(e) {
    e.preventDefault()
    let error = false
    if (password.length < 6) {
      setPasswordInvalid(true)
      error = true
    } else {
      setPasswordInvalid(false)
    }
    if (password !== confPassword || password.length < 6) {
      setConfPasswordInvalid(true)
      error = true
    } else {
      setConfPasswordInvalid(false)
    }

    if (!error) {
      axios
        .post("/api/password-reset/confirm/", {
          token: props.match.params.token,
          password
        })
        .then(resp => {
          setModalText("Success! Your password has been reset.")
          toggle()
        })
        .catch(e => {
          setModalText("Uh Oh! There was an issue. Please try again later.")
          toggle()
        })
    }
  }

  return (
    <>
      <div className="app bg-dark d-flex justify-content-center align-items-center">
        <Link to="/">
          <img src={pic} alt="travelWealth" className="loginLogo mt-n5" />
        </Link>
        <Card className="w-75 bg-light">
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <h1 className="text-primary">Reset Password</h1>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="bg-light">
                    <i className="fas fa-lock"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="password"
                  placeholder="Password must be at least 6 characters"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  invalid={passwordInvalid}
                />
                <FormFeedback>
                  The Password You entered can't be empty.
                </FormFeedback>
              </InputGroup>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="bg-light">
                    <i className="fas fa-lock"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="current-password"
                  value={confPassword}
                  onChange={e => setConfPassword(e.target.value)}
                  invalid={confPasswordInvalid}
                />
                <FormFeedback>
                  The Password You entered doesn't match.
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
                    Send Verification Email
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>{modalText}</ModalHeader>
        <ModalBody>
          <Link to="/login">Back to Login</Link>
        </ModalBody>
      </Modal>
    </>
  )
}

export default ResetPassword
