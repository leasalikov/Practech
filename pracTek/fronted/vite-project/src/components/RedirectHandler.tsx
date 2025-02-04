import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';

const RedirectHandler: React.FC = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await instance.initialize();  // מבצע אתחול ל-MSAL instance
        setInitialized(true);
      } catch (error) {
        console.error("MSAL initialization failed:", error);
      }
    };

    initializeMsal();
  }, [instance]);

  useEffect(() => {
    if (initialized) {
      instance.handleRedirectPromise().then((response) => {
        if (response && response.accessToken) {
          console.log("Login successful!");
          navigate("/AddCustomer"); 
        } else {
          console.log("No response or access token found.");
        }
      }).catch((error) => {
        console.error("Login failed:", error);
        navigate("/error");  // הפניה לעמוד שגיאה במקרה של כישלון
      });
    }
  }, [instance, initialized, navigate]);

  return null;
};

export default RedirectHandler;
