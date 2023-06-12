import { Navbar, Nav, NavItem } from "@govtechsg/sgds-react/Nav";
import logo from "../icons/logo-sgds.svg";

const NavigationBar = () => {
  return (
    <Navbar>
      <Nav>
        <Navbar.Brand as="img" src={logo} alt="main logo" />
        <NavItem>
          <Nav.Link className="nav-item" href="/">
            Home
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link eventKey="link1" className="nav-item" href="/todo">
            Todo
          </Nav.Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
