import React, { useRef } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { OverlayPanel } from "primereact/overlaypanel";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import SearchBox from "./MSP/componnents/SearchBox";

const SecondHeader = () => {
    const userMenu = useRef<OverlayPanel>(null);

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
        <SearchBox placeholder="Search..." />
    );

    return (
        <Toolbar
            left={null}
            center={toolbarCenterContent}
            right={toolbarRightContent}
            style={{
                background: "white",
                boxShadow: "none",
                padding: "1rem 2rem",
                display: "flex",
                justifyContent: "space-between",
            }}
        />
    );
};

export default SecondHeader;
