import { useState } from 'react';
import { useNhostClient, useSignInEmailPassword } from '@nhost/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import backgroundImage from '../assets/cool-background.jpg'; // Imports your new image

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const nhost = useNhostClient();
  const { signInEmailPassword } = useSignInEmailPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    let authError = null;
    if (isSignUp) {
      const { error: signUpError } = await nhost.auth.signUp({ email, password });
      authError = signUpError;
    } else {
      const { error: signInErrorResponse } = await signInEmailPassword(email, password);
      authError = signInErrorResponse;
    }
    setIsLoading(false);
    if (authError) {
      setError(authError.message);
    }
  };
  
  // Style for the main container that uses the background image
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div style={containerStyle} className="min-h-screen text-white flex items-center justify-center">
      {/* This div adds a semi-transparent dark overlay to make the text more readable */}
      <div className="absolute inset-0 bg-black opacity-50"></div> 
      
      {/* The form is relative and has a z-index to appear on top of the overlay */}
      <div className="relative z-10 w-full max-w-md bg-gray-800 bg-opacity-75 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Chatbot</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-400 block mb-2">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="w-full px-4 py-2 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"/>
          </div>
          <div className="relative">
            <label className="text-sm font-semibold text-gray-400 block mb-2">Password</label>
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className="w-full px-4 py-2 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"/>
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-200">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <button type="submit" disabled={isLoading} className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-md font-semibold transition-colors disabled:bg-gray-500">
            {isLoading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>
        <div className="text-center mt-6">
          <button onClick={() => { setIsSignUp(!isSignUp); setError(null); }} className="text-purple-400 hover:text-purple-300 text-sm">
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;