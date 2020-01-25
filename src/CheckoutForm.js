import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    if (this.props.stripe) {
      let token = await this.props.stripe.createToken();
      console.log(token);
      // let response = await axios({
      //   url: "/charge",
      //   method: "post",
      //   headers: { "Content-Type": "text/plain" },
      //   body: token.id
      // });
      // console.log(response);
    }

    // if (response.ok) this.setState({ complete: true });
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Purchase</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
