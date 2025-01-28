// import React from 'react';
import './App.css';
import { PrimeReactProvider } from 'primereact/api'; // PrimeReact Context Provider
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Routing components
import SignUp from './components/SingUp'; // SignUp component
import AddCustomers from './components/DTC/AddCustomers'; // CreateCompany component
import CreateCompany from './components/DTC/CreateCompany';
import CreateProject from './components/DTC/CreateCompany';
// import Dashboard from "./components/A/Dashboard";
const App: React.FC = () => {
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/AddCustomers" element={<AddCustomers />} />
          <Route path="/CreateCompany" element={<CreateCompany />} />
          <Route path="/CreateProject" element={<CreateProject />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}
export default App;
