import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Container, Row, Col, Button} from 'react-bootstrap';
import './movie-view.scss';
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setMovies, setUser } from "../../actions/actions" ;


export const MovieView = (props) => {
  
  const [ state, setState ] = useState({
    username: null,
    password: null,
    email: null,
    birthday: null,
    FavoriteMovies: []
  });

  // Add favorite movie
  addFavoriteMovie = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    
    axios.post(`https://mj23flixdb.herokuapp.com/users/${user}/movies/${props.movie._id}`, {},
      {headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      console.log(response.data);
      props.setUser(response.data)
      //alert(`${this.props.movie.Title} has been added to your list of movies.`);
      //window.open('/', '_self');
    })
    .catch(e => {
      console.log('Error')
    });
  }

  removeFromFavoriteMovie = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    console.log("I wanna remove", props.movie, user, token)
    axios.delete(`https://mj23flixdb.herokuapp.com/users/${user}/movies/${props.movie._id}`,
    {headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      console.log(response.date);
      props.setUser(response.data)
      //alert(`${this.props.movie.Title} has been added to your list of movies.`);
      //window.open('/', '_self');
    })
    .catch(e => {
      conosle.log('Error')
    });
  }


  
    const { movie, user, onBackClick } = props;
    
    if (!user || !movie) return null;
    let isFav = user.FavoriteMovies.includes(movie._id);

    console.log("I have the user", user, user.Username, user.FavoriteMovies, isFav, props.movieId, movie)

    return (
      <Container className="movie-view pt-3">
        <Row>
          <Col>
            <div className="d-flex justify-content-center">
              <img src={movie.ImagePath} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-title">
              <span className="label"><strong>TItile: </strong></span>
              <span className="value">{movie.Title}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-description">
              <span className="label"><strong>Description: </strong></span>
              <span className="value">{movie.Description}</span>
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <div className="movie-genre">
              <span className="label"><strong>Genre: </strong></span>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <span className="value">{movie.Genre.Name}</span>
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-director">
              <span className="label"><strong>Driector: </strong></span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <span className="value">{movie.Director.Name}</span>
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Button
              className="my-1"
              id="movie-view-button" 
              onClick={() => { onBackClick(null); }}>
                Back
            </Button>

            {!isFav ? (
              <Button
                className="ml-3"
                id="movie-view-button"
                variant="warning"
                onClick={addFavoriteMovie}>
                  Add to Favorites
            </Button>
            ): (
              <Button
                className="ml-3"
                id="movie-view-button"
                variant="warning"
                onClick={removeFromFavoriteMovie}>
                Remove from Favorite
              </Button>
            )}

          </Col>
        </Row>
      </Container>
    );
  
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(MovieView);

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};