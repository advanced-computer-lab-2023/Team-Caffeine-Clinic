import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AdminHome from "./pages/ViewAdmins"
import Home from "./pages/AdminHome";
import DoctorAppHome from './pages/viewDoctorApps';
import ViewDoctorHome from './pages/viewDoctors';
import HPHome from './pages/viewHealthPacks';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
        <Routes>
        <Route
        path="/"
        element =  {<Home/>}
        />
        <Route
        path="/AdminHome"
        element =  {<AdminHome/>}
          />
        <Route
        path="/viewDoctorApps"
        element =  {<DoctorAppHome/>}
          />
        <Route
        path="/viewDoctors"
        element =  {<ViewDoctorHome/>}
          />
        <Route
        path="/viewHealthPacks"
        element =  {<HPHome/>}
          />
        </Routes>
        </div>  
      </BrowserRouter>
    </div>
  );
}

export default App;
