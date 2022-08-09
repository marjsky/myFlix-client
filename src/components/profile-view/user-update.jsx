import React from 'react';
import { Card, Form, Button } from 'react-bootstrap'

function UserUpdate({user, values, handleChange, handleSubmit}) {

  
  return (
    <div>
      <Card.Title>Update Profile</Card.Title>
      <Form>
        <Form.Group 
          controlId='formUsername'
          className='reg-form-inputs'>
          <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text" 
              defaultValue={user.Username} 
              onChange={e => handleChange(e)}
              required 
              placeholder='Enter a username'
              />
              {values.usernameErr && <p>{values.usernameErr}</p>}
        </Form.Group>
        <Form.Group
          controlId='fromPassword'
          className='reg-form-inputs'>
          <Form.Label>Password:</Form.Label>
            <Form.Control 
              type="password" 
              defaultValue={user.Password} 
              onChange={e => handleChange(e)}
              required
              minLength={8}
              placeholder='Your password must be 8 or more characters' 
              />
              {values.passwordErr && <p>{values.passwordErr}</p>}
        </Form.Group>
        <Form.Group
          controlId='Email'
          className='reg-form-inputs'>
          <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              defaultValue={user.Email} 
              onChange={e => handleChange(e)}
              required
              placeholder='Enter your email address' 
              />
              {values.emailErr && <p>{values.emailErr}</p>}
        </Form.Group>
        <Form.Group controlId='updateBirthday'>
          <Form.Label>Birthday:</Form.Label>
            <Form.Control 
              type="date" 
              defaultValue={user.Birthday} 
              onChange={e => handleChange(e)} 
              />
        </Form.Group>
        <Button 
          variant='primary'
          type="submit" 
          onClick={(e) => handleSubmit(e)}>
            Submit
        </Button>
      </Form>
    </div>
  );
}

export default UserUpdate;