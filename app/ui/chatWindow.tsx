'use client';

import { useState, useEffect } from 'react';

import styles from './chatWindowStyles.module.scss';

export default function ChatWindow({
  socket,
}: {
  socket: {}
}) {
  const [currentUser, setCurrentUser] = useState('kg_cooltimes_1337');
  const [messages, setMessages] = useState([]); // array of obj
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('message', message => {
      console.log('message is: ', message);
      // @ts-ignore
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    if (newMessage) {
      socket.emit('message', { user: currentUser, message: newMessage });
      setNewMessage('');
    }
  };

  return (
    <div className={`window ${styles.chatwindow}`}>
      <div className="title-bar">
        <div className="title-bar-text">A Complete Window</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">
        <div>
        <div>
          {messages.map((data: { user: string, message: string }, index) => (
              <div key={index}>
                {data.user}: {data.message}
              </div>
            ))}
          </div>
        </div>
        <div className='chat-controls'>
          <input
            className=''
            id='chat-input'
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}