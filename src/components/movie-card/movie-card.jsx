import React from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Col, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    
    return (
      <Container className='p-0'>
        <Col className='movie-card-col'>
          <Card className='movie-card'>
          <Card.Img 
            variant='top'
            src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text className='movie-card-description'>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant='primary'>Open</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
      </Container>
    );
  }
}

export default MovieCard;

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    }),
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};