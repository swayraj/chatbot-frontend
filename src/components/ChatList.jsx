import { useQuery, useMutation } from '@apollo/client';
import { GET_CHATS_QUERY, CREATE_CHAT_MUTATION } from '../graphql/queries';

const ChatList = ({ selectedChatId, setSelectedChatId }) => {
  const { loading, error, data } = useQuery(GET_CHATS_QUERY);
  const [createChat, { loading: creatingChat }] = useMutation(CREATE_CHAT_MUTATION, { refetchQueries: ['GetChats'] });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading chats.</p>;

  return (
    <div className="flex flex-col space-y-2">
      <button onClick={() => createChat()} disabled={creatingChat} className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
        + New Chat
      </button>
      <div className="flex flex-col space-y-2">
        {data.chats.map((chat) => (
          <div key={chat.id} onClick={() => setSelectedChatId(chat.id)} className={`p-3 rounded-md cursor-pointer transition-colors ${selectedChatId === chat.id ? 'bg-purple-100' : 'hover:bg-gray-100'}`}>
            <p className="font-semibold">Chat {chat.id}</p>
            <p className="text-xs text-gray-500">{new Date(chat.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChatList;