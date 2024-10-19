import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Segunda from './pages/lista.jsx';
import IA from './pages/ia.jsx';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lista" element={<Segunda />} />
        <Route path="/ia" element={<IA />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
