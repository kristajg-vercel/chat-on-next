'use client';

import Image from 'next/image';
// import { useState, useEffect } from 'react';
import io from 'socket.io-client';

import ChatWindow from './ui/chatWindow';

// const URL: string = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';
const socket = io('http://localhost:3001');
// export const socket = io(URL, {
//   autoConnect: false
// });

export default function Home() {
  // const [currentUser, setCurrentUser] = useState('kg_cooltimes_1337');
  // const [messages, setMessages] = useState([]); // array of obj
  // const [newMessage, setNewMessage] = useState('');

  // useEffect(() => {
  //   socket.on('message', message => {
  //     console.log('message is: ', message);
  //     // @ts-ignore
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });
  // }, []);

  // const sendMessage = () => {
  //   if (newMessage) {
  //     socket.emit('message', { user: currentUser, message: newMessage });
  //     setNewMessage('');
  //   }
  // };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h3>chat on next.js</h3>
      <Image
        src='/aol_splash_image.png'
        alt='AOL Splash Image'
        width={185}
        height={146}
      />
      <ChatWindow socket={socket} />
      {/* <div>
        Messages:
        <div>
          {messages.map((data, index) => (
            <div key={index}>
              {data.user}: {data.message}
            </div>
          ))}
        </div>
      </div> */}
      {/* <div className="chat-input-container">
        <input
          className=''
          id='chat-input'
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div> */}
    </main>
  );
}
