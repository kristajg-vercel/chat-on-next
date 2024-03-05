'use client';

import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const socket = io('http://localhost:3001');


import styles from './chatWindowStyles.module.scss';

export default function ChatWindow({
  currentUser,
  currentBuddy,
}: {
  currentUser: string,
  currentBuddy: string,
}) {
  // TODO: populate messages based on buddy
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
      socket.emit('message', { user: currentUser, currentBuddy, message: newMessage });
      setNewMessage('');
    }
  };

  return (
    <div className={`window ${styles.chatwindow}`}>
      <div className="title-bar">
        <div className="title-bar-text">Chat with {currentBuddy}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">
        <div className={styles.chathistory}>
          {messages.map((data: { user: string, message: string }, index) => (
            <div key={index}>
              <span className={data.user === currentUser ? styles.yourusername : styles.buddyusername}>{data.user}:</span> {data.message}
            </div>
          ))}
        </div>
        <div className='chat-controls'>
          <textarea
            className={styles.chatinput}
            id='chat-input'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage()
            }}
          />
          <div className={styles.chatcontrols}>
            <button onClick={sendMessage} className={styles.sendbutton}>
              <Image
                src={newMessage ? '/aim_icon_enabled.png' : '/aim_icon_disabled.png'}
                alt='Send button'
                width={0}
                height={0}
                sizes="100vw"
                className={styles.buttonicon}
              />
              <u>S</u>end
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}