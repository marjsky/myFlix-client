import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserInfo from './user-info';

  /**
    Allow a user to update their user info (username, password, email, date of birth) DONE
    Allow a user to deregister
    Display a user's favorite movies DONE?
    Allow a user to remove a movie from their list of favorites 
   */

export function ProfileView () {

  const [ user, setUser ] = useState({
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    FavoriteMovies: []
  });
  // Declare hook for each input
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser(values => ({...values, [name]: value,}))
  }

  const getUser = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    axios.get(`https://mj23flixdb.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      setUser(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  };

  // validate function
  const validate = () => {
    let isReq = true;
    if (!user.Username){
      setValues({...values, usernameErr: 'Username Required'});
      isReq = false;
    } else if (user.Username.length < 2) {
      setValues({...values, usernameErr: 'Username must be 2 character long'});
      isReq = false;
    }
    if (!user.Password) {
      setValues({...values, passwordErr: 'Password Required'});
      isReq = false;
    } else if (user.Password.length <6) {
      setValues({...values, passwordErr: 'Password must be 6 character long'});
      isReq = false;
    }
    if (!user.Email) {
      setValues({...values, emailErr: 'Email required'});
      isReq = false;
    } else if (user.Email.indexOf('@') === -1) {
      setValues({...values, emailErr: 'Email is invalid'});
      console.log(user.Email.indexOf('@'));
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      const currentUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      // Send request to update for users
      axios.put(`https://mj23flixdb.herokuapp.com/users/${currentUser}`, user,{
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

  useEffect(() => {
    let isMounted = true;
    isMounted && getUser();
    return () => {
      isMounted = false;
    }
  }, []);

  return(
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
            <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
    
        <Col xs={12} sm={8}>
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
                        defaultValue={user.Username} 
                        onChange={e => handleChange(e)}
                        required 
                        placeholder='Enter a username'
                        />
                        {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>
                  <Form.Group
                    controlId='fromPassword'
                    className='reg-form-inputs'>
                    <Form.Label>Password:</Form.Label>
                      <Form.Control 
                        type="password" 
                        defaultValue={user.Password} 
                        onChange={e => handleChange(e)}
                        required
                        minLength={8}
                        placeholder='Your password must be 8 or more characters' 
                        />
                        {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>
                  <Form.Group
                    controlId='Email'
                    className='reg-form-inputs'>
                    <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="email"
                        defaultValue={user.Email} 
                        onChange={e => handleChange(e)}
                        required
                        placeholder='Enter your email address' 
                        />
                        {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>
                  <Form.Group controlId='updateBirthday'>
                    <Form.Label>Birthday:</Form.Label>
                      <Form.Control 
                        type="date" 
                        defaultValue={user.Birthday} 
                        onChange={e => handleChange(e)} 
                        />
                  </Form.Group>
                  <Button 
                    variant='primary'
                    type="submit" 
                    onClick={(e) => handleSubmit(e)}>
                      Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
    </Row>
  </Container>
  )
}