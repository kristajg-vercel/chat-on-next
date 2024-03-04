'use client';

import io from 'socket.io-client';

import BuddyList from './ui/buddyList';
import ChatWindow from './ui/chatWindow';

// const URL: string = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';
const socket = io('http://localhost:3001');
// export const socket = io(URL, {
//   autoConnect: false
// });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h3>chat on next.js</h3>
      <span>
        <BuddyList />
      </span>
      <span>
        <ChatWindow socket={socket} />
      </span>
    </main>
  );
}
