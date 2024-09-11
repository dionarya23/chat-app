# React Real-Time Chat Application

This project is a real-time chat application built using React, Pusher, and Bootstrap. The application allows users to join chat rooms, send messages, and see real-time updates in multiple rooms.

## Features

- **Multiple Chat Rooms**: Users can switch between different chat rooms.
- **Real-Time Messaging**: Uses Pusher to broadcast messages instantly across all clients.
- **Responsive Design**: Built with Bootstrap to ensure a responsive UI.
- **LocalStorage for Usernames**: Stores the username in localStorage for persistence.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Pusher**: Real-time messaging service for broadcasting and receiving messages.
- **Bootstrap**: For responsive design and pre-built UI components.
- **Fetch API**: Used for sending HTTP requests to the backend.
- **React-Bootstrap**: Bootstrap components built for React.

## Prerequisites

Before you can run the application, ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm or Yarn**: npm comes with Node.js. If you prefer Yarn, [install Yarn](https://yarnpkg.com/getting-started/install).

## Getting Started

Follow the instructions below to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install Dependencies

```bash
npm install
```

or, if using Yarn:

```bash
yarn install
```

### 3. Set Up Environment Variables
Create a ```.env``` file in the root of your project and add the following environment variables:
```bash
REACT_APP_PUSHER_KEY=your_pusher_key
REACT_APP_PUSHER_CLUSTER=your_pusher_cluster
REACT_APP_API_URL=http://localhost:8000  # URL for your backend API
```
Replace your_pusher_key, your_pusher_cluster, and http://localhost:3000 with the appropriate values for your project.

### 4. Run the application
```bash
npm start
```