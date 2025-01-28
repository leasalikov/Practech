// // import React from 'react';
// import './App.css';
// import Dashboard from "./components/A/Dashboard";
// import Success from './components/Success';
// const App: React.FC = () => {
//   return (
//    <div>
//     {/* <Dashboard></Dashboard> */}
//     <Success></Success>
//    </div>
//   );
// };

// export default App;


// import React from 'react';
import './App.css';
import { PrimeReactProvider } from 'primereact/api'; // PrimeReact Context Provider
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Routing components
import SignUp from './components/B/SingUp'; // SignUp component
import AddCustomers from './components/B/AddCustomers'; // CreateCompany component
import Success from './components/Success';
import Dashboard from "./components/A/Dashboard";
const App: React.FC = () => {
  return (
   <div>
    <Dashboard></Dashboard>
   </div>
  );
};
export default App;