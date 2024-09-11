import React, { useState, useEffect } from 'react';
import { 
  Container,
  Row,
  Col,
  ListGroup
} from 'react-bootstrap';
import Pusher from 'pusher-js';
import ChatRoom from './ChatRoom';
import './ChatApp.css';

const ChatApp = () => {
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const username = localStorage.getItem('username');

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/rooms`);
      const data = await response.json();
      setRooms(data || []);

      if (data.length > 0) {
        setRoom(data[0]);
      }
    } catch (error) {
      console.error("Error fetching initial rooms:", error);
    }
  };

  const fetchInitialMessages = async (roomId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/rooms/${roomId}/messages`);
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error fetching initial messages:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (room) {
      fetchInitialMessages(room.id);

      const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
        cluster: process.env.REACT_APP_PUSHER_CLUSTER
      });

      const channel = pusher.subscribe(`chat_room_${room.id}`);
      channel.bind('new_message', (data) => {
        if (localStorage.getItem('username') !== data.user) {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [room]);

  const handleSendMessage = async (message) => {
    const newMessage = { user: username, message };
  
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/rooms/${room.id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: newMessage}),
      });
  
      if (!response.ok) {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  return (
    <Container fluid>
      <Row className="vh-100">
        <Col md={3} className="bg-light p-3 border-right sidebar">
          <h3 className="mb-4">Rooms</h3>
          <ListGroup>
            {rooms.map((room_) => (
              <ListGroup.Item
                key={room_.id}
                active={room && room_.id === room.id}
                onClick={() => setRoom(room_)}
                className="room-list-item"
              >
                {room_.room_name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={9} className="p-0 chat-window">
          {room ? (
            <ChatRoom room={room} messages={messages} handleSendMessage={handleSendMessage} />
          ) : (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <h4>Loading rooms...</h4>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatApp;