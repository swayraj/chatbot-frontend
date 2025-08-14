AI Chat Application
A full-stack, real-time chatbot application built as an internship assessment. The project features a secure backend, a real-time GraphQL API, and an AI-powered chat interface.

🚀Live Demo: http://chatbot-subspace.netlify.app

✨ Core Features
Secure Authentication: Users can sign up and sign in using email and password, with all features protected behind authentication.

Real-Time Chat System: A fully-featured chat interface that displays messages in real-time using GraphQL Subscriptions.

AI-Powered Chatbot: The chatbot is powered by a free model from OpenRouter, orchestrated through a robust n8n workflow.

Database with Row-Level Security: Utilizes Hasura and PostgreSQL to ensure users can only access and manage their own chat data.

GraphQL-Only API: All frontend-to-backend communication is handled exclusively through GraphQL queries, mutations, and subscriptions.

Clean, Modern UI: A responsive and visually appealing user interface built with React and styled with Tailwind CSS.


🛠️ Tech Stack & Architecture
This project leverages a modern, serverless, and scalable tech stack.

Frontend
React: A JavaScript library for building user interfaces.

Vite: A blazing-fast frontend build tool.

Apollo Client: A comprehensive state management library for managing GraphQL data.

Tailwind CSS: A utility-first CSS framework for rapid UI development.


Backend & Database
Nhost: A serverless backend platform that provides:

Authentication: Manages user sign-up and sign-in.

PostgreSQL Database: A powerful, open-source relational database.

Hasura: An instant GraphQL API engine that sits on top of the PostgreSQL database.

GraphQL API: Auto-generates queries, mutations, and subscriptions.

Permissions: Implements granular, row-level security.

Actions: Triggers external webhooks for custom business logic.

Automation & AI
n8n: A workflow automation tool used to orchestrate the chatbot logic.

OpenRouter: A service that provides access to various free and paid AI models.


Deployment
Netlify: A platform for deploying and hosting modern web projects, connected via CI/CD with GitHub.


Architecture Flow:

User Action (React App on Netlify)
       │
       └───> GraphQL Mutation/Query (to Hasura)
                   │
                   └───> Nhost (Authentication & Database)
                           │
                           └───> PostgreSQL (Data Storage)

User Sends Message (React App)
       │
       └───> GraphQL Action (to Hasura)
                   │
                   └───> Webhook (to n8n)
                               │
                               └───> API Call (to OpenRouter AI)
                                           │
                                           └───> AI Response (back to n8n)
                                                       │
                                                       └───> GraphQL Mutation (n8n to Hasura)
                                                                   │
                                                                   └───> Real-time Update via Subscription (Hasura to React App)


🚀 Getting Started Locally
To run this project on your local machine, follow these steps:

1.Clone the repository:

git clone https://github.com/your-username/chatbot-frontend.git
cd chatbot-frontend

2.Install dependencies:

npm install

3.Set up your backend:

You will need to create your own Nhost, Hasura, and n8n setup following the project's architecture.

4.Create an environment file:

Create a file named .env in the root of the project.

Add your Nhost Backend URL to this file:

VITE_NHOST_BACKEND_URL=https://your-nhost-backend-url.nhost.run

(Note: The current version in the repository uses a hardcoded subdomain/region in src/main.jsx for simplicity. For a production setup, using the .env file is recommended.)

5.Start the development server:

npm run dev

The application should now be running on http://localhost:5173.

