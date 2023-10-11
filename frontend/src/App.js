import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AdminHome from "./pages/AdminHome"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
        <Routes>
        <Route
        path="/"
        element =  {<AdminHome/>}
        />
        </Routes>
        </div>  
      </BrowserRouter>
    </div>
  );
}

export default App;
