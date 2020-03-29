import React, { useState } from "react"
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
  const [email, setEmail] = useState("")
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalText, setModalText] = useState("")

  const toggle = () => setModal(!modal)

  async function handleSubmit(e) {
    e.preventDefault()
    if (isEmail(email)) {
      setEmailInvalid(false)
      axios
        .post("/api/password-reset/reset_password/", { email })
        .then(resp => {
          setModalText(
            "If you have an account, you should be receiving an email with a link to reset your password shortly."
          )
          toggle()
        })
        .catch(e => {
          setModalText("Uh oh! There was an issue. Please try again later.")
          toggle()
        })
    } else {
      setEmailInvalid(true)
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
              <InputGroup className="mb-5">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="bg-light">
                    <i className="fas fa-envelope"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="email"
                  placeholder="john@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  invalid={emailInvalid}
                />
                <FormFeedback>Please enter a valid email address</FormFeedback>
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
        <ModalHeader toggle={toggle}>Password Reset</ModalHeader>
        <ModalBody>{modalText}</ModalBody>
      </Modal>
    </>
  )
}

export default ResetPassword
