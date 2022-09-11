import React, { useState, ReactNode } from "react";
import {
    Navbar,
  Nav,
  NavbarBrand,
//   MainNavBurger,
  NavItem,
//   NavBar,
} from "@govtechsg/sgds-react/Nav";
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import logo from '../icons/logo-sgds.svg'

interface LinkProps {
  to?: string;
  className?: string;
  children?: ReactNode;
};

const Link = (props: LinkProps) => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  return (
    <NavItem
      onClick={() => { if (props.to) navigate(props.to) }}
      className={props.className} 
    //   isActive={!!props.to ? pathname===props.to : false}
    //   href='#'
    >
      {props.children}
    </NavItem>
  );
};

const NavigationBar = () => {
  return (
    <Navbar>
        <Nav>
        <NavbarBrand>
            <img
                src={logo}
                alt="main logo"
                />
        </NavbarBrand>
            <NavItem >
                <Nav.Link href="/">Home</Nav.Link>
            </NavItem>
            <NavItem >
                <Nav.Link eventKey="link1" href="/todo">To Do</Nav.Link>
            </NavItem>
        </Nav>
    </Navbar>
  );
};

export default NavigationBar;