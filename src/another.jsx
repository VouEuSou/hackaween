import { Link } from 'react-router-dom';
import Chatbot from "./components/chatbot";

function App() {
  return (
    <>
      <h1>App </h1>
      <Chatbot />
      <Link to="/another">Go to Another Page</Link>
    </>
  );
}

export default App;
