import "./style/Header.css"
import logo from "./icons/logo.png";
import { useContext } from "react";
import { UserContext } from './ContextProvider';

const Header: React.FC = () => {

  const context = useContext(UserContext); 
  if (!context) {
    throw new Error('UserProfile must be used within a UserContextProvider');
  }

  const { setUser } = context;
  const firstNameLetter = context.user?.first_name[0].toUpperCase();
  const firstLastNameLetter = context.user?.last_name? context.user?.last_name[0].toUpperCase(): '';
  return (
  
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <div className="user-info">
        <div className="user-avatar">{`${firstNameLetter}${firstLastNameLetter}`}</div>
        <div className="user-details">
        <span className="user-name">{`${context.user?.first_name} ${context.user?.last_name}`}</span>
        <span className="user-email">{context.user?.email}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;