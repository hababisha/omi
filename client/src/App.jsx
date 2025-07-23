import { io } from 'socket.io-client';
import Landing from './pages/Landing';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Room from './pages/Room';
import { useEffect } from 'react';

let socket;

function App() {
  useEffect(() => {
    socket = io("http://localhost:3000")
    return () => {
      socket.disconnect()
    }
  }, [])

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
