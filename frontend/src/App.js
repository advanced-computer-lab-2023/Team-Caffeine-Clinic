import {BrowserRouter , Routes , Route} from 'react-router-dom'

//pages & Components
import DoctorHome from './pages/DoctorHome';
import DoctorInfo from './components/seedoc';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <DoctorInfo />
      <div className='pages'>
        <Routes>
         <Route 
            path="/" 
            element={<DoctorHome/>}
         />

        </Routes>

      </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
