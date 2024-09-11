import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import './ChatApp.css';

const ChatRoom = ({ room, messages, handleSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const username = localStorage.getItem('username');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      handleSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-room d-flex flex-column h-100">
      <div className="chat-header p-3 bg-primary text-white">
        <h4>{room.room_name}</h4>
      </div>
      <div className="chat-messages p-3 flex-grow-1 overflow-auto">
        <ListGroup variant="flush">
          {messages.map((msg, idx) => (
            <ListGroup.Item
              key={idx}
              className={`d-flex ${msg.user === username ? 'justify-content-end' : 'justify-content-start'}`}
            >
              <div
                className={`chat-bubble ${msg.user === username ? 'chat-bubble-right' : 'chat-bubble-left'}`}
              >
                <strong>{msg.user}</strong>: {msg.message}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="chat-input p-3 border-top">
        <Form onSubmit={handleSubmit}>
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="mr-2"
            />
            <Button type="submit" variant="primary">Send</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChatRoom;
