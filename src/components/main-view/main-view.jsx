import React from 'react';
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

class MainView extends React.Component {

  // constructor() {
  //   super();
  //   Initial state is set to null
  //   this.state = {
  //     user: null,
  //     favoriteMovie: []
  //   };
  // }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://mj23flixdb.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.Username);

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
    let { movies, user } = this.props;
    //let { user } = this.state;

    return (
      <Router>
        <Menubar user={user} />
        <Row className="main-view justify-content-md-center">
          
          <Route exact path='/' render={() => {
            
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            
            if (movies.length === 0) return <div className='main-view' />;
            
            return <MoviesList movies={movies} />;
          }} />
          
          <Route path='/register' render={() => {
            
            if (user) return <Redirect to='/' />
            
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path='/users/:username' render={({match, history}) => {
            
            if (!user) return <LoginView
              onLoggedIn={user => this.onLoggedIn(user)} />
            
            return <Col>
              <ProfileView 
                history={history}
                movies={movies}
                user={user === match.params.username} 
                />
            </Col>
          }} />

          <Route path='/movies/:_id' render={({match, history}) => {
            
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
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
            
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
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
            
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
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
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);