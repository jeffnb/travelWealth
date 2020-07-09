import React, { useState } from "react"
import { Jumbotron, Button, Card, CardBody } from "reactstrap"
import axios from "axios"
import {
  CardElement,
  injectStripe,
  Elements,
  StripeProvider,
} from "react-stripe-elements"

const Container = (props) => {
  const publicKey = "pk_live_LrIE3zNzLoz5oKkl1IABlHHN"

  return (
    <StripeProvider apiKey={publicKey}>
      <Elements>
        <div>
          <UpdatePayment />
        </div>
      </Elements>
    </StripeProvider>
  )
}

const UpdatePayment = injectStripe((props) => {
  const [err, setErr] = useState("")
  const [success, setSuccess] = useState("")

  async function submit(e) {
    if (props.stripe) {
      let token = await props.stripe.createToken()
      if (token.error) {
        setErr(token.error.message)
      } else {
        const accessToken = window.localStorage.getItem("token")
        axios.defaults.headers.common["Authorization"] = "Token " + accessToken
        let response = await axios.post("/accounts/update-card/", {
          token: token.token.id,
        })

        if (response.status === 200) {
          setSuccess("Your payment has been updated successfully.")
        }
      }
    }
  }

  return (
    <div className="checkout">
      <Jumbotron className="bg-dark d-flex">
        <h1>Update Payment</h1>
      </Jumbotron>
      <Card>
        <CardBody>
          <CardElement />
          <Button style={{ marginTop: 20 }} onClick={submit}>
            Update Payment Menthod
          </Button>
          <div className="text-danger mt-2">{err}</div>
          <div className="text-success mt-2">{success}</div>
        </CardBody>
      </Card>
    </div>
  )
})

export default Container
