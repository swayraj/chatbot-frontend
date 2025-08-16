import { useState, useRef, useEffect } from 'react';
import { useSubscription, useMutation } from '@apollo/client';
import { MESSAGES_SUBSCRIPTION, INSERT_USER_MESSAGE, SEND_MESSAGE_ACTION, UPDATE_CHAT_TITLE } from '../graphql/queries';

const MessageView = ({ selectedChatId }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const { data, loading, error } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: { chat_id: selectedChatId },
    skip: !selectedChatId,
  });

  const [insertUserMessage] = useMutation(INSERT_USER_MESSAGE);
  const [sendMessageAction] = useMutation(SEND_MESSAGE_ACTION);
  // This is the new mutation to update our title
  const [updateChatTitle] = useMutation(UPDATE_CHAT_TITLE, {
    refetchQueries: ['GetChats'] // This makes the sidebar update instantly
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || !selectedChatId) return;

    // This is the new logic:
    // If this is the very first message of the chat...
    if (data?.messages.length === 0) {
      // ...create a title from the first 4 words...
      const newTitle = trimmedMessage.split(' ').slice(0, 4).join(' ');
      // ...and save it to the database.
      updateChatTitle({ variables: { chat_id: selectedChatId, title: newTitle } });
    }

    insertUserMessage({ variables: { chat_id: selectedChatId, message: trimmedMessage } });
    sendMessageAction({ variables: { chat_id: selectedChatId, message: trimmedMessage } });
    setMessage('');
  };

  if (!selectedChatId) {
    return (<div className="flex-grow flex items-center justify-center text-gray-500"><p className="text-lg">Select a chat to start.</p></div>);
  }

  return (
    <>
      <div className="flex-grow p-6 overflow-y-auto">
        {loading && <p>Loading messages...</p>}
        {error && <p>Error loading messages.</p>}
        <div className="flex flex-col space-y-4">
          {data?.messages.map((msg) => (
            <div key={msg.id} className={`flex items-end max-w-lg ${ msg.role === 'user' ? 'self-end' : 'self-start' }`}>
              <div className={`p-3 rounded-2xl shadow-md ${ msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-white text-black rounded-bl-none' }`} >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." className="flex-grow px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"/>
          <button type="submit" className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">Send</button>
        </form>
      </div>
    </>
  );
};

export default MessageView;
