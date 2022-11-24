import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Figure, Button, Card, Container } from 'react-bootstrap';
import './profile-view.scss';
import axios from 'axios';
 
export const FavoriteMovies = ({ movies, favMovieFilter }) => {
  
  console.log('list of array', favMovieFilter);
  
  console.log('list of movies', movies);

  const removeFav = (id) => {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    let url = `https://mj23flixdb.herokuapp.com/users/${username}/movies/${id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        alert('Movie successfully deleted.')
        window.open(`/users/${username}`, '_self');
        console.log('resp', res.data.FavoriteMovies);
      })
      .catch(error => console.error(error))
  };

  return(
    <Container>
      <Card.Body >
        <Row>
          <Col xs={12} className='mx-auto' >
            <h4>Favorite Movies</h4>  
          </Col>  
        </Row>
        <Row>
          {favMovieFilter.map(fav => {
            return (
              <Col xs={12} md={4} lg={4} key={fav._id} className='fav-movie'>
                <Figure>
                <Link to={`/movies/${fav._id}`}>
                  <Figure.Image
                    src={fav.ImagePath}
                    alt={fav.Title}
                    />
                    <Figure.Caption>
                      {fav.Title}
                    </Figure.Caption>
                </Link>
                </Figure>
                <Button variant='secondary' onClick={() => removeFav(fav._id)}>Remove from list</Button>
              </Col>
            )
          })}
        </Row>
      </Card.Body>
    </Container>
  )
}