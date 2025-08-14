import { gql } from '@apollo/client';

export const GET_CHATS_QUERY = gql`
  query GetChats {
    chats(order_by: { created_at: desc }) { id, created_at }
  }`;
export const CREATE_CHAT_MUTATION = gql`
  mutation CreateChat {
    insert_chats_one(object: {}) { id, created_at }
  }`;
export const MESSAGES_SUBSCRIPTION = gql`
  subscription GetMessages($chat_id: Int!) {
    messages(where: { chat_id: { _eq: $chat_id } }, order_by: { created_at: asc }) {
      id, role, content, created_at
    }
  }`;
export const INSERT_USER_MESSAGE = gql`
  mutation InsertUserMessage($chat_id: Int!, $message: String!) {
    insert_messages_one(object: { chat_id: $chat_id, content: $message, role: "user" }) { id }
  }`;
export const SEND_MESSAGE_ACTION = gql`
  mutation SendMessageAction($chat_id: Int!, $message: String!) {
    sendMessage(chat_id: $chat_id, message: $message)
  }`;