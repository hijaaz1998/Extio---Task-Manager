import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './assets/scss/main.scss';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store/store';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { Toaster } from 'react-hot-toast';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> {/* Wrap your App with PersistGate */}
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
