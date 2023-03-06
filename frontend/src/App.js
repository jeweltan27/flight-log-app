import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
