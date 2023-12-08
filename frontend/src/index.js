import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { MedicinesContextProvider } from './context/MedicinesContext';
import { AuthContextProvider } from './context/AuthContext';
import { AddressesContextProvider } from './context/AddressesContext';
import { OrdersContextProvider } from './context/OrdersContext';
import  ChatProvider  from './context/ChatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MedicinesContextProvider>
        <AddressesContextProvider>
          <OrdersContextProvider>
          <ChatProvider>
            <App />
            </ChatProvider>
          </OrdersContextProvider>  
        </AddressesContextProvider>
      </MedicinesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
