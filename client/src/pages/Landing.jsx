function Landing() {
    return (
      <div className='h-screen w-full flex'>
        <div className='relative w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden'>
          <div className='absolute flex flex-col justify-center items-center text-center mx-24 inset-0 transform  bg-gradient-to-br from-indigo-500 to-purple-600'>
            <h1 className="text-8xl text-indigo-100 font-bold">OMI</h1>
            <p className="text-indigo-200 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea assumenda dolore dolorum ipsam officia laboriosam fugiat. Eos, tenetur autem dolor, accusantium voluptates at nihil nemo ratione neque</p>
          </div>
        </div>
  
        <div className='w-1/2 flex items-center justify-center bg-gray-100 p-6'>
          <form className=' p-6 w-full max-w-xs flex flex-col gap-4'>
            <h2 className='text-xl font-bold text-gray-700 text-center'>Join Chat</h2>
            <input 
              type='text' 
              placeholder='Enter your name' 
              className='border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400'
            />
            <select className='border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400' required>
            <option value='' disabled selected>
               Your Sex?
            </option>
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
    )
  }
  
  export default Landing
  