import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useLogout } from "../components/MSP/componnents/LogOutContext"; // Context for modal state
import "./style/LogOut.css"; // Import updated styles
import logout from "../components/icons/logOut.png"

const Logout = () => {
    const { isLogoutModalVisible, closeLogoutModal } = useLogout();

    // Logout function
    const handleLogout = () => {
        console.log("Logging out...");
        closeLogoutModal();
        // Add your logout logic (redirect, clear session, etc.)
    };

    const footer = (
        <div>
            <Button label="Cancel" onClick={closeLogoutModal} className="p-button-text" />
            <Button label="Log Out" onClick={handleLogout} autoFocus className="logoutBtn" />
        </div>
    );

    return (
        <div>
            <Dialog
            header="Logout"
            visible={isLogoutModalVisible}
            style={{ width: "30vw" }}
            onHide={closeLogoutModal}
            footer={footer}
            closeIcon="pi pi-times"
        >
            <img src={logout} alt="Logout Illustration" className="logout-image" />

            <p>Do you want to quit?</p>
            <span>Need any help? <a href="#">Contact Us</a></span>
        </Dialog></div>

    );
};

export default Logout;
