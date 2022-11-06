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
          <Col lg={1} md={'auto'} sm={1}>              
            <Button 
              variant='primary'
              onClick={() => {onBackClick(null)}}>Back
            </Button>
          </Col>
          <Col></Col>
          <Col lg={10} md={11} sm={11}>
            <Card>
              <Card.Body style={{ fontSize: '16px' }}>
                <Card.Title>Director: {director.Name}</Card.Title>
                <Card.Text>
                  Birth: {director.Birth}
                </Card.Text>
                <Card.Subtitle>Biography</Card.Subtitle>          
                <Card.Text className='mt+3' >{director.Bio}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className='justify-content-center mt-2'>     
          <Card.Subtitle className='col-sm-12 text-center mb-2'>Some movies from this director</Card.Subtitle>
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