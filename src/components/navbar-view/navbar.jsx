import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export const Menubar = ({user}) => {
  
  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar className='main-nav' sticky='top' bg='dark' expand='sm' variant='dark'>
      <Container>
      <Navbar.Brand className='navbar-logo' href='/'>myFlixCinema</Navbar.Brand>
        <Navbar.Toggle aria-controls='reponsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
          {isAuth() && (
            <Nav.Link href={`/users/${user}`}>Profile: {user}</Nav.Link>
          )}
          {isAuth() && (
            <Button variant='link' onClick={() => {
              onLoggedOut()}}>Logout</Button>
          )}
          {!isAuth() && (
            <Nav.Link href='/'>Sign-in</Nav.Link>
          )}
          {!isAuth() && (
            <Nav.Link href='/register'>Sign-up</Nav.Link>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}