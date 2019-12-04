import React from "react";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem
} from "reactstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logo from "../../assets/img/brand/black.png";
import sygnet from "../../assets/img/brand/black.png";
import { useAuth } from "../../hooks";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

function DefaultHeader(props) {
  // eslint-disable-next-line
  const { children, ...attributes } = props;
  const { signout } = useAuth();
  const firstName = localStorage.firstName;

  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: logo, width: 89, height: 25, alt: "CoreUI Logo" }}
        minimized={{ src: sygnet, width: 30, height: 30, alt: "CoreUI Logo" }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />

      <Nav className="d-md-down-none" navbar>
        <NavItem className="px-3">
          <Link to="/" className="nav-link">
            Wallet
          </Link>
        </NavItem>
      </Nav>
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav>
            <div>{firstName}</div>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header tag="div" className="text-center">
              <strong>Account</strong>
            </DropdownItem>
            <DropdownItem onClick={signout}>
              <i className="fa fa-lock" /> Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
      {/*<AppAsideToggler className="d-lg-none" mobile />*/}
    </React.Fragment>
  );
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
