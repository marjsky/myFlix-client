import React from 'react';
import PropTypes  from 'prop-types';
import { Button, Card, Col, Container, Row} from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';
import './director-view.scss';

export class DirectorView extends React.Component {

  render() {
    const { director, movies, onBackClick } = this.props;
    
    return (

      <Container>
        <Row className='pt-3'>
          <Col lg={1} md={1} sm={1}>              
            <Button 
              
              variant='primary'
              onClick={() => {onBackClick(null)}}>Back
            </Button>
          </Col>
          <Col lg={11} md={11} sm={11}>
          <Card>
            <Card.Body style={{ fontSize: '16px' }}>
              <Card.Title>Director: {director.Name}</Card.Title>
              <Card.Text>
                Birth: {director.Birth}
              </Card.Text>
              <Card.Subtitle>Biography</Card.Subtitle>          
              <Card.Text className='mt+3' >{director.Bio}</Card.Text>
            </Card.Body>
          </Card></Col>
        </Row>
        <Row className='mt-4'>
          <Card className='mx-auto'>
            <Card.Body>
              <Card.Subtitle >Some movies from this director</Card.Subtitle>
              <Row>
              {movies.map(m => (
                  <Col xs={'auto'} md={'auto'} lg={'auto'} 
                    className="director-body main-grid-item "  
                    key={m._id}
                    >
                    <MovieCard movie={m} />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>

        </Row>
      </Container>

    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};