import { ReactNode } from "react";
import { Navbar, Nav, NavbarBrand, NavItem } from "@govtechsg/sgds-react/Nav";
import logo from "../icons/logo-sgds.svg";

interface LinkProps {
  to?: string;
  className?: string;
  children?: ReactNode;
}

const NavigationBar = () => {
  return (
    <Navbar>
      <Nav>
        <Navbar.Brand as="img" src={logo} alt="main logo" />
        <NavItem>
          <Nav.Link href="/">Home</Nav.Link>
        </NavItem>
        <NavItem className="nav-item">
          <Nav.Link eventKey="link1" href="/todo">
            To do list
          </Nav.Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
