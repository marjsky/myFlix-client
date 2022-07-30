import React from 'react';
import './director-view.scss';
import { PropTypes }  from 'prop-types';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {

  render() {

    const { director, onBackClick } = this.props;
    
    return(
      <Card className='directorCard'>
        <Card.Head>{director.Name}</Card.Head>
        <Card.Body>
          <Card.Text>Born in {director.Birth}</Card.Text>
          <Card.Text>Biography {director.Bio}</Card.Text>
          <Button variant='warning' onClick={() => { onBackClick() }}>Back</Button>
        </Card.Body>
      </Card>
    )
  }
}

export default DirectorView;