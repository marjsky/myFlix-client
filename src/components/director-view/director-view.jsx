import React from 'react';
import { PropTypes }  from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;
    
    return(
            <Card className='movie-director'>
            <Card.Head>{director.Name}</Card.Head>
            <Card.Body>
              <Card.Text>Born in {director.Birth}</Card.Text>
              <Card.Text>Biography {director.Bio}</Card.Text>
              <Button variant='warning' onClick={() => { onBackClick() }}>Back</Button>
            </Card.Body>
          </Card>
    );
  }
}

export default DirectorView;

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired
  }).isRequired
};