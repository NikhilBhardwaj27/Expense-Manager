import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/App.css'
import {Navbar,Nav} from 'react-bootstrap'
import { FaReact } from 'react-icons/fa';

export const NavComponent1 = () =>{
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
      <FaReact className="react-icon" href="/"></FaReact>Expense Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/expenses">Expenses</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export const NavComponent2 = () =>{
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="#home">
              <FaReact className="react-icon"></FaReact>Expense Manager</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link href="/expenses">Expenses</Nav.Link>
                  <Nav.Link href="/logout">logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
        </Navbar>
      </>
  )
}
