import React from 'react';
import { Link } from 'react-router-dom';
import trilha from '../assets/trilha.jpg';
import './home.css';
function Home() {
  return (
    <>
    <img src={trilha} id="trilha" alt="trilha" />
    <h1 id='titulo'>Partiu.AI</h1>
    <h2 id='subtitulo'>Sua principal fonte de passeios em Pelotas!</h2>
    </>
  );
}

export default Home;
