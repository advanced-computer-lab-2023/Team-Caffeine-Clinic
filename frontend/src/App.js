import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SignUp from './pages/SignUp';
import Doctors from './pages/doctors';
import FamilyMembers from './pages/familyMembers';
import Perscription from './pages/Perscriptions';
import SinglePerscriptions from './pages/SinglePerscriptionDetails'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='' element={<WithNavbarAndSidebar><Home /></WithNavbarAndSidebar>} />
            <Route path='doctors' element={<WithNavbarAndSidebar><Doctors /></WithNavbarAndSidebar>} />
            <Route path='familyMembers' element={<WithNavbarAndSidebar><FamilyMembers /></WithNavbarAndSidebar>} />
            <Route path='Perscriptions' element={<WithNavbarAndSidebar><Perscription /></WithNavbarAndSidebar>} />
            <Route path='SinglePerscriptions/:id' element={<WithNavbarAndSidebar><SinglePerscriptions /></WithNavbarAndSidebar>} />
            <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function WithNavbarAndSidebar({ children }) {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="pages">
        {children}
      </div>
    </div>
  );
}

export default App;
