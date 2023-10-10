import {BrowserRouter , Routes , Route ,Switch} from 'react-router-dom'

//pages & Components
import DoctorHome from './pages/DoctorHome';
import DoctorInfo from './pages/seedoc';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className='Navbar'>
       <Routes>
        
         <Route  path="DoctorHome" element={<DoctorHome/>} />

         <Route  path="seedoc" element={<DoctorInfo/>} />
         

          </Routes>
      </div>
     
      </BrowserRouter>

    </div>
  );
}

export default App;