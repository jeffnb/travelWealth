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
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
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
  const [showStripe, setShowStripe] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const publicKey = "pk_live_LrIE3zNzLoz5oKkl1IABlHHN"

  function handleClick(e) {
    e.preventDefault()
    setShowModal(true)
  }

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
      setShowStripe(true)
    }
  }
  return (
    <>
      <div className="app bg-dark d-flex justify-content-center align-items-center">
        <img src={pic} alt="travelWealth" className="loginLogo mt-n5" />
        {!showStripe ? (
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
                    onChange={(e) => setemail(e.target.value)}
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
                      onChange={(e) => setfirstname(e.target.value)}
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
                      onChange={(e) => setlastname(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
                    onChange={(e) => setConfPassword(e.target.value)}
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
                        <a
                          href="httsp://www.travelwealth.com/terms"
                          onClick={handleClick}
                        >
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
              <StripeProvider apiKey={publicKey}>
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
        <Modal className="terms" isOpen={showModal}>
          <ModalHeader>Membership Terms of Service</ModalHeader>
          <ModalBody>
            <p>
              1.&nbsp;&nbsp; &nbsp;Agreement
              <br />
              <br />
              1.1.&nbsp;&nbsp; &nbsp;This Membership Agreement ("Agreement") is
              a contract between Easy Go Traveler LLC, dba TravelWealth, a
              Nevada limited liability company ("TW") and the individual(s)
              (including a spouse or partner engaging TW's
              services)&nbsp;signing up for membership services via TW’s website
              (the “Member").
              <br />
              <br />
              1.2. &nbsp; &nbsp;Member enters into this Agreement, and agrees to
              be bound by it, upon enrolling in a subscription payment plan (the
              "Subscription") to TW as part of TW's membership registration
              process. Member's enrollment in the Subscription shall serve as an
              electronic signature and acceptance of this Agreement.
              Alternatively, in case Member was not presented with a link to the
              Subscription, any use of TW's service by Member shall be deemed to
              constitute acceptance by Member of the Agreement.
              <br />
              <br />
              1.3.&nbsp;&nbsp; &nbsp;TW shall have the right, in its sole
              discretion, at any time and without prior notice, to modify this
              Agreement and any terms thereof. Such modifications shall be
              effective immediately upon TW publishing the modified Agreement on
              its Website, or otherwise informing the Member about the
              modification. In the event Member does not receive the
              notification, or does not explicitly acknowledge the acceptance of
              the modified Agreement, for whatever reason, the modified
              Agreement will still take effect immediately upon its publication
              by TW, as stated in this section. Furthermore, any use of TW
              Service by Member, after the date of such publication, shall be
              also deemed to constitute acceptance by Member of the modified
              Agreement.
              <br />
              <br />
              2.&nbsp;&nbsp; &nbsp;Service
              <br />
              <br />
              2.1.&nbsp;&nbsp; &nbsp;TW will provide one or more of the
              following services to Member (“Service” or “Services”):
              <br />
              a)&nbsp;&nbsp; &nbsp;Use of TW’s website and its subdomains (the
              "Website") and any functionality available on the Website. The
              term Website shall include any written communications (email) that
              TW may send to Member.
              <br />
              b) &nbsp; &nbsp;Consultation or advice provided to Member by TW.
              <br />
              c) &nbsp; &nbsp;Services shall not include any products, goods, or
              services provided by any third party (including, but not limited
              to services provided by airlines, hotels, credit card companies,
              or other products/services recommended to Member by TW).
              <br />
              <br />
              2.2.&nbsp;&nbsp; &nbsp;TW is a consultant providing travel
              recommendations and advice to Member.&nbsp;TW will take best
              efforts to provide Member with consultation on strategies to earn
              points / miles, and TW may assist Member in identifying flight
              redemption opportunities for Member.&nbsp;Services provided to
              Member by TW shall be in TW's sole discretion. TW may refuse to
              provide consultation services to Member. TW makes no warranty as
              to the timeliness, quality, quantity, effectiveness, or value of
              the Services.
              <br />
              <br />
              2.3 &nbsp; &nbsp;TW is not a travel agent. TW does not provide
              transportation, accommodation, or any other travel services. TW's
              Services are limited to consultation services.
              <br />
              <br />
              2.4 &nbsp; &nbsp;TW does not provide financial advice. Member is
              under no duty to follow the advice or recommendations of TW.
              Member understands that he/she has the opportunity to seek advice
              from a third party financial advisor prior to taking any action
              which may have a financial impact upon Member, including, but not
              limited to, applying for credit cards, canceling credit cards, and
              making purchases from third parties. Member relies upon TW's
              Services at Member's sole risk.&nbsp;
              <br />
              <br />
              2.5.&nbsp;&nbsp; &nbsp;TW shall have the right, in its sole
              discretion, at any time and without prior notice, to modify the
              Services or any part thereof. Any modified portion of the Services
              shall be subject to this Agreement.
              <br />
              <br />
              3.&nbsp;&nbsp; &nbsp;Charges and Consideration
              <br />
              <br />
              3.1.&nbsp;&nbsp; &nbsp;TW publishes the prices for Services,
              effective at any point in time. TW reserves the right to change
              its pricing policy at any time, in its sole discretion.
              <br />
              <br />
              3.2.&nbsp;&nbsp; &nbsp;Upon subscribing to a TW membership, Member
              agrees to pay the membership fee pricing policy effective at the
              time of enrolling in the Subscription. Membership fees are
              available at the Website or upon request from TW. Subject to the
              terms set forth in this Agreement, Member is agreeing to pay to TW
              a minimum of one year of membership fees (the "Minimum Fee").
              Member may terminate this Agreement in accordance with the terms
              set forth in Section 9.4 of this Agreement. In case of termination
              of this Agreement by the Member for any reason, Member remains
              responsible for payment of the Minimum Fee to TW.&nbsp;Upon
              termination by Member, Member shall not be eligible for any refund
              of membership fees collected by TW. In case of termination by TW
              for any reason and at any time, Member will not be eligible for
              any refund, however TW may, in its sole discretion, issue a
              partial refund to the Member, prorated by the amount of time that
              Services were actually provided relative to the full Subscription
              period. &nbsp;
              <br />
              <br />
              3.3.&nbsp;&nbsp; &nbsp;TW shall have the right to correct billing
              errors at any time. Member must notify TW within 60 days of any
              errors in billing. Member releases TW from all liability and
              claims of loss resulting from any error that Member does not
              report to TW within 60 days after the error appears on Member’s
              credit card statement.
              <br />
              <br />
              3.4.&nbsp;&nbsp; &nbsp;In the event Member defaults on a payment
              or otherwise refuses to pay the Minimum Fee, TW reserves the right
              to accelerate all payments Member owes through the end of the one
              year membership period for immediate payment. TW may automatically
              bill such accelerated payment of the Minimum Fee to Member’s
              account without notice.
              <br />
              <br />
              4.&nbsp;&nbsp; &nbsp;Content and Proprietary Rights
              <br />
              <br />
              4.1.&nbsp;&nbsp; &nbsp;For the purposes of this Agreement, “TW
              Content” shall mean data and information which may be text, audio,
              video, graphics, web links, or of other nature, which had been
              developed by TW itself, or sourced from other third parties. TW
              obtains TW Content from multiple sources. Some of the TW Content
              is owned by TW, and some may be owned by other third party
              providers or other members of the Service. All TW Content is the
              sole property of TW or a third party provider as the case may be,
              and is protected by United States and international copyright
              laws. Member may not post, display, publicly perform, distribute,
              sell, reproduce, create derivative works of, or otherwise exploit
              in any way any TW Content without obtaining the prior written
              consent of TW or the owner or holder of property rights to the
              particular element of TW Content. Nothing in this Agreement, or
              otherwise between TW and Member, should be construed as granting
              any license to TW Content to the Member.
              <br />
              <br />
              4.2.&nbsp;&nbsp; &nbsp;For the purposes of this Agreement, “Member
              Content” shall mean any data and information which may be text,
              audio, video, graphics, web links, or of other nature, which had
              been provided to TW by Member, by any means including TW Website,
              TW social media accounts, or any other platform monitored,
              managed, or otherwise hosted by TW. Member shall not submit Member
              Content which is harassing, defamatory, abusive, threatening,
              harmful, vulgar, obscene or otherwise objectionable to a
              reasonable person. Member agrees not to submit to TW any Member
              Content without first obtaining the prior written consent of the
              owner or holder of property rights to any particular elements of
              the Member Content which may be owned by third parties other than
              Member.
              <br />
              <br />
              4.3.&nbsp;&nbsp; &nbsp;TW shall have the right, at any time, with
              our without notice, in its sole discretion, to monitor Member
              Content, and reject, modify, or delete any Member Content.
              Notwithstanding the foregoing, Member acknowledges that TW is not
              required to moderate content submitted by third parties or other
              members, and that Member may be exposed to inappropriate content,
              which shall not cause any liability to TW.&nbsp;
            </p>
            <p>
              5.&nbsp;&nbsp; &nbsp;Member Representations
              <br />
              <br />
              5.1.&nbsp;&nbsp; &nbsp;Member represents and warrants that:
              <br />
              a)&nbsp;&nbsp; &nbsp;Member is a natural person who is at least 18
              years old, or a duly registered incorporated business entity.
              <br />
              b)&nbsp;&nbsp; &nbsp;Member has the right and power to enter into
              this Agreement.
              <br />
              c)&nbsp;&nbsp; &nbsp;Member provided the registration information
              that is true, accurate, current and complete, and will make timely
              updates to keep it current at all times.
              <br />
              d) &nbsp; &nbsp;Member must evaluate, and bear all risks
              associated with, the use of any content, data, or information
              derived from the Services, including any reliance on the accuracy,
              completeness, or usefulness of such content.&nbsp;
              <br />
              e)&nbsp;&nbsp; &nbsp;The right to use the Services is personal to
              Member and is not transferable to any other person or entity.
              Member is responsible for all use of Member's account and for
              ensuring that all use of the Services complies fully with the
              provisions of this Agreement. Member shall be responsible for
              protecting the confidentiality of Member's third-party accounts,
              passwords, and personal data.
              <br />
              f)&nbsp;&nbsp; &nbsp;Member shall not duplicate, reproduce,
              redistribute, sell, or exploit for any commercial purposes, any of
              the Service or TW Content to any third party.
              <br />
              g)&nbsp;&nbsp; Member will not use the Services in any way that
              would lead to a breach of a law, order or regulation.&nbsp;Member
              will not use the Services in any way that would lead to
              infringement of any patent, trademark, trade secret, copyright or
              other proprietary rights of any party.
              <br />
              h)&nbsp;&nbsp; Member will not use the Services in any way that
              would lead to a breach any terms of service, terms of use, or
              other similar agreement with any third party, that the Member may
              have agreed to be bound by.
              <br />
              g)&nbsp;&nbsp; Member will not use the Services in any way that TW
              deems, in its sole discretion, to be an abuse, misuse, harmful, or
              otherwise improper utilization of the Services. &nbsp;
              <br />
              <br />
              5.2.&nbsp;&nbsp; &nbsp;IF MEMBER PROVIDES ANY THIRD-PARTY SIGN-IN
              CREDENTIALS TO TW, MEMBER HEREBY EXPRESSLY APPROVES TW TO ACT AS
              ITS AGENT AND TO LOG INTO SUCH THIRD-PARTY WEBSITES USING SAID
              SIGN-ON CREDENTIALS IN ORDER TO RETRIEVE INFORMATION ASSOCIATED
              WITH MEMBER’S ACCOUNT WITH SUCH THIRD-PARTY WEBSITES. Member
              agrees to comply with the terms, conditions and rules of the third
              parties that Member has accounts with.
              <br />
              <br />
              6.&nbsp;&nbsp; &nbsp;TW Representations
              <br />
              <br />
              6.1.&nbsp;&nbsp; &nbsp;THE TW SERVICES AND TW CONTENT ARE PROVIDED
              “AS IS” AND "AS AVAILABLE". TW MAKES NO WARRANTY THAT: (a) SERVICE
              WILL MEET MEMBER’S REQUIREMENTS; (b) SERVICE WILL BE
              UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (c) THE RESULTS THAT
              MAY BE OBTAINED FROM THE USE OF THE SERVICE WILL BE ACCURATE OR
              RELIABLE.
              <br />
              <br />
              6.2.&nbsp;&nbsp; TW SHALL NOT BE LIABLE FOR ANY ERRORS IN THE TW
              CONTENT, OR FOR ANY ACTIONS TAKEN BY MEMBER OR OTHERS IN RELIANCE
              THEREON. ANY USE OF THE TW SERVICE AND TW CONTENT IS AT MEMBERS
              SOLE AND ABSOLUTE RISK.
              <br />
              <br />
              6.3.&nbsp;&nbsp; &nbsp;TW MAKES NO REPRESENTATIONS AND GRANTS, NO
              WARRANTIES, EXPRESS OR IMPLIED, EITHER IN FACT OR BY OPERATION OF
              LAW, BY STATUTE OR OTHERWISE, AND SPECIFICALLY DISCLAIMS ANY OTHER
              WARRANTIES, WHETHER WRITTEN OR ORAL, OR EXPRESS OR IMPLIED,
              INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY,
              NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE. TW DOES NOT
              WARRANT THAT WEBSITE OR CONTENT ARE FREE OF VIRUSES OR OTHER
              HARMFUL COMPONENTS.
              <br />
              <br />
              6.4.&nbsp;&nbsp; &nbsp;TW is under no obligation to operate,
              maintain, or repair TW Service or provide TW Content. TW has no
              responsibility or liability for the deletion or failure to store
              any Member Content and other data maintained or transmitted by the
              TW Service.
              <br />
              <br />
              6.5.&nbsp;&nbsp; &nbsp;TW may display or send via email
              advertising and provide links to external websites. TW may have
              business relationships with some of the advertisers on TW Website
              and other TW Content, and may receive financial or other
              compensation when a member chooses to engage in business dealings
              with such third parties. TW is not responsible for examining or
              evaluating the websites or offerings of the third parties.
              Member’s dealings with advertisers found on or through TW Content,
              including payment and delivery of related goods or services, and
              any other terms, conditions, warranties or representations
              associated with such dealings, are solely between Member and such
              third party. TW shall not be responsible or liable for any loss or
              damage of any sort incurred by Member as the result of any such
              dealings, even if TW assisted in billing for the third-party
              offering.
              <br />
              <br />
              6.6.&nbsp;&nbsp; &nbsp;TW reserves the right to access Member’s
              account and Member’s Content, monitor Member’s activity with the
              Service, and use the resulting information about the Member in
              order to enhance, configure and customize TW Service, or other
              operational and business purposes.&nbsp;
              <br />
              <br />
              7.&nbsp;&nbsp; &nbsp;Liability
              <br />
              <br />
              7.1.&nbsp;&nbsp; &nbsp;IN NO EVENT SHALL TW BE LIABLE TO MEMBER OR
              THIRD PARTIES FOR ANY LOSS OF PROFITS, LOSS OF USE, BUSINESS
              INTERRUPTION, LOSS OF DATA, DISCLOSURE OF DATA, LOSS OF
              REPUTATION, DEFAMATION, COPYRIGHT OR PATENT INFRINGEMENT, OR
              CLAIMS BY THIRD PARTIES, OR FOR OTHER COSTS OR CLAIMS, OR ANY FORM
              OF SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES OF ANY KIND
              WHATSOEVER ARISING OUT OF OR RELATING TO PERFORMANCE UNDER THIS
              AGREEMENT, EVEN IF TW HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
              DAMAGES, AND EVEN IF SUCH DAMAGES ARE CAUSED WHOLLY OR IN PART BY
              THE NEGLIGENCE, ERROR, OR OMISSION OF TW, ITS EMPLOYEES,
              SUBCONTRACTORS, AND THEIR RESPECTIVE AGENTS.
              <br />
              <br />
              7.2.&nbsp;&nbsp; &nbsp;THE TOTAL CUMULATIVE LIABILITY OF TW IN
              CONNECTION WITH THIS AGREEMENT, WHETHER IN CONTRACT, TORT, STATUTE
              OR OTHERWISE, SHALL NOT EXCEED THE AGGREGATE AMOUNT OF FEES PAID
              BY MEMBER TO TW FOR THREE (3) MONTH PERIOD PRECEDING THE
              OCCURRENCE OF LIABILITY.
              <br />
              <br />
              7.3.&nbsp;&nbsp; &nbsp;The limitations on and exclusions of
              liability for damages in this Agreement apply regardless of the
              form of action, regardless of whether any remedy has failed its
              essential purpose, and regardless of whether the liability is
              based on breach of contract, tort (including negligence), strict
              liability, breach of warranty, or any other legal theory.
              <br />
              <br />
              7.4.&nbsp;&nbsp; &nbsp;Without limiting the foregoing, Member
              expressly agrees that:
              <br />
              a)&nbsp;&nbsp; &nbsp;While TW may provide information about third
              party goods and services,&nbsp;it is Member’s responsibility to
              verify terms, conditions, policies, and procedures of any third
              party services related to accumulation or use of miles / points,
              and in case if any miles / points are lost as a result of
              inaccurate information reported by TW or any other reason, TW is
              not liable for such loss in any way.
            </p>
            <p>
              b)&nbsp;&nbsp; &nbsp;While TW may gather Member itineraries and
              may notify Member of flight information, TW is not responsible for
              missed flights due to inaccurately reported dates or times of such
              flights. Member is responsible to verify itinerary details
              directly with third party providers such as airlines, hotels,
              rental cars, etc.
            </p>
            <p>
              c)&nbsp;&nbsp; &nbsp;TW is not responsible or liable for
              modification or cancellation of Member’s reservations by the
              corresponding third party travel providers.&nbsp;
            </p>
            <p>
              d)&nbsp;&nbsp; &nbsp;TW is not responsible and does not guarantee
              the availability of award flights, the value of award redemptions
              provided by third party providers, or the availability or quality
              of any services provided by third parties.
              <br />
              <br />
              8.&nbsp;&nbsp; &nbsp;Indemnification
              <br />
              <br />
              8.1.&nbsp;&nbsp; &nbsp;Member will indemnify, defend and hold
              harmless TW and TW’s officers, shareholders, directors, employees,
              agents (collectively, the “TW Indemnified Parties”), from and
              against all liabilities, obligations, causes of action, losses,
              damages, deficiencies, penalties, taxes, levies, fines, judgments,
              settlements, expenses (including attorneys’ and accountants’ fees
              and disbursements) including without limitation, damage to
              property or bodily injury, and costs arising from a claim, demand,
              proceeding, suit or action by a third party (“Third Party
              Claims”), incurred by or asserted against any of the TW
              Indemnified Parties to the extent such Third Party Claims relate
              to, arise out of or result from Member’s use of TW Service and TW
              Content, including but not limited to: (i) any willfully or
              intentionally wrongful, or negligent, act or omission of the
              Member or any of its employee, agent or subcontractor, relating to
              this Agreement; (ii) Member’s failure to perform or improper
              performance under this Agreement, or breach of or inaccuracy in
              any of Member’s representations or warranties contained in this
              Agreement; (iii) any actual or alleged infringement or
              misappropriation of any intellectual property right by Member;
              (iv) Member’s failure to comply with any laws. This indemnity
              shall survive termination of this Agreement.
              <br />
              <br />
              9.&nbsp;&nbsp; &nbsp;Term and Termination
              <br />
              <br />
              9.1.&nbsp;&nbsp; &nbsp;The effective date of this Agreement is the
              date of acceptance of this Agreement by the Member, by means of
              clicking to confirm enrollment in a Subscription as part of the
              registration process with TW, or the day of the first use of TW
              Services by Member, whichever is earliest.
              <br />
              <br />
              9.2.&nbsp;&nbsp; &nbsp;TW shall have the right, in its sole
              discretion, at any time and without prior notice, to:
              <br />
              a)&nbsp;&nbsp; &nbsp;restrict, suspend, or terminate Member’s
              access to all or any part of the TW Services.
              <br />
              b)&nbsp;&nbsp; &nbsp;delete Member Content, Member data, Member
              account, or any other information associated with the Member.
              <br />
              c)&nbsp;&nbsp; &nbsp;terminate this Agreement.
              <br />
              <br />
              9.3.&nbsp;&nbsp; &nbsp;When TW terminates this Agreement, it will
              make a reasonable effort to notify the Member about such
              termination and the effective date thereof, though lack of such
              notice shall not be constructed as a limitation of TW’s ability to
              terminate without notice.
              <br />
              <br />
              9.4. &nbsp; &nbsp;No earlier than 12 months after Member enrolls
              in a Subscription for TW Services, Member shall have the right to
              terminate this Agreement at any time, by notifying TW in writing
              with no less than 30 days advance notice. In the event of
              Termination by Member, all Membership Fees paid by Member for TW
              Services shall be forfeited to TW. For avoidance of doubt, not
              using TW Service by the Member for any period of time does not
              constitute termination of this Agreement.&nbsp;
              <br />
              <br />
              10.&nbsp;&nbsp; &nbsp;Miscellaneous
              <br />
              <br />
              10.1.&nbsp;&nbsp; &nbsp;This agreement contains the entire
              understanding of the parties hereto relating to the subject matter
              hereof. Modifications and amendments to this Agreement shall be
              valid and enforceable only if they are in writing and are
              published by TW as described herein or otherwise communicated by
              TW to Member, or are signed by authorized representatives of both
              parties.
              <br />
              <br />
              10.2.&nbsp;&nbsp; &nbsp;A waiver by either party of any term or
              condition of this Agreement in any instance shall not be deemed or
              construed as a waiver of such term or condition for the future, or
              of any subsequent breach thereof. All remedies, rights,
              undertakings, obligations and agreements contained in this
              Agreement shall be cumulative and none of them shall be in
              limitation of any other remedy, right, undertaking, obligation or
              agreement of either party.&nbsp;
              <br />
              <br />
              10.3.&nbsp;&nbsp; &nbsp;If any term, covenant, condition or
              provision of this Agreement or the application thereof to any
              person or circumstance shall at any time or to any extent be
              determined to be invalid or unenforceable under any provision of
              applicable law, then such provision shall be replaced by a valid
              provision which comes closest to the intentions of the parties to
              this Agreement. &nbsp;The invalidity or unenforceability of any
              provision hereof shall not affect the validity or enforceability
              of any other provision of this Agreement.
              <br />
              <br />
              10.4.&nbsp;&nbsp; TW may assign this Agreement, in whole or in
              part, at any time with or without notice. Member shall neither
              assign nor delegate its rights or obligations hereunder in whole
              or in part to any person.
              <br />
              <br />
              10.5.&nbsp;&nbsp; &nbsp;This Agreement, and all matters or issues
              collateral hereto, shall be governed by and construed and
              interpreted in accordance with the laws of the State of Nevada,
              without regard to any principles of choice or conflicts of law.
              &nbsp;
              <br />
              <br />
              10.6.&nbsp;&nbsp; &nbsp;Member agrees that breach of this
              Agreement by Member will cause irreparable harm to TW, for which
              monetary damage would be difficult to ascertain or insufficient to
              remedy, thereby entitling TW to immediate, injunctive relief
              without the requirement of posting bond or paying costs.
              <br />
              <br />
              10.7.&nbsp;&nbsp; &nbsp;Any dispute relating to this Agreement
              shall be submitted to arbitration in Las Vegas, Nevada.
              Arbitration under this Agreement shall be conducted under the
              rules then prevailing of the American Arbitration Association. The
              arbitrator's award shall be binding and may be entered as a
              judgment in any court of competent jurisdiction.&nbsp;
              <br />
              <br />
              10.8.&nbsp;&nbsp; &nbsp;In any action to enforce any right or
              remedy under this Agreement or to interpret any provision of this
              Agreement, the prevailing party will be entitled to recover its
              costs, including attorneys’ fees.
              <br />
              <br />
              10.9.&nbsp;&nbsp; &nbsp;Any provision of this Agreement that
              contemplates performance or observance subsequent to any
              termination or expiration of this Agreement will survive this
              Agreement for the period of such performance or observance.
            </p>
            <p>&nbsp;</p>
            <p>Last updated: January 21 , 2020</p>
          </ModalBody>
          <ModalFooter>
            <button onClick={(e) => setShowModal(false)}>Close</button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}

export default Registration
