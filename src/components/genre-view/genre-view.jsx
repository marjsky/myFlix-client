import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import './genre-view.scss';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;
    
    return(
      <Card style={{ width: 'auto'}}>
        <Card.Body style={{ fontSize: '10px' }}>
          <Card.Title>Genre: {genre.Name}</Card.Title>
          <Card.Subtitle>Description</Card.Subtitle>
          <Card.Text>
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
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};