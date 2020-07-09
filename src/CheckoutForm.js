import React, { Component } from "react"
import { CardElement, injectStripe } from "react-stripe-elements"
import axios from "axios"

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {
      error: "",
    }
  }

  async submit(ev) {
    if (this.props.stripe) {
      let token = await this.props.stripe.createToken()
      if (token.error) {
        this.setState({
          error: token.error.message,
        })
        return
      } else {
        let response = await axios({
          url: "/account-registration/",
          method: "post",
          data: {
            stripe_token: token.token.id,
            email: this.props.email,
            first_name: this.props.firstname,
            last_name: this.props.lastname,
            password: this.props.password,
          },
        })
        if (response.status === 200) {
          this.setState({
            success:
              "Congrats! Your Payment was accepted, Welcome to TravelWealth",
          })
        }
      }
    }
  }

  render() {
    return (
      <>
        <div className="checkout">
          <CardElement />
          <button onClick={this.submit}>Register</button>
          <div className="text-danger mt-2">{this.state.error}</div>
          <div className="text-success mt-2">{this.state.success}</div>
        </div>
      </>
    )
  }
}

export default injectStripe(CheckoutForm)
