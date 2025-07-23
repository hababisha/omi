import { useState, useEffect } from "react";
import { io } from "socket.io-client";

let socket;

function Landing() {
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');

  useEffect(() => {
    socket = io('http://localhost:3000');
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMatching = (e) => {
    e.preventDefault();
    // console.log(name, sex);
    let data = 
    socket.emit('newStranger', {name, sex});
  };

  return (
    <div className='h-screen w-full flex'>
      <div className='relative w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden'>
        <div className='absolute flex flex-col justify-center items-center text-center mx-24 inset-0 transform bg-gradient-to-br from-indigo-500 to-purple-600'>
          <h1 className="text-8xl text-indigo-100 font-bold">OMI</h1>
          <p className="text-indigo-200 text-xl">Lorem ipsum adipisicing elit...</p>
        </div>
      </div>

      <div className='w-1/2 flex items-center justify-center bg-gray-100 p-6'>
        <form onSubmit={handleMatching} className='p-6 w-full max-w-xs flex flex-col gap-4'>
          <h2 className='text-xl font-bold text-gray-700 text-center'>Join Chat</h2>
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
            Talk to a Stranger
          </button>
        </form>
      </div>
    </div>
  );
}

export default Landing;
