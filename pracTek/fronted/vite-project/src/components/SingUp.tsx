import React from "react";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputSwitch } from "primereact/inputswitch";
import { useNavigate } from "react-router-dom";
import { gapi } from 'gapi-script'; // הוספת גישה לספריית gapi
import "../components/SingUp.css";
import DashboardImage from "../../src/assets/Screenshot 2025-01-27 153239.jpg";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [isCompany, setIsCompany] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!emailOrPhone) newErrors.emailOrPhone = "Email or phone number is required";
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
      console.log("User Data:", userData);
      navigate("/AddCustomers", { state: { userData } }); // העברת הנתונים לדף הבא
    }
  };

  const handleGoogleSignIn = () => {
    const onSuccess = (response: any) => {
      const profile = response.getBasicProfile();
      const userData = {
        firstName: profile.getGivenName(),
        lastName: profile.getFamilyName(),
        emailOrPhone: profile.getEmail(),
        isCompany,
      };
      navigate("./DCT/AddCustomers", { state: { userData } });
    };

    const onFailure = (error: any) => {
      console.error("Login failed: ", error);
    };

    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signIn()
      .then(onSuccess)
      .catch(onFailure);
  };

  React.useEffect(() => {
    const initClient = () => {
      gapi.load("client:auth2", () => {
        gapi.auth2.init({
          client_id: "YOUR_GOOGLE_CLIENT_ID", // הכנס את ה-client ID שלך כאן
        });
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);


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
            <a href="#" className="text-blue-500 underline">Terms and Conditions</a>{" "} and our{" "}
            <a href="#" className="text-blue-500 underline">Privacy Policy</a>.
          </label>
          {errors.agreed && <small className="text-red-500">{errors.agreed}</small>}
        </div>
        <Button label="Register" className="w-full p-button-rounded custom-button mb-4" onClick={handleSubmit} />
        <Divider align="center">or do it via other accounts</Divider>
        <div className="social-login flex justify-center gap-4 mt-4">
          <Button icon="pi pi-google" className="p-button-rounded p-button-secondary" onClick={handleGoogleSignIn} />
          <Button icon="pi pi-apple" className="p-button-rounded p-button-secondary" />
          <Button icon="pi pi-facebook" className="p-button-rounded p-button-secondary" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
