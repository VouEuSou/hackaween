import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Segunda from './pages/segunda';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/segunda" element={<Segunda />} />
    </Routes>
  );
}

export default App;
