import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { NhostClient, NhostReactProvider } from '@nhost/react';
import { NhostApolloProvider } from '@nhost/react-apollo';
import { BrowserRouter } from 'react-router-dom';

const nhost = new NhostClient({
  subdomain: 'xdbwadeiuiuietjedrnl',
  region: 'ap-south-1'
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NhostReactProvider nhost={nhost}>
        <NhostApolloProvider nhost={nhost}>
          <App />
        </NhostApolloProvider>
      </NhostReactProvider>
    </BrowserRouter>
  </React.StrictMode>
);