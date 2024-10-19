import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Segunda from './pages/lista';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lista" element={<Segunda />} />
    </Routes>
  );
}

export default App;
