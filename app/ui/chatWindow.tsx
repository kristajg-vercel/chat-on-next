'use client';

import io from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
const useSound = require('use-sound');

const socket = io('http://localhost:3001');

import styles from './chatWindowStyles.module.scss';

export default function ChatWindow({
  currentUser,
  currentBuddy,
}: {
  currentUser: string,
  currentBuddy: string,
}) {
  console.log('heyo type ', typeof useSound);
  const messagesEndRef = useRef(null);

  const [playMsgIn, msgInData] = useSound('/msg_in.mp3');
  const [playMsgOut, msgOutData] = useSound('/msg_out.mp3');
  
  const [messages, setMessages] = useState([]); // array of obj
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {  
    socket.on('message', message => {
      if (msgInData.duration || msgOutData.duration) {
        playSound(message.user);
      }
      // @ts-ignore
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollChatToBottom();
    });
    return () => {
      socket.off('message')
    }
  }, [msgInData, msgOutData]);

  const playSound = (user: string) => {
    if (user === currentUser) {
      playMsgOut();
    } else {
      playMsgIn();
    }
  }

  const scrollChatToBottom = () => {
    console.log('scrowl!')
    window.requestAnimationFrame(() => {
      // @ts-ignore
      messagesEndRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
    })
  }

  const sendMessage = (e: Event|MouseEvent) => {
    e.preventDefault();
    if (newMessage) {
      socket.emit('message', { user: currentUser, currentBuddy, message: newMessage });
      setNewMessage('');
    }
  };

  return (
    <div className={`window ${styles.chatwindow}`}>
      <div className="title-bar">
        <div className="title-bar-text">Chat with {currentBuddy} - Instant Message</div>
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
          <div className='anchor' ref={messagesEndRef} />
        </div>
        <div className='chat-controls'>
          <textarea
            className={styles.chatinput}
            id='chat-input'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              // @ts-ignore
              if (e.key === "Enter") sendMessage(e)
            }}
          />
          <div className={styles.chatcontrols}>
            <button onClick={playMsgOut}>
              Sound Test
            </button>
            <button onClick={scrollChatToBottom}>
              Scroll Test
            </button>
            {/* @ts-ignore */}
            <button onClick={e => sendMessage(e)} className={styles.sendbutton}>
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