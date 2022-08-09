import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserInfo from './user-info';
import UserUpdate from './user-update';
import FavoriteMovies from './favorite-movies';

  /**
    Allow a user to update their user info (username, password, email, date of birth) DONE
    Allow a user to deregister
    Display a user's favorite movies DONE?
    Allow a user to remove a movie from their list of favorites 
   */

export function ProfileView ({movies}) {

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
    const value = (event.target.value);
    setUser(values => ({...values, [name]: value,}));
    console.log(setUser);
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
      axios.put(`https://mj23flixdb.herokuapp.com/users/${currentUser}`, {
    setUser
      },
      {
        headers: { Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log(response.data);
       
        // alert('Your profile has been updated!') ;
        // window.open(`/user`, '_self'); // '_self' page open current tab
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

  const favoriteMovieList = movies.filter(( movies ) => {
    return user.FavoriteMovies.includes(movies._id);
  });
  console.log(favoriteMovieList);

  const deregister = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    axios.delete(`https://mj23flixdb.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      console.log(response);
      alert('Profile deleted');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.open('/', '_self');
    })
    .catch(error => {
      console.log(error);
      console.log('Unable to delete profile');
    })
  }

  return(
    <Container>
      <Row style={{marginTop: 10}}>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Card.Body>
              <UserUpdate user={user} values={values} handleChange={handleChange} handleSubmit={handleSubmit}/>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Button className='deregister-button' variant='danger' onClick={() => deregister()}>Deregister</Button>   
        </Col>
      </Row>
      <Row>
        <Col>
          <FavoriteMovies favoriteMovieList={favoriteMovieList} />
        </Col>
      </Row>
    </Container>
  )
}