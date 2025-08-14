import { useAuthenticationStatus, useUserData, useSignOut } from '@nhost/react';
import AuthPage from './components/AuthPage';
import ChatPage from './components/ChatPage';

const PleaseVerifyEmail = () => {
  const { signOut } = useSignOut();
  const user = useUserData();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg text-center shadow-lg">
        <h2 className="text-2xl mb-4 font-bold">Email Verification Required</h2>
        <p className="mb-4 text-gray-300">A verification link has been sent to <strong className="text-white">{user?.email}</strong>.</p>
        <p className="text-gray-400">Please check your inbox (and spam folder) to activate your account.</p>
        <button onClick={signOut} className="mt-6 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors">
          Sign Out and Return to Login
        </button>
      </div>
    </div>
  );
};

function App() {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();
  const user = useUserData();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  if (!user?.emailVerified) {
    return <PleaseVerifyEmail />;
  }

  return <ChatPage />;
}

export default App;