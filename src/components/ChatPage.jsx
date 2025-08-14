import { useState } from 'react';
import { useSignOut } from '@nhost/react';
import ChatList from './ChatList';
import MessageView from './MessageView';

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const { signOut } = useSignOut();
  return (
    <div className="flex h-screen font-sans bg-gray-100">
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col lg:w-1/4">
        <div className="p-4 border-b border-gray-200"><h2 className="text-xl font-semibold">Chats</h2></div>
        <div className="flex-grow p-4 overflow-y-auto"><ChatList selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId} /></div>
        <div className="p-4 border-t border-gray-200"><button onClick={signOut} className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">Sign Out</button></div>
      </div>
      <div className="w-2/3 flex flex-col lg:w-3/4"><MessageView selectedChatId={selectedChatId} /></div>
    </div>
  );
};
export default ChatPage;