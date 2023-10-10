import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SignUp from './pages/SignUp'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route
              path='/signup'
              element={<SignUp/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
