import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Registration from './pages/Registration';
import NewFlightLog from './pages/NewFlightLog';
import UpdateFlightLog from './pages/UpdateFlightLog';

function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/newflightlog" element={<NewFlightLog />} />
            <Route path="/updateflightlog" element={<UpdateFlightLog />} />

        </Routes>
    </div>
  );
}

export default App;
