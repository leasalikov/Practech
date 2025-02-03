// // import React from 'react';
// import './App.css';
// import { PrimeReactProvider } from 'primereact/api'; // PrimeReact Context Provider
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Routing components
// import SignUp from './components/SingUp'; // SignUp component
// import AddCustomers from './components/DTC/AddCustomers'; // CreateCompany component
// import CreateCompany from './components/DTC/CreateCompany';

// import Success from './components/Success';

// import Dashboard from './components/MSP/pages/Dashboard';
// import Custemers from './components/MSP/Customers';
// import People from './components/MSP/pages/People';

// import CreateProject from './components/DTC/CreateCompany';
// import Assesments from './components/MSP/pages/Assesments';
// import PoliciesProcedures from './components/MSP/pages/Policies&Procedures';
// import BAAManagment from './components/MSP/pages/BAAManagment';
// import Policies from './components/MSP/pages/Policies&Procedures'
// import Logout from './components/LogOut';


// const App: React.FC = () => {


//   return (
//     <PrimeReactProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<SignUp />} />
//           <Route path="/AddCustomers" element={<AddCustomers />} />
//           <Route path="/CreateCompany" element={<CreateCompany />} />
//           <Route path="/Success" element={<Success/>} />
//           <Route path='/Dashboard' element={<Dashboard/>} />
//           <Route path='/Customers' element={<Custemers/>} />
//           <Route path='/People' element={<People/>} />
//           <Route path='/Assesments' element={<Assesments/>} />
//           <Route path='/PoliciesProcedures' element={<PoliciesProcedures/>} />
//           <Route path='/BAAManagment' element={<BAAManagment/>} />
//           <Route path='/LogOut' element={<Logout/>} />




//           <Route path="/CreateProject" element={<CreateProject />} />
//           {/* Add more routes as needed */}

//         </Routes>
//       </Router>
//     </PrimeReactProvider>
//   );
// }
// export default App;


import React from 'react';
import './App.css';
import { PrimeReactProvider } from 'primereact/api'; // PrimeReact Context Provider
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Routing components
import SignUp from './components/SingUp'; // SignUp component
import AddCustomer from './components/MSP/AddCustomer'; // CreateCompany component
import CreateCompany from './components/DTC/CreateCompany';
import { UserContextProvider } from './components/ContextProvider'; // נתיב לקובץ של ה-Context
import Success from './components/Success';

import Dashboard from './components/MSP/pages/Dashboard';
import Custemers from './components/MSP/Customers';
import People from './components/MSP/pages/People';

import CreateProject from './components/MSP/CreateProject';
import Assesments from './components/MSP/pages/Assesments';
import PoliciesProcedures from './components/MSP/pages/Policies&Procedures';
import BAAManagment from './components/MSP/pages/BAAManagment';
import Policies from './components/MSP/pages/Policies&Procedures'
import Logout from './components/LogOut';

import { LogoutProvider } from './components/MSP/componnents/LogOutContext'; // ייבוא ה-Context
import LogoutModal from './components/LogOut'; // ייבוא המודל

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <PrimeReactProvider>
        <Router>
          <LogoutProvider> {/* עטיפת כל היישום עם LogoutProvider */}
            <LogoutModal /> {/* כאן אנחנו מוסיפים את ה-LogoutModal */}
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/AddCustomer" element={<AddCustomer />} />
              <Route path="/CreateCompany" element={<CreateCompany />} />
              <Route path="/Success" element={<Success />} />
              <Route path='/Dashboard' element={<Dashboard />} />
              <Route path='/Customers' element={<Custemers />} />
              <Route path='/People' element={<People />} />
              <Route path='/Assesments' element={<Assesments />} />
              <Route path='/PoliciesProcedures' element={<PoliciesProcedures />} />
              <Route path='/BAAManagment' element={<BAAManagment />} />
              <Route path='/LogOut' element={<Logout />} />
              <Route path="/AddCustomer/CreateProject/" element={<CreateProject />} />
              {/* Add more routes as needed */}
            </Routes>
          </LogoutProvider>
        </Router>
      </PrimeReactProvider>
    </UserContextProvider>
  );
};

export default App;
