// import React from 'react';
import './App.css';
import { PrimeReactProvider } from 'primereact/api'; // PrimeReact Context Provider
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Routing components
import SignUp from './components/SingUp'; // SignUp component
import AddCustomers from './components/DTC/AddCustomers'; // CreateCompany component
import CreateCompany from './components/DTC/CreateCompany';
import Success from './components/Success';
import Dashboard from './components/MSP/Dashboard';
import Custemers from './components/MSP/Customers';

// import Dashboard from "./components/A/Dashboard";
const App: React.FC = () => {
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/AddCustomers" element={<AddCustomers />} />
          <Route path="/CreateCompany" element={<CreateCompany />} />
          <Route path="/Success" element={<Success/>} />
          <Route path='/Dashboard' element={<Dashboard/>} />
          <Route path='/Customers' element={<Custemers/>} />


        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}
export default App;