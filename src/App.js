import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserForm from './UserForm';
import ChatApp from './ChatApp';

function App() {
  const [user, setUser] = useState(localStorage.getItem('username') || '');

  return (
    <div>
      {user ? (
        <ChatApp />
      ) : (
        <UserForm setUser={setUser} />
      )}
    </div>
  );
}

export default App;
