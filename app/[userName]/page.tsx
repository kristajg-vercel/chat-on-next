import ChatWindow from '../ui/chatWindow';

export default function Home({ params: { userName } }: { params: { userName: string } }) {
  return (
    <ChatWindow
      currentUser={`${process.env.CURRENT_USER_NAME}`}
      currentBuddy={userName}
    />
  );
}
