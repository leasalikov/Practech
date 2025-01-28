import { useRef } from "react";
// import React, { useRef } from "react";

import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "../style/Dashboard.css";
import mspLogo from "../icons/mspLogo.png";

export default function DashboardWithUnifiedLayout() {
  const toast = useRef<Toast>(null);
  const userMenu = useRef<OverlayPanel>(null);

  const menuItems: MenuItem[] = [
    { label: "Dashboard", icon: "pi pi-home" },
    { label: "People", icon: "pi pi-users" },
    { label: "Assessments", icon: "pi pi-file" },
    { label: "Policies & Procedures", icon: "pi pi-book" },
    { label: "BAA Management", icon: "pi pi-briefcase" },
    { separator: true },
    { label: "Settings", icon: "pi pi-cog", style: { marginTop: "18rem" } },
    { label: "Logout", icon: "pi pi-sign-out" },
  ];

  const userMenuItems: MenuItem[] = [
    { label: "Profile", icon: "pi pi-user" },
    { label: "Settings", icon: "pi pi-cog", style: { marginTop: "25rem" } },
    { separator: true },
    { label: "Logout", icon: "pi pi-sign-out" },
  ];

  const toolbarRightContent = (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "black" }}>
      <Avatar
        image="https://via.placeholder.com/40"
        shape="circle"
        style={{ cursor: "pointer" }}
        onClick={(e) => userMenu.current?.toggle(e)}
      />
      <OverlayPanel ref={userMenu}>
        <Menu model={userMenuItems} />
      </OverlayPanel>
      <span>John Doe</span>
    </div>
  );

  const toolbarCenterContent = (
    <div style={{ display: "flex", alignItems: "center" , borderRadius:'12px'}}>
      <InputText placeholder="Search" />
    </div>
  );

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="menu-container">
        <Toast ref={toast} />
        <div className="logo-container">
          <img src={mspLogo} alt="Logo" className="logo" />
        </div>
        <Menu model={menuItems} />
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <Toolbar
          left={null}
          center={toolbarCenterContent}
          right={toolbarRightContent}
          style={{
            background: "transparent",
            boxShadow: "none",
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        />

         <div className="content-area">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: "black", fontSize: "2rem", marginBottom: "2rem", textAlign: "left" }}>
            Dashboard
          </h1>
        </div> 

        <div className="cards-container">
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
        </div>
      </div>
    </div>
    </div >
  );
}
