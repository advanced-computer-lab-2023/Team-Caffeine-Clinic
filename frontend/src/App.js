import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Doctors from './pages/doctors';
import FamilyMembers from './pages/familyMembers';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar/>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route path='' element={<Home/>}/>
            <Route path='doctors' element={<Doctors/>}/>
            <Route path='familyMembers' element={<FamilyMembers/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
