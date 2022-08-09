import React from 'react';
import { PropTypes }  from 'prop-types';
import { Card, Button } from 'react-bootstrap';

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

GenreView.propTypes = {
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired
};