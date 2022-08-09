import React from 'react';
import PropTypes  from 'prop-types';
import { Button, Card} from 'react-bootstrap';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;
    
    return (
      <Card style={{ width: 'auto'}}>
        <Card.Body style={{ fontSize: '10px' }}>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text >
            Birth: {director.Birth}
          </Card.Text>          
          <Card.Text>Biography: <br/> 
            {director.Bio}
          </Card.Text>
          <Button 
            variant='primary'
            onClick={() => {onBackClick(null)}}>Back</Button>
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