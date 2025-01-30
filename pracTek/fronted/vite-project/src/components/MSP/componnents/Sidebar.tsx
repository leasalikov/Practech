// import { Link } from "react-router-dom";
// import { Menu } from "primereact/menu";
// import mspLogo from "../../icons/mspLogo.png";
// import { MenuItem } from "primereact/menuitem";
// import { Toast } from "primereact/toast";
// import React, { useRef } from "react";

// const Sidebar = () => {
//     const toast = useRef<Toast>(null);

//     const menuItems: MenuItem[] = [
//         { label: "Dashboard", icon: "pi pi-home", command: () => window.location.href = "/Dashboard" },
//         { label: "People", icon: "pi pi-users", command: () => window.location.href = "/People" },
//         { label: "Assesments", icon: "pi pi-file", command: () => window.location.href = "/Assesments" },
//         { label: "Policies & Procedures", icon: "pi pi-book", command: () => window.location.href = "/PoliciesProcedures" },
//         { label: "BAA Management", icon: "pi pi-briefcase", command: () => window.location.href = "/BAAManagment" },
//         { separator: true },
//         { label: "Settings", icon: "pi pi-cog", style: { marginTop: "18rem" }, command: () => window.location.href = "/Settings" },
//         { label: "Logout", icon: "pi pi-sign-out", command: () => window.location.href = "/LogOut"},
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


import React, { useRef } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useLogout } from "../componnents/LogOutContext"; // ייבוא ה-context
import { Toast } from "primereact/toast";
import mspLogo from "../../icons/mspLogo.png";

const Sidebar = () => {
    const { openLogoutModal } = useLogout(); // גישה ל-logout modal מה-context
    const toast = useRef<Toast>(null);
    const menuItems: MenuItem[] = [
        { label: "Dashboard", icon: "pi pi-home", command: () => window.location.href = "/Dashboard" },
        { label: "People", icon: "pi pi-users", command: () => window.location.href = "/People" },
        { label: "Assesments", icon: "pi pi-file", command: () => window.location.href = "/Assesments" },
        { label: "Policies & Procedures", icon: "pi pi-book", command: () => window.location.href = "/PoliciesProcedures" },
        { label: "BAA Management", icon: "pi pi-briefcase", command: () => window.location.href = "/BAAManagment" },
        { separator: true },
        { label: "Settings", icon: "pi pi-cog", style: { marginTop: "18rem" }, command: () => window.location.href = "/Settings" },
        { label: "Logout", icon: "pi pi-sign-out", command: openLogoutModal }, // כאן מתבצע קריאה ל-logout modal
    ];

    //   return (
    //     <div className="w-64 h-screen bg-white shadow-lg p-4 fixed">
    //       <div className="menu-container">
    //         <div className="logo-container">
    //           {/* הוספת הלוגו */}
    //         </div>
    //         <Menu model={menuItems} />
    //       </div>
    //     </div>
    //   );
    return (
        <div className="w-64 h-screen bg-white shadow-lg p-4 fixed">
            <div className="menu-container">
                <Toast ref={toast} />
                <div className="logo-container">
                    <img src={mspLogo} alt="Logo" className="logo" />
                </div>
                <Menu model={menuItems} />
            </div>
        </div>
    );

};

export default Sidebar;
