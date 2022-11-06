import React from "react";
import PropTypes from 'prop-types';
import { Container, Row, Col, Button} from 'react-bootstrap';
import './movie-view.scss';
import axios from "axios";
import { Link } from "react-router-dom";


export class MovieView extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      FavoriteMovies: []
    };
  }

  // Add favorite movie
  addFavoriteMovie = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    let userFavoriteMovies = this.state.FavoriteMovies;
    let isFav = userFavoriteMovies.includes(this.props.movie._id);
    if (!isFav) {
        axios.post(`https://mj23flixdb.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {},
        {headers: {Authorization: `Bearer ${token}`}
      })
      .then((response) => {
        console.log(response.data);
        alert(`${this.props.movie.Title} has been added to your list of movies.`);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('Error')
      });
    } else if (isFav) {
      alert(`${this.props.movie.Title} is already present in your list of movies.`);
    }
  }

  render() {
    const { movie, onBackClick } = this.props;
    let userFavoriteMovies = this.state.FavoriteMovies;
    let isFav = userFavoriteMovies.includes(this.props.movieId);

    if (!movie) return null;

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

            {!isFav && (
              <Button
                className="ml-3"
                id="movie-view-button"
                variant="warning"
                onClick={this.addFavoriteMovie}>
                  Add to Favorites
            </Button>
            )}

          </Col>
        </Row>
      </Container>
    );
  }
}

export default MovieView;

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