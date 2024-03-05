import ChatWindow from '../ui/chatWindow';
const currentUser = 'kg_cooltimes_1337';

export default function Home({ params: { userName } }: { params: { userName: string } }) {
  return (
    <ChatWindow
      currentUser={currentUser}
      currentBuddy={userName}
    />
  );
}
