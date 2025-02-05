import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCustomer from './components/MSP/AddCustomer';
import Success from './components/Success';
import SignUp from './components/SingUp';
import CreateCompany from './components/DTC/CreateCompany';
import Dashboard from './components/MSP/pages/Dashboard';
import Customers from './components/MSP/Customers';
import People from './components/MSP/pages/People';
import CreateProject from './components/DTC/CreateCompany';
import Assessments from './components/MSP/pages/Assesments';
import PoliciesProcedures from './components/MSP/pages/Policies&Procedures';
import BAAManagement from './components/MSP/pages/BAAManagment';
import Logout from './components/LogOut';
import { msalConfig } from './components/MsalConfig';
// import RedirectHandler from './components/RedirectHandler';
import { PublicClientApplication } from '@azure/msal-browser';
import { UserContextProvider } from './components/ContextProvider';
import { PrimeReactProvider } from 'primereact/api';
import { LogoutProvider } from './components/MSP/componnents/LogOutContext';
import LogoutModal from './components/LogOut';


const msalInstance = new PublicClientApplication(msalConfig);

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <PrimeReactProvider>
        <MsalProvider instance={msalInstance}>
          <Router>
            {/* <RedirectHandler /> */}
            <LogoutProvider >
              <LogoutModal />
              <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/AddCustomer" element={<AddCustomer />} />
                <Route path="/CreateCompany" element={<CreateCompany />} />
                <Route path="/Success" element={<Success />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Customers" element={<Customers />} />
                <Route path="/People" element={<People />} />
                <Route path="/Assessments" element={<Assessments />} />
                <Route path="/PoliciesProcedures" element={<PoliciesProcedures />} />
                <Route path="/BAAManagement" element={<BAAManagement />} />
                <Route path="/Logout" element={<Logout />} />
                <Route path="/CreateProject" element={<CreateProject />} />
              </Routes>
            </LogoutProvider>
          </Router>
        </MsalProvider>
      </PrimeReactProvider>
    </UserContextProvider>
  );
};

export default App;
