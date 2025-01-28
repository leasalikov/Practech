import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputSwitch } from "primereact/inputswitch";
import "../B/style/SingUp.css";
import DashboardImage from "../../assets/Screenshot 2025-01-27 153239.jpg";

const SignUp: React.FC = () => {
  const [isCompany, setIsCompany] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="signup-container">
      {/* Left Section */}
      <div className="left-section">
        <div className="logo-container flex items-center mb-8">
          <div className="logo-icon">⚡</div>
          <span className="logo-text">Dummy</span>
        </div>
        <div className="dashboard-image mb-8">
          <img
            src={DashboardImage}
            alt="Dashboard Illustration"
            className="w-full h-auto"
          />
        </div>
        <p className="text-gray-500">
          Let’s see what we have new, check it out! So maybe write here
          something more hehe.
        </p>
        <div className="navigation-buttons flex mt-6">
          <Button icon="pi pi-arrow-left" className="p-button-rounded mr-4" />
          <Button icon="pi pi-arrow-right" className="p-button-rounded" />
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <h1 className="text-3xl font-bold mb-4">Create your account 👋</h1>
        <p className="block text-gray-700 mb-2">It’s free and easy</p>

        <div className="form-group">
          <label className="block text-gray-700 mb-2">first name</label>
          <InputText placeholder="Enter your first name" className="w-full" />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2">last name</label>
          <InputText placeholder="Enter your last name" className="w-full" />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2">
            E-mail or phone number
          </label>
          <InputText
            placeholder="Type your e-mail or phone number"
            className="w-full"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2">Password</label>
          <Password
            placeholder="Type your password"
            toggleMask
            feedback={false}
            className="w"
          />
          <small className="text-gray-500">Must be 8 characters at least</small>
        </div>
        <div className="form-group flex items-center mb-4">
          <InputSwitch
            checked={isCompany}
            onChange={(e) => setIsCompany(e.value)}
          />
          <label className="ml-2 text-gray-700">Sign up as company</label>
        </div>
        <div className="form-group flex items-start mb-6">
          <Checkbox
            checked={agreed}
            onChange={(e) => setAgreed(e.checked || false)}
          />
          <label className="ml-2 text-sm text-gray-600">
            By creating an account, you agree to the{" "}
            <a href="#" className="text-blue-500 underline">
              Terms and Conditions
            </a>{" "}
            and our{" "}
            <a href="#" className="text-blue-500 underline">
              Privacy Policy
            </a>
            .
          </label>
        </div>
        <Button label="Register" className="w-full p-button-rounded p-button-primary mb-4" />
        <Divider align="center">or do it via other accounts</Divider>
        <div className="social-login flex justify-center gap-4 mt-4">
          <Button
            icon="pi pi-google"
            className="p-button-rounded p-button-secondary"
          />
          <Button
            icon="pi pi-apple"
            className="p-button-rounded p-button-secondary"
          />
          <Button
            icon="pi pi-facebook"
            className="p-button-rounded p-button-secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;