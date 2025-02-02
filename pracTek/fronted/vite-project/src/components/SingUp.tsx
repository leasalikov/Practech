import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Form, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import DashboardImage from "../../src/assets/Screenshot 2025-01-27 153239.jpg";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputSwitch } from "primereact/inputswitch";
import "../components/SingUp.css";
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [userData, setUserData] = useState<any>(null); // סטייט חדש לשמירת נתוני המשתמש

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!emailOrPhone || (!emailOrPhone.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && !emailOrPhone.match(/^\d+$/))) {
      newErrors.emailOrPhone = "Enter a valid email or phone number";
    }
          if (!password || password.length < 8) newErrors.password = "Password must be at least 8 characters long";
    if (!agreed) newErrors.agreed = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = () => {
    if (validateForm()) {
      const userData = {
        firstName,
        lastName,
        emailOrPhone,
        password,
        isCompany,
      };
      console.log("User Data befor:", userData);
      navigate("/AddCustomers", { state: { userData } }); // שליחת הנתונים לדף הבא
      console.log("User Data after:", userData);
    }
  };
/////////////////////////////////////////////////////////////////////////////////////
  const loginWithGoogle = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log("Google Login Success:", codeResponse);
  
      try {
        // שליחת ה-Code לשרת של Google כדי לקבל Access Token
        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: "97432148507-pm5arf15v5euedvpli8sb6eesocqm5m3.apps.googleusercontent.com", // הכנס את Client ID שלך מה-Google Console
            client_secret: "YOUR_CLIENT_SECRET", // הכנס את Client Secret שלך
            code: codeResponse.code, // הקוד שהתקבל מההתחברות
            grant_type: "authorization_code",
            redirect_uri: "http://localhost:5173", // אותו Redirect URI כמו שהגדרת ב-Google Console
          }),
          
        });
  
        const tokenData = await tokenResponse.json();
        console.log("Google Token Data:", tokenData);
  
        // בקשה לקבלת פרטי המשתמש
        const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });
        const userInfo = await userInfoResponse.json();
        console.log("Google User Info:", userInfo);
  
        setUserData({
          firstName: userInfo.given_name || "",
          lastName: userInfo.family_name || "",
          emailOrPhone: userInfo.email || "",
          password: "",
          isCompany: false,
        });
  
        setTimeout(() => {
          console.log("User Data After Update:", userInfo);
          navigate("/AddCustomers", { state: { userData: userInfo } });
        }, 500); // דיליי קטן כדי לוודא שהסטייט מתעדכן לפני הניווט
  
      } catch (error) {
        console.error("Error exchanging code for token:", error);
      }
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });
  































































































/////////////////////////////////////////////////////////////






































































































































































































/////////////////////////////////////////////////////////
  return (
    <div className="signup-container">
      {/* Left Section */}
      <div className="left-section">
        <div className="logo-container flex items-center mb-8">
          <div className="logo-icon">⚡</div>
          <span className="logo-text">Dummy</span>
        </div>
        <div className="dashboard-image mb-8">
          <img src={DashboardImage} alt="Dashboard Illustration" className="w-full h-auto" />
        </div>
        <p className="text-gray-500">Let’s see what we have new, check it out!</p>
        <div className="navigation-buttons flex mt-6">
          <Button icon="pi pi-arrow-left" className="p-button-rounded mr-4 custom-button" />
          <Button icon="pi pi-arrow-right" className="p-button-rounded custom-button" />
        </div>
      </div>
      {/* Right Section */}
      <div className="right-section">
        <h1 className="text-3xl font-bold mb-4">Create your account 👋</h1>
        <p className="block text-gray-700 mb-2">It’s free and easy</p>
        <div className="form-group">
          <label className="block text-gray-700 mb-2">first name</label>
          <InputText placeholder="Enter your first name" className="w-full" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          {errors.firstName && <small className="text-red-500">{errors.firstName}</small>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2">last name</label>
          <InputText placeholder="Enter your last name" className="w-full" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          {errors.lastName && <small className="text-red-500">{errors.lastName}</small>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2">E-mail or phone number</label>
          <InputText placeholder="Type your e-mail or phone number" className="w-full" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} />
          {errors.emailOrPhone && <small className="text-red-500">{errors.emailOrPhone}</small>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2">Password</label>
          <Password placeholder="Type your password" toggleMask feedback={false} className="w" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <small className="text-red-500">{errors.password}</small>}
        </div>
        <div className="form-group flex items-center mb-4">
          <label className="ml-2 text-gray-700">Sign up as company</label>
          <InputSwitch checked={isCompany} onChange={(e) => setIsCompany(e.value)} />
        </div>
        <div className="form-group flex items-start mb-6">
          <Checkbox checked={agreed} onChange={(e) => setAgreed(e.checked || false)} />
          <label className="ml-2 text-sm text-gray-600">
            By creating an account, you agree to the{" "}
            <a
              href="https://developers.google.com/workspace/terms?hl=he"
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms and Conditions
            </a>{" "}
            and our{" "}
            <a
              href="https://policies.google.com/privacy?hl=iw"
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>.
          </label>


          {errors.agreed && <small className="text-red-500">{errors.agreed}</small>}
        </div>
        <Button label="Register" className="w-full p-button-rounded custom-button mb-4" onClick={handleSubmit} />
        <Divider align="center">or do it via other accounts</Divider>
        <div className="social-login flex justify-center gap-4 mt-4">
          <Button icon="pi pi-google" className="p-button-rounded p-button-secondary" onClick={() => loginWithGoogle()} />
          <Button icon="pi pi-apple" className="p-button-rounded p-button-secondary" />
          <Button icon="pi pi-facebook" className="p-button-rounded p-button-secondary" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
//קישור לGOOGLE: https://console.cloud.google.com/apis/credentials?inv=1&invt=AboI5w&project=temporal-storm-449311-p5&supportedpurview=project