import React, { useState } from "react"
import {
  Button,
  Card,
  CardBody,
  Form,
  CardHeader,
  Col,
  FormGroup,
  FormFeedback,
  FormText,
  Input,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap"
import { useFlights } from "../../hooks"

function RequestFlights(props) {
  const [modal, setModal] = useState(false)
  const [modaltext, setModaltext] = useState("")
  const [routing, setRouting] = useState("")
  const [departCity, setdepartCity] = useState("")
  const [departCityInvalid, setdepartCityInvalid] = useState(false)
  const [destinations, setDestinations] = useState("")
  const [destinationsInvalid, setDestinationsInvalid] = useState(false)
  const [departDate, setdepartDate] = useState("")
  const [departDateInvalid, setdepartDateInvalid] = useState(false)
  const [returnDate, setreturnDate] = useState("")
  const [returnDateInvalid, setreturnDateInvalid] = useState(false)
  const [howFlexible, setHowFlexible] = useState("")
  const [howFlexibleInvalid, setHowFlexibleInvalid] = useState(false)
  const [preferred, setPreffered] = useState("")
  const [passengers, setPassengers] = useState("")
  const [passengersInvalid, setPassengersInvalid] = useState(false)
  const [passNames, setpassNames] = useState("")
  const [passNamesInvalid, setpassNamesInvalid] = useState(false)
  const [bags, setBags] = useState("")
  const [bagsInvalid, setBagsInvalid] = useState(false)
  const [notes, setNotes] = useState("")
  const { requestFlight } = useFlights()

  async function handleSubmit(e) {
    e.preventDefault()
    let error = false

    if (departCity.length === 0) {
      setdepartCityInvalid(true)
      error = true
    } else {
      setdepartCityInvalid(false)
    }

    if (destinations.length === 0) {
      setDestinationsInvalid(true)
      error = true
    } else {
      setDestinationsInvalid(false)
    }

    if (departDate.length === 0) {
      setdepartDateInvalid(true)
      error = true
    } else {
      setdepartDateInvalid(false)
    }

    if (returnDate.length === 0) {
      setreturnDateInvalid(true)
      error = true
    } else {
      setreturnDateInvalid(false)
    }

    if (howFlexible.length === 0) {
      setHowFlexibleInvalid(true)
      error = true
    } else {
      setHowFlexibleInvalid(false)
    }

    if (passengers.length === 0 || isNaN(Number(passengers))) {
      setPassengersInvalid(true)
      error = true
    } else {
      setPassengersInvalid(false)
    }

    if (passNames.length === 0) {
      setpassNamesInvalid(true)
      error = true
    } else {
      setpassNamesInvalid(false)
    }

    if (bags.length === 0 || isNaN(Number(bags))) {
      setBagsInvalid(true)
      error = true
    } else {
      setBagsInvalid(false)
    }

    if (!error) {
      try {
        await requestFlight(
          routing,
          departCity,
          destinations,
          departDate,
          returnDate,
          howFlexible,
          preferred,
          passengers,
          passNames,
          bags,
          notes
        )
        setModaltext("Your form was submitted successfully")
        setModal(true)
      } catch (e) {
        setModaltext("There was an issue submitting your form")
        setModal(true)
      }
    }
  }

  return (
    <>
      <Col>
        <Card className="mt-3">
          <CardHeader>
            <strong>Request a Flight</strong>
          </CardHeader>
          <CardBody className="bg-light">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs="12" md="6">
                  <FormGroup row>
                    <Col md="2">
                      <Label>Routing</Label>
                    </Col>
                    <Col md="10">
                      <FormGroup
                        check
                        className="radio"
                        value={routing}
                        onChange={e => setRouting(e.target.value)}
                      >
                        <Row>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="roundTrip"
                            name="roundTrip"
                            value="roundTrip"
                          />
                          <Label
                            check
                            className="form-check-label"
                            htmlFor="roundTrip"
                          >
                            Roundtrip
                          </Label>
                        </Row>
                        <Row>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="oneWay"
                            name="oneWay"
                            value="oneWay"
                          />
                          <Label
                            check
                            className="form-check-label"
                            htmlFor="oneWay"
                          >
                            One-way
                          </Label>
                        </Row>
                        <Row>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="multiCity"
                            name="multiCity"
                            value="multiCity"
                          />
                          <Label
                            check
                            className="form-check-label"
                            htmlFor="multiCity"
                          >
                            Multi-city
                          </Label>
                        </Row>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="6">
                  <FormGroup
                    value={departCity}
                    onChange={e => setdepartCity(e.target.value)}
                  >
                    <Label htmlFor="depart">Departure City</Label>
                    <Input
                      type="text"
                      id="depart"
                      invalid={departCityInvalid}
                    />
                    <FormFeedback>Departure City is Required</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup
                    value={destinations}
                    onChange={e => setDestinations(e.target.value)}
                  >
                    <Label htmlFor="destinations">Destination(s)</Label>
                    <Input
                      type="text"
                      id="destinations"
                      invalid={destinationsInvalid}
                    />
                    <FormFeedback>Destination(s) is Required</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="6">
                  <FormGroup
                    row
                    value={departDate}
                    onChange={e => setdepartDate(e.target.value)}
                  >
                    <Col>
                      <Label htmlFor="depart-input">Departure Date</Label>
                      <Input
                        type="date"
                        id="depart-input"
                        name="depart-input"
                        placeholder="date"
                        invalid={departDateInvalid}
                      />
                      <FormFeedback>Departure Date is Required</FormFeedback>
                      <FormText className="help-block">
                        Close-in Ticketing Fee: requests submitted less than 90
                        days before departure will incur an additional charge of
                        $100
                      </FormText>
                    </Col>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <Col>
                    <FormGroup row>
                      <Label htmlFor="howFlexible">
                        How flexible are your dates?
                      </Label>
                      <Input
                        type="text"
                        id="howFlexible"
                        value={howFlexible}
                        onChange={e => setHowFlexible(e.target.value)}
                        invalid={howFlexibleInvalid}
                      />
                      <FormFeedback>How flexible is Required</FormFeedback>
                    </FormGroup>
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="6">
                  <FormGroup
                    row
                    value={returnDate}
                    onChange={e => setreturnDate(e.target.value)}
                  >
                    <Col>
                      <Label htmlFor="return-input">Return Date</Label>
                      <Input
                        type="date"
                        id="return-input"
                        name="return-input"
                        placeholder="date"
                        invalid={returnDateInvalid}
                      />
                      <FormFeedback>Return Date is Required</FormFeedback>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="6">
                  <FormGroup
                    value={preferred}
                    onChange={e => setPreffered(e.target.value)}
                  >
                    <Label htmlFor="preferredClass">Preferred Class</Label>
                    <Input
                      type="select"
                      name="preferredClass"
                      id="preferredClass"
                    >
                      <option value="0">Please select</option>
                      <option value="1">Economy</option>
                      <option value="2">Business/First</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup
                    value={passengers}
                    onChange={e => setPassengers(e.target.value)}
                  >
                    <Label htmlFor="passengers">How Many Passengers?</Label>
                    <Input
                      type="text"
                      id="passengers"
                      invalid={passengersInvalid}
                    />
                    <FormFeedback>
                      Passengers is required and must be a number
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="6">
                  <FormGroup
                    value={passNames}
                    onChange={e => setpassNames(e.target.value)}
                  >
                    <Label htmlFor="passengerNames">Passenger Name(s)</Label>
                    <Input
                      type="text"
                      id="passengerNames"
                      invalid={passNamesInvalid}
                    />
                    <FormFeedback>Passenger Name(s) is Required</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup
                    value={bags}
                    onChange={e => setBags(e.target.value)}
                  >
                    <Label htmlFor="bags">
                      How many total bags will you be checking?
                    </Label>
                    <Input type="text" id="bags" invalid={bagsInvalid} />
                    <FormFeedback>
                      Bags is required and must be a number
                    </FormFeedback>
                    <FormText className="help-block">
                      Certain airlines may charge an additional fee for checked
                      bags
                    </FormText>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup
                    row
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                  >
                    <Col>
                      <Label htmlFor="notes">Notes/Instructions</Label>
                      <Input
                        type="textarea"
                        name="notes"
                        id="notes"
                        rows="3"
                        placeholder="Please include any information that is applicable to your trip"
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Button
                className="float-right btn-pill"
                type="submit"
                size="sm"
                color="primary"
              >
                <i className="fa fa-dot-circle-o"></i> Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
      <Modal isOpen={modal}>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>{modaltext}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={e => props.history.push("/")}>
            Back to Home
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </>
  )
}

export default RequestFlights
