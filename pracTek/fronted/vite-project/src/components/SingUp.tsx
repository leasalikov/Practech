import React, { useContext, useEffect, useState } from "react";
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
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from '@azure/msal-react';
import { PublicClientApplication } from "@azure/msal-browser";
import { InteractionType } from "@azure/msal-browser";
import { isValidPhoneNumber } from "react-phone-number-input";
import { UserContext } from './ContextProvider';


export const msalConfig = {
  auth: {
    clientId: "cae07ffa-36fc-4396-9b87-cb61256b5076",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:5173/",
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);


interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  isCompany: boolean;
  agreed: boolean;
}
interface Errors {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  isCompany: string;
  agreed: string;
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  // const { instance, accounts } = useMsal();

  const context = useContext(UserContext);
  if (!context) {
    throw new Error('UserProfile must be used within a UserContextProvider');
  }
  const { setUser } = useContext(UserContext)!;

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    isCompany: false,
    agreed: false,
  });
  const [errors, setErrors] = useState<Errors>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    isCompany: "",
    agreed: "",
  });


  const validateForm = (): boolean => {
    const newErrors: Errors = {
      first_name: formData.first_name ? '' : 'First name is required',
      last_name: formData.last_name ? '' : 'Last name is required',
      email: formData.email
        ? (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) || /^\+?[0-9]{10,15}$/.test(formData.email))
          ? '' : 'Invalid email or phone number'
        : 'Email or phone number is required',
      password: formData.password ? (formData.password.length >= 8 ? '' : 'Password must be at least 8 characters long') : 'Password is required',
      agreed: formData.agreed ? '' : 'You must agree to the terms and conditions',
      isCompany: ""
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleChange = (key: string, value: string | boolean | undefined) => {
    setFormData((prev) => ({ ...prev, [key]: value || '' }));
    if (key === 'email' && value) {
      const isValid = isValidPhoneNumber(value as string);
      setErrors((prev) => ({
        ...prev,
        email: isValid ? '' : 'Invalid phone number',
      }));
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      console.log("Submitting user data:", formData);
      setUser(formData);
      try {
        const response = await fetch('http://localhost:5000/api/msps', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("User created:", data);
          navigate("/AddCustomer", { state: { formData } });
        } else {
          const errorData = await response.json();
          console.error('Error creating user:', response.statusText, errorData);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);
      try {
        // Fetch user data from Google
        const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await userInfoResponse.json();
        console.log("Google User Info:", userInfo);
        setFormData({
          first_name: userInfo.given_name || "",
          last_name: userInfo.family_name || "",
          email: userInfo.email || "",
          password: "",
          isCompany: false,
          agreed: true,
        });
        setUser(userInfo)
        console.log("userInfo: ", userInfo)
        setTimeout(() => {
          navigate("/AddCustomer", { state: { formData } });
        }, 500); // Small delay to ensure state is updated before navigation
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
    },
  });


  // const loginWithMicrosoft = async () => {

  //   try {
  //     await instance.loginRedirect({
  //       scopes: ["User.Read", "openid", "profile", "email"],
  //     });

  //     console.log("Login redirect triggered");

  //     const account = accounts[0];

  //     if (account) {
  //       const tokenResponse = await instance.acquireTokenSilent({
  //         scopes: ["User.Read"],
  //         account: account,
  //       });

  //       const accessToken = tokenResponse.accessToken;
  //       console.log("Access Token acquired:", accessToken);

  //       const userInfoResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       });

  //       const userInfo = await userInfoResponse.json();
  //       console.log("Microsoft User Info:", userInfo);

  //       setFormData({
  //         first_name: userInfo.given_name,
  //         last_name: userInfo.family_name,
  //         email: userInfo.email,
  //         password: "",
  //         isCompany: false,
  //         agreed: false,

  //       });

  //       navigate("/AddCustomer", { state: { userData: userInfo } });
  //     } else {
  //       console.error("No account found after login.");
  //     }

  //   } catch (error) {
  //     console.error("Microsoft Login Failed:", error);
  //   }
  // };

  
  const handleMicrosoftLogin = async () => {
  
    console.log("Accounts:", accounts);
  
    try {
      await instance.loginRedirect({
        scopes: ["User.Read", "openid", "profile", "email"],
      });
  
      console.log("Login redirect successful");
  
      const account = accounts[0];
  
      if (account) {
        const tokenResponse = await instance.acquireTokenSilent({
          scopes: ["User.Read"],
          account: account,
        });
  
        const accessToken = tokenResponse.accessToken;
        console.log("Access Token acquired:", accessToken);
  
        const userInfoResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
  
        const userInfo = await userInfoResponse.json();
        console.log("Fetched User Info from Microsoft:", userInfo);
  
        const userData = {
          first_name: userInfo.givenName || "",
          last_name: userInfo.surname || "",
          email: userInfo.mail || userInfo.userPrincipalName || "",
          password: "",
          isCompany: false,
          agreed: true,
        };
  
        console.log("Attempting to set user data:", userData);
        setUser(userData);  // עדכון הקונטקסט
        console.log("User data set in context successfully");
  
        navigate("/AddCustomer", { state: { formData: userData } });
      } else {
        console.error("No account found after login.");
      }
    } catch (error) {
      console.error("Microsoft Login Failed:", error);
    }
  };
  

  return (
    <div className="signup-container">
      {/* Left Section */}
      <div className="left-section">
        <div className="logo-container flex items-center mb-8">
          <div className="logo-icon">:zap:</div>
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
        <h1 className="text-3xl font-bold mb-4">Create your account :wave:</h1>
        <p className="block text-gray-700 mb-2">It’s free and easy</p>
        <div className="form-group">
          <label className="block text-gray-700 mb-2">First name</label>
          <InputText
            placeholder="Enter your first name"
            className="w-full"
            value={formData.first_name}
            onChange={(e) => handleChange('first_name', e.target.value)}
          />
          {errors.first_name && <small className="text-red-500">{errors.first_name}</small>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2">Last name</label>
          <InputText
            placeholder="Enter your last name"
            className="w-full"
            value={formData.last_name}
            onChange={(e) => handleChange('last_name', e.target.value)}
          />
          {errors.last_name && <small className="text-red-500">{errors.last_name}</small>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2">E-mail or phone number</label>
          <InputText
            placeholder="Type your e-mail or phone number"
            className="w-full"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {errors.email && <small className="text-red-500">{errors.email}</small>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2">Password</label>
          <Password
            placeholder="Type your password"
            toggleMask
            feedback={false}
            className="w"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
          {errors.password && <small className="text-red-500">{errors.password}</small>}
        </div>
        <div className="form-group flex items-center mb-4">
          <label className="ml-2 text-gray-700">Sign up as company</label>
          <InputSwitch checked={formData.isCompany} onChange={(e) => handleChange('isCompany', e.value)} />
        </div>
        <div className="form-group flex items-start mb-6">
          <Checkbox
            checked={formData.agreed}
            onChange={(e) => handleChange('agreed', e.checked || false)}
          />
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
        <div className="center-button">
          <Button
            label="Register"
            className="p-button-rounded blue-button mb-4"
            onClick={handleSubmit}
          />
        </div>
        <Divider align="center">or do it via other accounts</Divider>
        <div className="social-login flex justify-center gap-4 mt-4">
          <Button
            icon="pi pi-google"
            className="p-button-rounded p-button-secondary"
            onClick={() => loginWithGoogle()}
          />
          <Button icon="pi pi-microsoft" className="p-button-rounded p-button-secondary" onClick={() => handleMicrosoftLogin()} />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
