import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Navbar, Nav } from 'react-bootstrap';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  // Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username){
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq - false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be 6 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq){
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
    }
  };

  return (
    <Container fluid className='loginContainer my-2 mx-12'>
      <Row className='justify-content-sm-center'>
        <Col style={{ paddingTop: '3rem', }} xs={8} sm={8} md={6} >
          <Card>
            <Card.Body>
              <Card.Title style={{textAlign: 'center'}}>Login </Card.Title>
              <Form>
                <Form.Group controlId='formUsername'>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control 
                    type='text' 
                    placeholder='Enter username'
                    value={username}
                    onChange={e => setUsername(e.target.value)} 
                  />
                  {/* code added here to display validation error */}
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId='formPassword'>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control 
                    type='password' 
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)} 
                  />
                  {/* code added here to display validation error */}
                  {passwordErr && <p>{passwordErr}</p>}
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

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};