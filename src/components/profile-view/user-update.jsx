import React from 'react';
import { Form, Button, Row, Card, Container} from 'react-bootstrap';

export function UserUpdate ({
  handleUpdate, 
  username, setUsername, usernameErr,
  password, setPassword, passwordErr,
  email, setEmail, emailErr,
  birthday, setBirthday,
}) {

  return(
    <Card>
      <Card.Body>
      <Row className='align-items-center justify-content-center'>
        <h3>Profile</h3>
      </Row>
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="username"
          />
          {usernameErr && <p>{usernameErr}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="Password"
          />
          {passwordErr && <p>{passwordErr}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter new email"
          />
          {emailErr && <p>{emailErr}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="birthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            onChange={(e) => setBirthday(e.target.value)}
            value={birthday}
            type="date"
            placeholder="birthday"
          />
        </Form.Group>
      </Form>
      <Button className="col-md-12 text-center" onClick={handleUpdate}>
        Update 
      </Button>
      </Card.Body>
    </Card>
  );
} 

export default UserUpdate;