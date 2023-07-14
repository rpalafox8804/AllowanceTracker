import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import RegLogForm from './components/RegLogForm';
import Dashboard from './components/Dashboard';
import { useState } from 'react';
import AdultDashboard from './components/AdultDashboard';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
        <Routes>
          {/* {isLoggedIn ? <Route path ="/dashboard" element = {<Dashboard />} /> : <Route path="/" element={<RegLogForm setIsLoggedIn={setIsLoggedIn} />} />} */}
          <Route path="/" element ={<RegLogForm />} />
          <Route path ="/dashboard" element = {<Dashboard />} />
          <Route path ="/dashboard/adult" element = {<AdultDashboard />} />


        </Routes>
    </div>
  );
}

export default App;
