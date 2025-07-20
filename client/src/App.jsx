import { io } from 'socket.io-client';
import Landing from './pages/Landing';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Room from './pages/Room';

const socket = io('http://localhost:3000')

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
