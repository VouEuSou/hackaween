import React from 'react';
import { Link } from 'react-router-dom';
import Chatbot from "../components/chatbot";
import './home.css';
function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <Chatbot />
      <Link to="/segunda">Go to Another Page</Link>
    </>
  );
}

export default Home;
