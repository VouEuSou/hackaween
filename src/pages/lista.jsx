import React from 'react';
import { Link } from 'react-router-dom';
import Chatbot from "../components/chatbot";

function Home() {
  return (
    <>
      <h1>SEGUNDA Page</h1>
      <Chatbot />
      <Link to="/">Go to Another Page</Link>
    </>
  );
}

export default Home;
