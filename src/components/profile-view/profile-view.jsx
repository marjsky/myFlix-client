import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Figure, Container, Col, Row} from 'react-bootstrap';
import axios from 'axios';
// import { UserInfo } from './user-info';
import { UserUpdate } from './user-update';
import { FavoriteMovies } from './favorite-movies';

import { connect } from "react-redux";
import { setMovies, setUser } from "../../actions/actions" ;

export const ProfileView = ({movies}) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [user, setUserData] = useState("");
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);
  
  // Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');

  const getUserData = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    axios
      .get(`https://movie-api-production-3c8a.up.railway.app/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.Username);
        setEmail(response.data.Email);
        setUserData(response.data);
        setFavoriteMoviesList(response.data.FavoriteMovies);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      setEmailErr('Email required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Email is invalid');
      console.log(email.indexOf('@'));
      isReq = false;
    }
    return isReq;
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      const currentUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      // Send request to update for users
      axios
        .put(
          `https://movie-api-production-3c8a.up.railway.app/users/${currentUser}`,
          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          alert("Your profile has been updated");
          localStorage.setItem("user", response.data.Username),
            console.log(response.data);
          window.open("/", "_self");
        })
        .catch((e) => {
          console.error(e);
          alert("Something is wrong!");
        });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const deregister = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    axios
      .delete(`https://movie-api-production-3c8a.up.railway.app/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch((error) => {
        console.log(error);
        console.log("Unable to delete profile");
      });
  }

  const favMovieFilter = movies.filter(( movies ) => {
    return favoriteMoviesList.includes(movies._id);
  });
  console.log(favMovieFilter);

  return(

    <Container>
      <Row style={{marginTop: 10}}>
        <Col xs={12} sm={3}>
        </Col>
        <Col xs={12} sm={6}>
              <UserUpdate 
                handleUpdate={handleUpdate} 
                username={username} setUsername={setUsername} usernameErr={usernameErr}
                password={password} setPassword={setPassword} passwordErr={passwordErr}
                email={email} setEmail={setEmail} emailErr={emailErr}
                birthday={birthday} setBirthday={setBirthday}/>
        </Col>
        <Col className='col-sm-12 text-center mb-2'>
          <Button className='deregister-button' variant='danger' onClick={() => deregister()}>Deregister</Button>   
        </Col>
      </Row>     
      <Card>
        <Col sm={12}>
            <FavoriteMovies movies={movies} favMovieFilter={favMovieFilter}  />
        </Col>
      </Card>
    </Container>
  )
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(ProfileView);

//export default ProfileView;

ProfileView.propTypes = {
  profileView: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
}