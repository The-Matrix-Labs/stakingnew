import './App.css';
import Navbar from './components/Navbar_module/Navbar';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './pages/Home/Home';


function App() {
  return (
    <>

      <Router>
            <div>
              <Routes>
                <Route exact path="/" element={<Home />} />
              </Routes>
            </div>
          </Router>
    </>
  );
}

export default App;
