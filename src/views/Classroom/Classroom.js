import React, { useState } from "react"
import {
  Jumbotron,
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  ListGroup
} from "reactstrap"
import pic from "../../assets/img/brand/logo.svg"
import PDF from "./PDF"
import { useClassroom } from "../../hooks"

function Classroom() {
  const classes = useClassroom()
  const [open, setOpen] = useState(null)

  const creditInfo =
    classes.filter(obj => obj.category === "credit_card_info") || []
  const shoppingInfo =
    classes.filter(obj => obj.category === "shopping_info") || []
  const travelBookingInfo =
    classes.filter(obj => obj.category === "travel_booking_info") || []
  const travelGuides =
    classes.filter(obj => obj.category === "travel_guides") || []

  const [accordion, setAccordion] = useState([true, false, false, false])

  function toggleAccordion(tab) {
    setAccordion(accordion.map((x, i) => (tab === i ? !x : false)))
  }

  return (
    <>
      <Jumbotron className="bg-dark d-flex">
        <h1 className="display-3">TravelWealth Classroom</h1>
        <img src={pic} alt="travelWealth" className="classLogo" />
      </Jumbotron>
      <CardBody>
        <div id="accordion">
          <Card className="mb-0 bg-light">
            <CardHeader id="headingOne">
              <Button
                block
                color="link"
                className="d-flex justify-content-between m-0 p-0"
                onClick={() => toggleAccordion(0)}
                aria-expanded={accordion[0]}
                aria-controls="collapseOne"
              >
                <h4 className="m-0 p-0">
                  <i className="far fa-credit-card text-secondary mr-2"></i>
                  Credit Card Information
                </h4>
                <i className="fas fa-chevron-right text-secondary"></i>
              </Button>
            </CardHeader>
            <Collapse
              isOpen={accordion[0]}
              data-parent="#accordion"
              id="collapseOne"
              aria-labelledby="headingOne"
            >
              <CardBody>
                {creditInfo
                  ? creditInfo.map(function(obj, i) {
                      return (
                        <PDF
                          open={open}
                          setOpen={setOpen}
                          key={"creditinfo" + i}
                          obj={obj}
                        />
                      )
                    })
                  : "There are no posts just yet, check back soon!"}
              </CardBody>
            </Collapse>
          </Card>
          <Card className="mb-0 bg-light">
            <CardHeader id="headingTwo">
              <Button
                block
                color="link"
                className="d-flex justify-content-between m-0 p-0"
                onClick={() => toggleAccordion(1)}
                aria-expanded={accordion[1]}
                aria-controls="collapseTwo"
              >
                <h4 className="m-0 p-0">
                  <i className="fas fa-shopping-bag text-secondary mr-2"></i>
                  Shopping Information
                </h4>
                <i className="fas fa-chevron-right text-secondary"></i>
              </Button>
            </CardHeader>
            <Collapse
              isOpen={accordion[1]}
              data-parent="#accordion"
              id="collapseTwo"
            >
              <CardBody>
                <ListGroup className="bg-light">
                  {shoppingInfo
                    ? shoppingInfo.map(function(obj, i) {
                        return (
                          <PDF
                            open={open}
                            setOpen={setOpen}
                            key={"shoppinginfo" + i}
                            obj={obj}
                          />
                        )
                      })
                    : "There are no posts just yet, check back soon!"}
                </ListGroup>
              </CardBody>
            </Collapse>
          </Card>
          <Card className="mb-0 bg-light">
            <CardHeader id="headingThree">
              <Button
                block
                color="link"
                className="d-flex justify-content-between m-0 p-0"
                onClick={() => toggleAccordion(2)}
                aria-expanded={accordion[2]}
                aria-controls="collapseThree"
              >
                <h4 className="m-0 p-0">
                  <i className="fas fa-plane text-secondary mr-2"></i>Travel
                  Information
                </h4>
                <i className="fas fa-chevron-right text-secondary"></i>
              </Button>
            </CardHeader>
            <Collapse
              isOpen={accordion[2]}
              data-parent="#accordion"
              id="collapseThree"
            >
              <CardBody>
                <ListGroup className="bg-light">
                  {travelBookingInfo
                    ? travelBookingInfo.map(function(obj, i) {
                        return (
                          <PDF
                            open={open}
                            setOpen={setOpen}
                            key={"travelinfo" + i}
                            obj={obj}
                          />
                        )
                      })
                    : "There are no posts just yet, check back soon!"}
                </ListGroup>
              </CardBody>
            </Collapse>
          </Card>
          <Card className="mb-0 bg-light">
            <CardHeader id="headingFour">
              <Button
                block
                color="link"
                className="d-flex justify-content-between m-0 p-0"
                onClick={() => toggleAccordion(3)}
                aria-expanded={accordion[3]}
                aria-controls="collapseFour"
              >
                <h4 className="m-0 p-0">
                  <i className="fas fa-book-open text-secondary mr-2"></i>
                  Additional Information
                </h4>
                <i className="fas fa-chevron-right text-secondary"></i>
              </Button>
            </CardHeader>
            <Collapse
              isOpen={accordion[3]}
              data-parent="#accordion"
              id="collapseFour"
            >
              <CardBody>
                <ListGroup className="bg-light">
                  {travelGuides
                    ? travelGuides.map(function(obj, i) {
                        return (
                          <PDF
                            open={open}
                            setOpen={setOpen}
                            key={"travelguide" + i}
                            obj={obj}
                          />
                        )
                      })
                    : "There are no posts just yet, check back soon!"}
                </ListGroup>
              </CardBody>
            </Collapse>
          </Card>
        </div>
      </CardBody>
    </>
  )
}

export default Classroom
