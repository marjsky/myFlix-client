import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Menubar } from '../navbar-view/navbar';
import { ProfileView } from '../profile-view/profile-view';


export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null,
      favoriteMovie: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://mj23flixdb.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
        user: null
    });
}

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Menubar user={user} />
        <Row className="main-view justify-content-md-center">
          <Route exact path='/' render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          
          <Route path='/register' render={() => {
            if (user) return <Redirect to='/' />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          {/* route for link on main-view to profile-view */}
          <Route path={`/user/:username`} render={({match, history}) => {
            if (!user) return <LoginView
              onLoggedIn={user => this.onLoggedIn(user)} />
            return <Col>
              <ProfileView 
                history={history}
                movies={movies}
                user={user === match.params.username} />
            </Col>
          }} />

          <Route path='/movies/:movieId' render={({match, history}) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />;
            return <Col md={8}>
              <MovieView 
                movie={movies.find(m => m._id === match.params.movieId)} 
                onBackClick={() => history.goBack()} 
              />
            </Col>
          }} />

          <Route path='/directors/:name' render={({match, history}) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />;
            return <Col md={8}>
              <DirectorView 
                director={movies.find(m => m.Director.Name === match.params.name).Director} 
                onBackClick={() => history.goBack()} 
              />
            </Col>
          }} />

          <Route path='/genre/:name' render={({match, history}) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movie.length === 0) return <div className='main-view' />;
            return <Col md={8}>
              <GenreView
                genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                onBackClick={() => history.goback()}
              />
            </Col>
          }} />
        </Row>
      </Router>
    );
  }
}

export default MainView;