import React from 'react';
import { PropTypes }  from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;
    
    return(
      <Card style={{ width: 'auto'}}>
        <Card.Body style={{ fontSize: '10px' }}>
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text>
            Description <br/>
            {genre.Description}
          </Card.Text>
          <Button
            variant='primary'
            onClick={() => {onBackClick(null)}}>Back</Button>
        </Card.Body>
      </Card>
    )
  }
}

export default GenreView;

GenreView.propTypes = {
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired
};