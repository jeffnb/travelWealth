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
  Label
} from "reactstrap"
import { Elements, StripeProvider } from "react-stripe-elements"
import CheckoutForm from "../../../../src/CheckoutForm"
import pic from "../../../assets/img/brand/logo.svg"

function Registration(props) {
  const [email, setemail] = useState("")
  const [emailInvalid, setemailInvalid] = useState(false)
  const [firstname, setfirstname] = useState("")
  const [firstnameInvalid, setfirstnameInvalid] = useState(false)
  const [lastname, setlastname] = useState("")
  const [lastnameInvalid, setlastnameInvalid] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordInvalid, setPasswordInvalid] = useState(false)
  const [confPassword, setConfPassword] = useState("")
  const [confPasswordInvalid, setConfPasswordInvalid] = useState(false)
  const [showStripe, setShowStripe] = useState(true)

  async function handleSubmit(e) {
    e.preventDefault()
    let error = false

    if (email.length <= 0) {
      setemailInvalid(true)
      error = true
    } else {
      setemailInvalid(false)
    }

    if (firstname.length === 0) {
      setfirstnameInvalid(true)
      error = true
    } else {
      setfirstnameInvalid(false)
    }

    if (lastname.length === 0) {
      setlastnameInvalid(true)
      error = true
    } else {
      setlastnameInvalid(false)
    }

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
      setShowStripe(false)
    }
  }
  return (
    <>
      <div className="app bg-dark d-flex justify-content-center align-items-center">
        <img src={pic} alt="travelWealth" className="loginLogo mt-n5" />
        {showStripe ? (
          <Card className="w-75 bg-light">
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <h1 className="text-primary">
                  TravelWealth Membership Registration
                </h1>
                <p></p>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="bg-light">
                      <i className="fas fa-envelope"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setemail(e.target.value)}
                    invalid={emailInvalid}
                  />
                  <FormFeedback>
                    The Email You entered can't be empty.
                  </FormFeedback>
                </InputGroup>
                <div className="d-flex">
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-light">
                        <i className="fas fa-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="First Name"
                      autoComplete="firstname"
                      value={firstname}
                      onChange={e => setfirstname(e.target.value)}
                      invalid={firstnameInvalid}
                    />
                    <FormFeedback>Your First Name can't be empty.</FormFeedback>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-light">
                        <i className="fas fa-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      autoComplete="lastname"
                      value={lastname}
                      onChange={e => setlastname(e.target.value)}
                      invalid={lastnameInvalid}
                    />
                    <FormFeedback>Your Last Name can't be empty.</FormFeedback>
                  </InputGroup>
                </div>
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
                  <Col xs="6" lg="8" className="text-right"></Col>
                  <Col xs="6" lg="4">
                    <InputGroup className="pl-5 mb-3">
                      <Label className="pl-3">
                        <Input type="checkbox" required />
                        <a href="https://www.travelwealth.com/terms">
                          Agree to the Membership Terms of Service
                        </a>
                      </Label>
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs="6" className="text-right"></Col>

                  <Col xs="6">
                    <Button
                      type="submit"
                      color="primary"
                      className="px-4 btn-pill float-right"
                    >
                      Register
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        ) : (
          <Card className="w-75 bg-light loginCard">
            <CardBody>
              <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
                <div className="example">
                  <h1 className="mb-2">Payment</h1>
                  <h4 className="mb-2">
                    Please submit your $50 Activation Fee to create your
                    TravelWealth account
                  </h4>
                  <Elements>
                    <CheckoutForm
                      email={email}
                      firstname={firstname}
                      lastname={lastname}
                      password={password}
                    />
                  </Elements>
                </div>
              </StripeProvider>
            </CardBody>
          </Card>
        )}
      </div>
    </>
  )
}

export default Registration
