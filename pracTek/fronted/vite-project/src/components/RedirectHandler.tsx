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
    const { setUser, user } = context;
    // אתחול MSAL (אם הגרסה דורשת זאת)
    useEffect(() => {
        const initializeMsal = async () => {
            try {
                console.log("RedirectHandler: Initializing MSAL instance...");
                await instance.initialize(); // ייתכן ובגרסאות מסוימות זה לא הכרחי
                setInitialized(true);
                console.log("RedirectHandler: MSAL instance initialized");
            } catch (error) {
                console.error("MSAL initialization failed:", error);
            }
        };
        if (!user) {
            initializeMsal();
        }
    }, [instance, user]);

    // טיפול בתוצאת ה-redirect
    useEffect(() => {
        console.log("RedirectHandler: useEffect triggered", { initialized, inProgress });
        // נוודא שאנחנו Initialized ושלא בעיצומו של תהליך אינטראקציה אחר
        if (initialized && inProgress === InteractionStatus.None) {
            console.log("RedirectHandler: Calling handleRedirectPromise...");
            instance.handleRedirectPromise()
                .then(async (response) => {
                    console.log("RedirectHandler: handleRedirectPromise response:", response);
                    if (response && response.account) {
                        // יש account של המשתמש
                        const account = response.account;
                        console.log("RedirectHandler: Found account, acquiring token silently...");
                        const tokenResponse = await instance.acquireTokenSilent({
                            scopes: ["User.Read"], // הסקופים שהגדרת
                            account,
                        });
                        const accessToken = tokenResponse.accessToken;
                        console.log("RedirectHandler: Login successful, acquired token:", accessToken);
                        // מביאים את פרטי המשתמש מ-Microsoft Graph
                        console.log("RedirectHandler: Fetching user info from Microsoft Graph...");
                        const userInfoResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
                        const userInfo = await userInfoResponse.json();
                        console.log("RedirectHandler: Fetched user info from Graph:", userInfo);
                        // בונים אובייקט המשתמש
                        const userData = {
                            first_name: userInfo.givenName || "",
                            last_name: userInfo.surname || "",
                            email: userInfo.mail || userInfo.userPrincipalName || "",
                        };
                        // מעדכנים בקונטקסט
                        setUser(userData);
                        console.log("RedirectHandler: setUser with userData:", userData);
                        // מנסים ליצור משתמש ב-DB
                        try {
                            console.log("RedirectHandler: Attempting to create user in DB with data:", userData);
                            const dbResponse = await fetch('http://localhost:5000/api/msps', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(userData),
                            });
                            if (dbResponse.ok) {
                                const dbData = await dbResponse.json();
                                console.log("RedirectHandler: User created in DB!", dbData);
                                // ניווט לעמוד הבא
                                navigate("/AddCustomer", { state: { formData: userData } });
                            } else {
                                const errorData = await dbResponse.json();
                                console.error(
                                    "RedirectHandler: Error creating user in DB:",
                                    dbResponse.statusText,
                                    errorData
                                );
                                // אם זו שגיאת E11000 (משתמש כבר קיים) - מנווטים בכל זאת
                                if (errorData.message && errorData.message.includes("E11000 duplicate key")) {
                                    console.log("RedirectHandler: The user already exists. Navigating anyway.");
                                    navigate("/AddCustomer", { state: { formData: userData } });
                                } else {
                                    // אם שגיאה אחרת, אפשר להחליט מה לעשות
                                    console.log("RedirectHandler: Some other error. Optionally navigate('/error')");
                                    // navigate("/error");
                                }
                            }
                        } catch (dbError) {
                            console.error("RedirectHandler: Exception during DB request:", dbError);
                            // אופציונלי: navigate("/error");
                        }
                    } else {
                        console.log("RedirectHandler: No response or account found from handleRedirectPromise.");
                    }
                })
                .catch((error) => {
                    console.error("Login failed:", error);
                    navigate("/error"); // או עמוד אחר בהתאם לצורך
                });
        }
    }, [instance, inProgress, initialized, navigate, setUser]);
    return null; // אין צורך להציג UI
};
export default RedirectHandler;