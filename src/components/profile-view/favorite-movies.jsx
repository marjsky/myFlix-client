import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Figure, Button, Card } from 'react-bootstrap';
import './profile-view.scss';
import axios from 'axios';
 
function FavoriteMovies({ favoriteMovieList }) {
  
  // const favoriteMoviesId = favoriteMovies.map(m => m._id)

  const removeFav = (id) => {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    let url = `https://mj23flixdb.herokuapp.com/users/${localStorage.getItem('user')}/movies/${id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert('Movie successfully deleted.')
        window.open(`/user/${username}`, '_self');
      })
      .catch(error => console.error(error))
  };

  return(
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h4>Favorite Movies</h4>  
          </Col>  
        </Row>
        <Row>
          {favoriteMovieList.map(({ImagePath, Title, _id}) => {
            return (
              <Col xs={12} md={4} lg={4} key={_id} className='fav-movie'>
                <Figure>
                <Link to={`/movies/${_id}`}>
                  <Figure.Image
                    src={ImagePath}
                    alt={Title}
                    />
                    <Figure.Caption>
                      {Title}
                    </Figure.Caption>
                </Link>
                </Figure>
                <Button variant='secondary' onClick={() => removeFav(_id)}>Remove from list</Button>
              </Col>
            )
          })}
        </Row>
      </Card.Body>
    </Card>
  )
}

export default FavoriteMovies