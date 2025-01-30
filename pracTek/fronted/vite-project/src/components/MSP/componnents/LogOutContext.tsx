import React, { createContext, useState, useContext, ReactNode } from "react";

// יצירת context לניהול מצב ה-logout modal
const LogoutContext = createContext<any>(null);

interface LogoutProviderProps {
  children: ReactNode;
}

// קומפוננטה שמספקת את ה-logout context לכל הקומפוננטות
export const LogoutProvider: React.FC<LogoutProviderProps> = ({ children }) => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const openLogoutModal = () => setLogoutModalVisible(true);
  const closeLogoutModal = () => setLogoutModalVisible(false);

  return (
    <LogoutContext.Provider value={{ isLogoutModalVisible, openLogoutModal, closeLogoutModal }}>
      {children}
    </LogoutContext.Provider>
  );
};

// פונקציה להחזרת ה-context
export const useLogout = () => useContext(LogoutContext);
