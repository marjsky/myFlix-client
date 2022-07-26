import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Navbar, Nav } from 'react-bootstrap';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /*Send a request to server for authentication*/
    axios.post('https://mj23flixdb.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <Container fluid className='loginContainer my-2 mx-12'>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>AppFlix</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#Register'>Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row>
        <Col>
          <Card>
            <Card.Body className='mt-3'>
              <Card.Title style={{textAlign: 'center'}}>Login </Card.Title>
              <Form>
                <Form.Group controlId='formUsername'>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control 
                    type='text' 
                    onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='formPassword'>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control 
                    type='password' 
                    onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button 
                  variant='primary' 
                  type='submit' 
                  onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.PropTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};