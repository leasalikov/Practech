import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import "../components/SingUp.css";
import DashboardImage from "../../src/assets/Screenshot 2025-01-27 153239.jpg";
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    const userData = { firstName, lastName, emailOrPhone, password };
    console.log("User Data:", userData);
    navigate("/AddCustomers", { state: { userData } });
  };
  // :white_check_mark: Google Login - פונקציה שמחזירה פונקציה
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);
      navigate("/Dashboard"); // הפנייה לדשבורד לאחר כניסה מוצלחת
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });
  return (
    <div className="signup-container">
      <div className="left-section">
        <img src={DashboardImage} alt="Dashboard" />
      </div>
      <div className="right-section">
        <h1>Create your account :wave:</h1>
        <InputText placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <InputText placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <InputText placeholder="Email or Phone" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} />
        <Password placeholder="Password" toggleMask value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button label="Register" onClick={handleSubmit} />
        {/* :white_check_mark: תיקון קריאת Google Login בפונקציה אנונימית */}
        <Button
          icon="pi pi-google"
          className="p-button-rounded p-button-secondary"
          onClick={() => loginWithGoogle()}
        />
      </div>
    </div>
  );
};
export default SignUp;