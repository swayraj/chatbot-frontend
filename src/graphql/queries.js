import { gql } from '@apollo/client';

// Added 'title' to this query
export const GET_CHATS_QUERY = gql`
  query GetChats {
    chats(order_by: { created_at: desc }) {
      id
      created_at
      title 
    }
  }
`;

export const CREATE_CHAT_MUTATION = gql`
  mutation CreateChat {
    insert_chats_one(object: {}) {
      id
      created_at
    }
  }
`;

// Added this new mutation to update the title
export const UPDATE_CHAT_TITLE = gql`
  mutation UpdateChatTitle($chat_id: Int!, $title: String!) {
    update_chats_by_pk(pk_columns: { id: $chat_id }, _set: { title: $title }) {
      id
    }
  }
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription GetMessages($chat_id: Int!) {
    messages(where: { chat_id: { _eq: $chat_id } }, order_by: { created_at: asc }) {
      id
      role
      content
      created_at
    }
  }
`;

export const INSERT_USER_MESSAGE = gql`
  mutation InsertUserMessage($chat_id: Int!, $message: String!) {
    insert_messages_one(object: { chat_id: $chat_id, content: $message, role: "user" }) {
      id
    }
  }
`;

export const SEND_MESSAGE_ACTION = gql`
  mutation SendMessageAction($chat_id: Int!, $message: String!) {
    sendMessage(chat_id: $chat_id, message: $message)
  }
`;
