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

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailOrPhone: "",
    password: "",
    isCompany: false,
    agreed: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.emailOrPhone) newErrors.emailOrPhone = "Email or phone number is required";
    if (!formData.password || formData.password.length < 8) newErrors.password = "Password must be at least 8 characters long";
    if (!formData.agreed) newErrors.agreed = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // מונע רענון של הדף

    if (validateForm()) {
      console.log("User Data before:", formData);
      navigate("/AddCustomers", { state: { userData: formData } });
      console.log("User Data after:", formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      </div>

      {/* Right Section */}
      <div className="right-section">
        <h1 className="text-3xl font-bold mb-4">Create your account 👋</h1>
        <p className="block text-gray-700 mb-2">It’s free and easy</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="block text-gray-700 mb-2">First name</label>
            <InputText
              name="firstName"
              placeholder="Enter your first name"
              className="w-full"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <small className="text-red-500">{errors.firstName}</small>}
          </div>

          <div className="form-group">
            <label className="block text-gray-700 mb-2">Last name</label>
            <InputText
              name="lastName"
              placeholder="Enter your last name"
              className="w-full"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <small className="text-red-500">{errors.lastName}</small>}
          </div>

          <div className="form-group">
            <label className="block text-gray-700 mb-2">E-mail or phone number</label>
            <InputText
              name="emailOrPhone"
              placeholder="Type your e-mail or phone number"
              className="w-full"
              value={formData.emailOrPhone}
              onChange={handleChange}
            />
            {errors.emailOrPhone && <small className="text-red-500">{errors.emailOrPhone}</small>}
          </div>

          <div className="form-group">
            <label className="block text-gray-700 mb-2">Password</label>
            <Password
              name="password"
              placeholder="Type your password"
              toggleMask
              feedback={false}
              className="w"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <small className="text-red-500">{errors.password}</small>}
          </div>

          <div className="form-group flex items-center mb-4">
            <label className="ml-2 text-gray-700">Sign up as company</label>
            <InputSwitch
              name="isCompany"
              checked={formData.isCompany}
              onChange={(e) => setFormData((prev) => ({ ...prev, isCompany: e.value }))}
            />          </div>

          <div className="form-group flex items-start mb-6">
            <Checkbox
              name="agreed"
              checked={formData.agreed}
              onChange={(e) => setFormData((prev) => ({ ...prev, agreed: e.checked ?? false }))}
            />

            <label className="ml-2 text-sm text-gray-600">
              By creating an account, you agree to the{" "}
              <a href="https://developers.google.com/workspace/terms?hl=he" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                Terms and Conditions
              </a>{" "}
              and our{" "}
              <a href="https://policies.google.com/privacy?hl=iw" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>.
            </label>
            {errors.agreed && <small className="text-red-500">{errors.agreed}</small>}
          </div>

          <Button label="Register" type="submit" className="w-full p-button-rounded custom-button mb-4" />

          <Divider align="center">or do it via other accounts</Divider>

          <div className="social-login flex justify-center gap-4 mt-4">
            <Button icon="pi pi-google" className="p-button-rounded p-button-secondary" />
            <Button icon="pi pi-apple" className="p-button-rounded p-button-secondary" />
            <Button icon="pi pi-facebook" className="p-button-rounded p-button-secondary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;