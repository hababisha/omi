import React, { useEffect, useRef, useState } from 'react';


const VideoBubble = React.forwardRef(function VideoBubble({ name, mirror = false, placeholder = false }, ref) {
  return (
    <div className="relative flex items-center justify-center w-full aspect-square max-w-xs mx-auto">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 px-2 py-0.5  bg-black/60 text-xs text-white whitespace-nowrap">
        {name}
      </div>
      {placeholder ? (
        <div className="w-full h-full  bg-gray-700 flex items-center justify-center text-xs text-gray-300 select-none">
          Waiting...
        </div>
      ) : (
        <video
          ref={ref}
          autoPlay
          playsInline
          muted={mirror} 
          className={`w-full h-full rounded-sm object-cover bg-black ${mirror ? 'scale-x-[-1]' : ''}`}
        />
      )}
    </div>
  );
});

function Room({ localName = 'You', remoteName = 'Stranger' }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null); 

  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState('');

  useEffect(() => {
    let localStream;

    const startCamera = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: Date.now(), from: localName, text }]);
    setInput('');
  };

  const handleSkip = () => {
    console.log('Skip clicked');
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-gray-900 text-gray-100">
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-4xl">
          <VideoBubble ref={localVideoRef} name={localName} mirror />
          <VideoBubble ref={remoteVideoRef} name={remoteName} placeholder />
        </div>
        <button
          type="button"
          onClick={handleSkip}
          className="px-5 py-2 rounded-md bg-rose-600 hover:bg-rose-700 active:scale-95 text-sm font-medium transition">
          Skip
        </button>
      </div>

      <div className="w-full lg:w-80 xl:w-96 bg-gray-800 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-700">
        <div className="px-4 py-3 border-b border-gray-700 text-sm font-semibold tracking-wide text-gray-200">
          Chat
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center text-xs">Say hi to start chatting!</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">{msg.from}</span>
                <span className="px-3 py-1.5 rounded-md bg-gray-700 text-gray-100 max-w-[90%] w-fit break-words">{msg.text}</span>
              </div>
            ))
          )}
        </div>
        <form onSubmit={sendMessage} className="p-3 flex gap-2 border-t border-gray-700">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-md bg-gray-700 p-2 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md text-sm font-medium text-white transition">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Room;