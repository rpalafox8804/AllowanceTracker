import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import { useState } from 'react';
import RegLogForm from './components/RegLogForm';
import Dashboard from './components/Dashboard';
import ChildDashboard from './components/ChildDashboard';
import AdultDashboard from './components/AdultDashboard';
import AddChore from './components/AddChore';
import EditChore from './components/EditChore';
import ChoreInfo from './components/ChoreInfo';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
        <Routes>
          {/* {isLoggedIn ? <Route path ="/dashboard" element = {<Dashboard />} /> : <Route path="/" element={<RegLogForm setIsLoggedIn={setIsLoggedIn} />} />} */}
          <Route path="/" element ={<RegLogForm />} />
          <Route path ="/dashboard" element = {<Dashboard />} />
          <Route path ="/dashboard/adult/:id" element = {<AdultDashboard />} />
          <Route path ="/dashboard/child/:id/:firstName" element = {<ChildDashboard />} />
          <Route path = "/dashboard/newChore" element = {<AddChore />} />
          <Route path = "/dashboard/updateChore/:id" element = {<EditChore />} />
          <Route path = "dashboard/readChore/:id" element = {<ChoreInfo />} />


        </Routes>
    </div>
  );
}

export default App;
