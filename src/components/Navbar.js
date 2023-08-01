import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link to="/" className='menu_link'>Campaigns</Link>
              <Link to="/" className='menu_link'>Influencers</Link>
              <Link to="/" className='menu_link'>Influential Fans</Link>
              <Link to="/" className='menu_link'>Assets</Link>
              <Link to="/" className='menu_link'>Free tools</Link>
            </Nav>
            <Form className="d-flex">
              <div className="credits__button mx-3">Credits remaining: 100</div>
              <div><i className="fa-solid fa-life-ring fa-lg  mx-3"></i></div>
              <div><i className="fa-solid fa-bell fa-lg  mx-3"></i></div>
              <div><i className="fa-solid fa-user fa-lg  mx-3"></i></div>

            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header