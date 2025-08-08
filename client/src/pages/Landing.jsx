import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

function Landing() {
  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  // const [room, setRoom] = useState('');
  const [waiting, setWaiting] = useState(false);

  

  const handleMatching = (e) => {
    e.preventDefault();
    if (!name || !sex) return;
    setWaiting(true)
    socket.emit('newStranger', {name, sex});
    // navigate('/room', { state: {room, name, sex}})
  };

  useEffect(() => {
    socket.on('match', ({room, localName, remoteName}) => {
      navigate('/room', {state: {room, name: localName, remoteName, sex}})
    })

    return () => {
      socket.off('match');
    }
  }, [name, sex, navigate])

  return (
    <div className='h-screen w-full flex'>
      <div className='relative w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden'>
        <div className='absolute flex flex-col justify-center items-center text-center mx-24 inset-0 transform bg-gradient-to-br from-indigo-500 to-purple-600'>
          <h1 className="text-8xl text-indigo-100 font-bold">OMI</h1>
          <p className="text-indigo-200 text-xl">Connect randomly with strangers...</p>
        </div>
      </div>

      <div className='w-1/2 flex items-center justify-center bg-gray-100 p-6'>
        <form onSubmit={handleMatching} className='p-6 w-full max-w-xs flex flex-col gap-4'>
          <h2 className='text-xl font-bold text-gray-700 text-center'>Join Chat</h2>
           {/* <input
            type='text'
            placeholder='room'
            className='border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400'
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          /> */}
          <input
            type='text'
            placeholder='Enter your name'
            className='border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className='border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400'
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
          >
            <option value='' disabled>Your Sex?</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          <button
            type='submit'
            className='bg-indigo-500 hover:bg-indigo-600 hover:cursor-pointer text-white rounded p-2 transition'
          >
            {waiting ? 'Searching for a Stranger...' : 'Talk to a Stranger'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Landing;
