import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Segunda from './pages/lista';
import IA from './pages/ia';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lista" element={<Segunda />} />
      <Route path="/ia" element={<IA />} />
    </Routes>
  );
}

export default App;
