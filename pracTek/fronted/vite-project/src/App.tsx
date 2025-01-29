// import React from 'react';
import './App.css';
import { PrimeReactProvider } from 'primereact/api'; // PrimeReact Context Provider
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Routing components
import SignUp from './components/SingUp'; // SignUp component
import AddCustomers from './components/DTC/AddCustomers'; // CreateCompany component
import CreateCompany from './components/DTC/CreateCompany';

import Success from './components/Success';
<!-- <<<<<<< customer -->
import Dashboard from './components/MSP/pages/Dashboard';
<!-- ======= -->
<!-- import Dashboard from './components/A/Dashboard'; -->
<!-- >>>>>>> main -->
import Custemers from './components/MSP/Customers';
import People from './components/MSP/pages/People';

import CreateProject from './components/DTC/CreateCompany';
import Assesments from './components/MSP/pages/Assesments';
import PoliciesProcedures from './components/MSP/pages/Policies&Procedures';
import BAAManagment from './components/MSP/pages/BAAManagment';
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
          <Route path='/People' element={<People/>} />
          <Route path='/Assesments' element={<Assesments/>} />
          <Route path='/Policies' element={<PoliciesProcedures/>} />
          <Route path='/BAAManagment' element={<BAAManagment/>} />



          <Route path="/CreateProject" element={<CreateProject />} />
          {/* Add more routes as needed */}

        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}
export default App;
