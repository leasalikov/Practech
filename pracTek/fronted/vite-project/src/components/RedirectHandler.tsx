// import React, { useEffect, useState } from 'react';
// import { useMsal } from '@azure/msal-react';
// import { useNavigate } from 'react-router-dom';

// const RedirectHandler: React.FC = () => {
//   const { instance } = useMsal();
//   const navigate = useNavigate();
//   const [initialized, setInitialized] = useState(false);

//   useEffect(() => {
//     const initializeMsal = async () => {
//       try {
//         await instance.initialize();  // מבצע אתחול ל-MSAL instance
//         setInitialized(true);
//       } catch (error) {
//         console.error("MSAL initialization failed:", error);
//       }
//     };

//     initializeMsal();
//   }, [instance]);

//   useEffect(() => {
//     if (initialized) {
//       instance.handleRedirectPromise().then((response) => {
//         if (response && response.accessToken) {
//           console.log("Login successful!");
//           navigate("/AddCustomer"); 
//         } else {
//           console.log("No response or access token found.");
//         }
//       }).catch((error) => {
//         console.error("Login failed:", error);
//         navigate("/error");  // הפניה לעמוד שגיאה במקרה של כישלון
//       });
//     }
//   }, [instance, initialized, navigate]);

//   return null;
// };

// export default RedirectHandler;


import React, { useEffect, useState, useContext } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import { InteractionStatus } from '@azure/msal-browser';
import { UserContext } from './ContextProvider';

const RedirectHandler: React.FC = () => {
  const { instance, inProgress } = useMsal();
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);

  // חיבור לקונטקסט שלנו כדי שנוכל לעדכן את פרטי המשתמש
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('RedirectHandler must be used within a UserContextProvider');
  }
  const { setUser } = context;

  // אתחול MSAL (אם את משתמשת בגרסה שדורשת זאת)
  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await instance.initialize(); // ייתכן ובגרסאות מסוימות זה לא הכרחי
        setInitialized(true);
      } catch (error) {
        console.error("MSAL initialization failed:", error);
      }
    };
    initializeMsal();
  }, [instance]);

  // טיפול בתוצאת ה-redirect
  useEffect(() => {
    // נוודא שאנחנו Initialized ושלא בעיצומו של תהליך אינטראקציה אחר
    if (initialized && inProgress === InteractionStatus.None) {
      instance
        .handleRedirectPromise()
        .then(async (response) => {
          if (response && response.account) {
            // ברגע שחזרנו מההתחברות, יש לנו account של המשתמש
            const account = response.account;

            // מפיקים token בשקט
            const tokenResponse = await instance.acquireTokenSilent({
              scopes: ["User.Read"], // הסקופים שהגדרת
              account,
            });

            const accessToken = tokenResponse.accessToken;
            console.log("Login successful, acquired token:", accessToken);

            // מביאים את פרטי המשתמש מ-Microsoft Graph
            const userInfoResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            const userInfo = await userInfoResponse.json();
            console.log("Fetched user info from Graph:", userInfo);

            // מעדכנים בקונטקסט
            setUser({
              first_name: userInfo.givenName || "",
              last_name: userInfo.surname || "",
              email: userInfo.mail || userInfo.userPrincipalName || "",
            });

            // מפנים לעמוד הבא
            navigate("/AddCustomer");
          } else {
            console.log("No response or account found.");
          }
        })
        .catch((error) => {
          console.error("Login failed:", error);
          navigate("/error"); // או עמוד אחר בהתאם לצורך
        });
    }
  }, [instance, inProgress, initialized, navigate, setUser]);

  return null; // אין צורך להציג משהו
};

export default RedirectHandler;
