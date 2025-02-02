// import React, { useRef } from "react";
// import { Menu } from "primereact/menu";
// import { MenuItem } from "primereact/menuitem";
// import { useLogout } from "../componnents/LogOutContext"; // ייבוא ה-context
// import { Toast } from "primereact/toast";
// import mspLogo from "../../icons/mspLogo.png";

// const Sidebar = () => {
//     const { openLogoutModal } = useLogout(); // גישה ל-logout modal מה-context
//     const toast = useRef<Toast>(null);
//     const menuItems: MenuItem[] = [
//         { label: "Dashboard", icon: "pi pi-home", command: () => window.location.href = "/Dashboard" },
//         { label: "People", icon: "pi pi-users", command: () => window.location.href = "/People" },
//         { label: "Assesments", icon: "pi pi-file", command: () => window.location.href = "/Assesments" },
//         { label: "Policies & Procedures", icon: "pi pi-book", command: () => window.location.href = "/PoliciesProcedures" },
//         { label: "BAA Management", icon: "pi pi-briefcase", command: () => window.location.href = "/BAAManagment" },
//         { separator: true },
//         { label: "Settings", icon: "pi pi-cog", style: { marginTop: "18rem" }, command: () => window.location.href = "/Settings" },
//         { label: "Logout", icon: "pi pi-sign-out", command: openLogoutModal }, // כאן מתבצע קריאה ל-logout modal
//     ];
//     return (
//         <div className="w-64 h-screen bg-white shadow-lg p-4 fixed">
//             <div className="menu-container">
//                 <Toast ref={toast} />
//                 <div className="logo-container">
//                     <img src={mspLogo} alt="Logo" className="logo" />
//                 </div>
//                 <Menu model={menuItems} />
//             </div>
//         </div>
//     );
// };

// export default Sidebar;




import React, { useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useLogout } from "../componnents/LogOutContext";
import { Toast } from "primereact/toast";
import mspLogo from "../../icons/mspLogo.png";
import "../../style/SideBar.css";  // כאן מחברים את העיצוב

const Sidebar: React.FC = () => {
    const { openLogoutModal } = useLogout();
    const toast = useRef<Toast>(null);
    const [activePath, setActivePath] = useState<string>(window.location.pathname);

    const handleMenuItemClick = (path: string): void => {
        setActivePath(path);
        window.location.href = path;
    };

    const menuItems: MenuItem[] = [
        { 
            label: "Dashboard", 
            icon: "pi pi-home", 
            command: () => handleMenuItemClick("/Dashboard"),
            className: activePath === "/Dashboard" ? "active-menu-item" : "", 
            style: {marginBottom: '0.5rem'}
        },
        { 
            label: "People", 
            icon: "pi pi-users", 
            command: () => handleMenuItemClick("/People"),
            className: activePath === "/People" ? "active-menu-item" : "" ,
            style: {marginBottom: '0.5rem'}

        },
        { 
            label: "Assesments", 
            icon: "pi pi-file", 
            command: () => handleMenuItemClick("/Assesments"),
            className: activePath === "/Assesments" ? "active-menu-item" : "" ,
            style: {marginBottom: '0.5rem'}

        },
        { 
            label: "Policies & Procedures", 
            icon: "pi pi-book", 
            command: () => handleMenuItemClick("/PoliciesProcedures"),
            className: activePath === "/PoliciesProcedures" ? "active-menu-item" : "" ,
            style: {marginBottom: '0.5rem'}

        },
        { 
            label: "BAA Management", 
            icon: "pi pi-briefcase", 
            command: () => handleMenuItemClick("/BAAManagment"),
            className: activePath === "/BAAManagment" ? "active-menu-item" : "" ,
            style: {marginBottom: '0.5rem'}

        },
        { separator: true },
        { 
            label: "Settings", 
            icon: "pi pi-cog", 
            command: () => handleMenuItemClick("/Settings"),
            className: activePath === "/Settings" ? "active-menu-item" : "", 
            style: { marginTop: "18rem" }  
        },
        
        { 
            label: "Logout", 
            icon: "pi pi-sign-out", 
            command: openLogoutModal ,
            style: {marginBottom: '0.5rem'}

        }
    ];

       return (
                <div style={{height: '100vh'}}>
                    <div className="menu-container">
                        <Toast ref={toast} />
                        <div>
                            <img src={mspLogo} alt="Logo" className="msplogo" />
                        </div>
                        <Menu model={menuItems} />
                    </div>
                </div>
            );
};

export default Sidebar;
