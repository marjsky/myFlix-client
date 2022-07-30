import React from 'react';
import './genre-view.scss';
import { PropTypes }  from 'prop-types';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {

  render() {

    const { genre, onBackClick } = this.props;
    
    return(
      <Card className='genreCard'>
        <Card.Head>{genre.Name}</Card.Head>
        <Card.Body>
          <Card.Text>{genre.Description}</Card.Text>
          <Button variant='warning' onClick={() => { onBackClick() }}>Back</Button>
        </Card.Body>
      </Card>
    )
  }
}

export default GenreView;