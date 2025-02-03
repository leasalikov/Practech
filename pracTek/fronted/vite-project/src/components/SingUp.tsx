import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import DashboardImage from "../../src/assets/Screenshot 2025-01-27 153239.jpg";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputSwitch } from "primereact/inputswitch";
import "../components/SingUp.css";

interface FormData {
  firstName: string;
  lastName: string;
  emailOrPhone: string;
  password: string;
  isCompany: boolean;
  agreed: boolean;
}

interface Errors {
  firstName: string;
  lastName: string;
  emailOrPhone: string;
  password: string;
  isCompany: string;
  agreed: string;
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    emailOrPhone: "",
    password: "",
    isCompany: false,
    agreed: false,
  });
  const [errors, setErrors] = useState<Errors>({
    firstName: "",
    lastName: "",
    emailOrPhone: "",
    password: "",
    isCompany: "",
    agreed: "",
  });

  const validateForm = () => {
    let formErrors = { ...errors };

    // Validate first name
    if (!formData.firstName) {
      formErrors.firstName = "First name is required";
    } else {
      formErrors.firstName = "";
    }

    // Validate last name
    if (!formData.lastName) {
      formErrors.lastName = "Last name is required";
    } else {
      formErrors.lastName = "";
    }

    // Validate email or phone
    if (!formData.emailOrPhone) {
      formErrors.emailOrPhone = "Email or phone number is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.emailOrPhone) && !/^\+?[0-9]{10,15}$/.test(formData.emailOrPhone)) {
      formErrors.emailOrPhone = "Invalid email or phone number";
    } else {
      formErrors.emailOrPhone = "";
    }

    // Validate password (minimum 8 characters)
    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters long";
    } else {
      formErrors.password = "";
    }

    // Validate checkbox (agreement)
    if (!formData.agreed) {
      formErrors.agreed = "You must agree to the terms and conditions";
    } else {
      formErrors.agreed = "";
    }

    setErrors(formErrors);

    // Check if there are any errors
    return !Object.values(formErrors).some((error) => error !== "");
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
          firstName: userInfo.given_name || "",
          lastName: userInfo.family_name || "",
          emailOrPhone: userInfo.email || "",
          password: "",
          isCompany: false,
          agreed: true,
        });

        setTimeout(() => {
          navigate("/AddCustomers", { state: { formData } });
        }, 500); // Small delay to ensure state is updated before navigation
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
    },
  });

  const handleSubmit = () => {
    if (validateForm()) {
      console.log(formData);
      navigate("/AddCustomers", { state: { formData } });
    }
  };

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
          <label className="block text-gray-700 mb-2">First name</label>
          <InputText
            placeholder="Enter your first name"
            className="w-full"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          {errors.firstName && <small className="text-red-500">{errors.firstName}</small>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2">Last name</label>
          <InputText
            placeholder="Enter your last name"
            className="w-full"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
          {errors.lastName && <small className="text-red-500">{errors.lastName}</small>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2">E-mail or phone number</label>
          <InputText
            placeholder="Type your e-mail or phone number"
            className="w-full"
            value={formData.emailOrPhone}
            onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
          />
          {errors.emailOrPhone && <small className="text-red-500">{errors.emailOrPhone}</small>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2">Password</label>
          <Password
            placeholder="Type your password"
            toggleMask
            feedback={false}
            className="w"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {errors.password && <small className="text-red-500">{errors.password}</small>}
        </div>
        <div className="form-group flex items-center mb-4">
          <label className="ml-2 text-gray-700">Sign up as company</label>
          <InputSwitch checked={formData.isCompany} onChange={(e) => setFormData({ ...formData, isCompany: e.value })} />
        </div>
        <div className="form-group flex items-start mb-6">
          <Checkbox
            checked={formData.agreed}
            onChange={(e) => setFormData({ ...formData, agreed: e.checked || false })}
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
          <Button icon="pi pi-apple" className="p-button-rounded p-button-secondary" />
          <Button icon="pi pi-facebook" className="p-button-rounded p-button-secondary" />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;