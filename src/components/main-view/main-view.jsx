import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';


export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
    }
  }

  getMovies(token) {
    axios.get('https://mj23flixdb.herokuapp.com/movies', {
      Headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies:response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
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



/*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

/* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user:authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user:null
    });
  }

  onRegistration(register) {
    this.setState({
      register
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!register) 
      return ( 
        <RegistrationView 
          onRegistration={register => this.onRegistration(register)} />);

    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie); }}/>;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
        <Row className="main-view">
          {selectedMovie
            ? (
                <Col md={8}>
                  <MovieView
                    movie={selectedMovie}
                    onBackClick={newSelectedMovie =>
                      { this.setSelectedMovie(newSelectedMovie);}
                    }
                  />
                </Col>
            )
            : movies.map(movie => (
                <Col md={3}>
                  <MovieCard 
                    key={movie._id} 
                    movie={movie} 
                    onMovieClick={(movie) => 
                      { this.setSelectedMovie(movie)}
                    }
                  />
                </Col>
              ))
          }
        </Row>
    );
  }
}

export default MainView