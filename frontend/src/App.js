// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DoctorInfo from './pages/seedoc';
import Navbar from './components/Navbar';
import EditMyDoc from './pages/Editdoc';

import UsernameProvider  from './pages/UsernameContext'; // Import the context

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='Navbar'>
          <UsernameProvider> {/* Wrap your app with the UsernameProvider */}
            <Routes>
              <Route path="Editdoc" element={<EditMyDoc />} />
              <Route path="seedoc" element={<DoctorInfo />} />
            </Routes>
          </UsernameProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
