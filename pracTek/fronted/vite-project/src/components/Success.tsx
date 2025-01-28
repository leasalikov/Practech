import React from "react";
import { Card } from "primereact/card";
import "./style/Success.css";
import Header from "./MSP/Header";
import chat from "./icons/chat.png";
import { Button } from "primereact/button";
import success from "./icons/succsess.png";
import { useNavigate } from "react-router-dom";
const Success: React.FC = () => {

  const navigate = useNavigate(); // יצירת אובייקט navigate

  const navigateToDashboard = () => {
    navigate("/dashboard"); // ניווט לעמוד Dashboard
  };


  return (
    <div className="setup-success">
      <Header />
      <br />
      <br />

      <Card className="card">
        <div className="icon-container">
          <img src={success} alt="Success" className="success-icon" />
        </div>
        <h2 className="title">Setup is Successful!</h2>
        <p className="description">
          Lorem Ipsum is simply dummy text of the printing and typesetting.
        </p>
        <Button className="button" onClick={navigateToDashboard}>Go to dashboard</Button>
      </Card>

      {/* Floating Chat Icon */}
      <div className="chat-icon">
        <img src={chat} alt="Chat Icon" />
      </div>
    </div>
  );
};

export default Success;
