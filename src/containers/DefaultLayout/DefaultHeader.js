import React from "react"
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from "reactstrap"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react"
import logo from "../../assets/img/brand/logo.svg"
import sygnet from "../../assets/img/brand/logo.svg"
import { useAuth } from "../../hooks"

const propTypes = {
  children: PropTypes.node,
}

const defaultProps = {}

function DefaultHeader(props) {
  // eslint-disable-next-line
  const { children, ...attributes } = props
  const { signout, is_staff } = useAuth()
  const firstName = localStorage.firstName

  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: logo, width: 100, height: 100, alt: "TravelWealth Logo" }}
        minimized={{
          src: sygnet,
          width: 60,
          height: 60,
          alt: "TravelWealth Logo",
        }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />

      <Nav className="d-md-down-none text-primary" navbar>
        <NavItem className="px-3">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </NavItem>
        {is_staff ? (
          <NavItem className="px-3">
            <Link to="/cards" className="nav-link">
              Cards
            </Link>
          </NavItem>
        ) : (
          <NavItem></NavItem>
        )}
        {is_staff ? (
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </NavItem>
        ) : (
          <NavItem></NavItem>
        )}
      </Nav>
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav>
            {firstName ? (
              <div>{firstName}</div>
            ) : (
              <i className="fas fa-sign-out-alt"></i>
            )}
          </DropdownToggle>
          <DropdownMenu right className="bg-light">
            <DropdownItem
              header
              tag="div"
              className="text-center bg-light text-primary"
            >
              <strong>Account</strong>
            </DropdownItem>
            <DropdownItem>
              <Link to="/updatePayment" className="nav-link">
                <i className="fa fa-credit-card" />
                Update Payment
              </Link>
            </DropdownItem>
            <DropdownItem className="text-primary">
              <Link to="/resetPassword" className="nav-link">
                <i className="fas fa-user-lock"></i> Reset Password
              </Link>
            </DropdownItem>
            <DropdownItem onClick={signout} className="text-primary">
              <i className="fa fa-lock" /> Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </React.Fragment>
  )
}

DefaultHeader.propTypes = propTypes
DefaultHeader.defaultProps = defaultProps

export default DefaultHeader
