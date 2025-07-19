import { io } from 'socket.io-client';

const socket = io('http://localhost:3000')

function App() {

  return (
    <>
      <div>hello world</div>
    </>
  )
}

export default App
