import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row, Container, Col } from 'react-bootstrap';
import './genre-view.scss';
import MovieCard from '../movie-card/movie-card';

export const GenreView = (props) => {

    const { genre, movies, onBackClick } = props;
    
    return(
      <Container>
        <Row className='pt-3'>
          <Col lg={1} md={'auto'} sm={1}>              
            <Button 
              variant='primary'
              onClick={() => {onBackClick(null)}}>Back
            </Button>
          </Col>
          <Col></Col>
          <Col lg={10} md={11} sm={11}>
            <Card  >
              <Card.Body style={{ fontSize: '16px' }}>
                <Card.Title>
                  Genre: {genre.Name}
                </Card.Title>
                <Card.Subtitle>Description</Card.Subtitle>
                <Card.Text>{genre.Description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className='justify-content-center mt-2'>     
          <Card.Subtitle className='col-sm-12 text-center mb-2'>Some movies from this Genre</Card.Subtitle>
            <Row className='flex-sm-nowrap justify-content-sm-center'>
              {movies.map(m => (
                <Col 
                  className="director-body main-grid-item p-0"  
                  key={m._id}
                  >
                  <MovieCard movie={m} />
                </Col>
              ))}
            </Row>
        </Row>
      </Container>
    )
}

export default GenreView;

GenreView.propTypes = {
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};