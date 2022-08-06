import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

  /**
    Allow a user to update their user info (username, password, email, date of birth) DONE
    Allow a user to deregister
    Display a user's favorite movies DONE?
    Allow a user to remove a movie from their list of favorites 
   */

export function ProfileView () {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  // Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');

  // validate function
  const validate = () => {
    let isReq = true;
    if (!username){
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 character long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length <6) {
      setPasswordErr('Password must be 6 character long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email Required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Email is invalid');
      console.log(email.indexOf('@'));
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      // Send request to update for users
      axios.put(`https://mj23flixdb.herokuapp.com/users/${user}`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      },{
        headers: { Authorization: `Bearer ${token}`},
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        localStorage.setItem(token, response.data.Password);
        alert('Your profile has been updated!') ;
        window.open(`/`, '_self'); // '_self' page open current tab
      })
      .catch( e => {
        console.error(e);
        alert('Something is wrong!');
      });
    }
  };

  return(
    <Container>
    <Row>
      <Col>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>Update Profile</Card.Title>
              <Form>
                <Form.Group 
                  controlId='formUsername'
                  className='reg-form-inputs'>
                  <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text" 
                      value={username} 
                      onChange={e => setUsername(e.target.value)}
                      required 
                      placeholder='Enter a username'
                      />
                      {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>
                <Form.Group
                  controlId='fromPassword'
                  className='reg-form-inputs'>
                  <Form.Label>Password:</Form.Label>
                    <Form.Control 
                      type="password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength={8}
                      placeholder='Your password must be 8 or more characters' 
                      />
                      {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
                <Form.Group
                  controlId='Email'
                  className='reg-form-inputs'>
                  <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder='Enter your email address' 
                      />
                      {emailErr && <p>{emailErr}</p>}
                </Form.Group>
                <Form.Group controlId='updateBirthday'>
                  <Form.Label>Birthday:</Form.Label>
                    <Form.Control 
                      type="date" 
                      value={birthday} 
                      onChange={e => setBirthday(e.target.value)} 
                      />
                </Form.Group>
                <Button
                  variant='primary'
                  type="submit" 
                  onClick={handleSubmit}>
                    Submit
                </Button>
                <br />
                <p>Already registered? <Link to={'/'}>Sign in here</Link> </p>
              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  </Container>
  )
}