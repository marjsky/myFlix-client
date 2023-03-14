import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
// import { MovieCard } from '../movie-card/movie-card'; use MoviesList component
import MovieView from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Menubar } from '../navbar-view/navbar';
import ProfileView from '../profile-view/profile-view';

import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList  from '../movies-list/movies-list';

const MainView = (props) => {

  const [ state, setState ] = useState({
    loggedIn: false
  });

  useEffect(() => {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      getUser(accessToken, localStorage.getItem('user'))
      getMovies(accessToken);
      setState({ loggedIn: true })
    }
  }, [])
  
  const getUser = (token, username) => {
    axios
      .get(`https://movie-api-5jsk.onrender.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        props.setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getMovies = (token) => {
    axios
      .get("https://movie-api-5jsk.onrender.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        props.setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onLoggedIn = (authData) => {
    console.log(authData);
    props.setUser(authData.user);
    setState({ loggedIn: true});

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    getMovies(authData.token);
  }

  const onLoggedOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setState({ loggedIn: false })
}

  
    let { movies, user } = props;
    //let { user } = this.state;


    return (
      <Router>
        <Menubar user={user.Username} />
        <Row className="main-view justify-content-md-center">
          
          <Route exact path='/' render={() => {
            
            if (!state.loggedIn) return <Col>
              <LoginView onLoggedIn={user => onLoggedIn(user)} />
            </Col>
            
            if (movies.length === 0) return <div className='main-view' />;
            
            return <MoviesList movies={movies} />;
          }} />
          
          <Route path='/register' render={() => {
            
            //if (user) return <Redirect to='/' />
            
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path='/users/:username' render={({match, history}) => {
            
            if (!state.loggedIn) return <LoginView
              onLoggedIn={user => onLoggedIn(user)} />
            
            return <Col>
              <ProfileView 
                history={history}
                movies={movies}
                user={user === match.params.username} 
                />
            </Col>
          }} />

          <Route path='/movies/:_id' render={({match, history}) => {
            
            if (!state.loggedIn) return <Col>
              <LoginView onLoggedIn={user => onLoggedIn(user)} />
            </Col>
            
            if (movies.length === 0) return <div className='main-view' />;
            
            return <Col md={8}>
              <MovieView 
                movie={movies.find(m => m._id === match.params._id)} 
                onBackClick={() => history.goBack()} 
              />
            </Col>
          }} />

          <Route path='/directors/:name' render={({match, history}) => {
            
            if (!state.loggedIn) return <Col>
              <LoginView onLoggedIn={user => onLoggedIn(user)} />
            </Col>
            
            if (movies.length === 0) return <div className='main-view' />;
            
            return <Col md={8}>
              <DirectorView
                movies={movies.filter(m => m.Director.Name === match.params.name)} 
                director={movies.find(m => m.Director.Name === match.params.name).Director} 
                onBackClick={() => history.goBack()} 
              />
            </Col>
          }} />

          <Route path='/genres/:name' render={({match, history}) => {
            
            if (!state.loggedIn) return <Col>
              <LoginView onLoggedIn={user => onLoggedIn(user)} />
            </Col>
            
            if (movies.length === 0) return <div className='main-view' />;
            
            return <Col md={8}>
              <GenreView
                movies={movies.filter(m => m.Genre.Name === match.params.name)} 
                genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                onBackClick={() => history.goBack()}
              />
            </Col>
          }} />
        </Row>
      </Router>
    );
  
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);