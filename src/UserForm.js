import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const UserForm = ({ setUser }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('username', `${name}`);
    setUser(name);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="justify-content-center w-100">
        <Col md={6} lg={4}>
          <Form onSubmit={handleSubmit} className="border p-4 shadow-sm bg-white rounded">
            <h2 className="text-center mb-4">Welcome to ChatApp</h2>
            <Form.Group controlId="formName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Join Chat
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserForm;
