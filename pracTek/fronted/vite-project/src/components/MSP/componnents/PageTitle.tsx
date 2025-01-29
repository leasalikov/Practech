import React from "react";

interface PageTitleProps {
    title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
    return (
        <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ color: "black", fontSize: "2rem", marginLeft: '3rem',marginTop: '1.5rem',textAlign: "left" }}>
                {title}
            </h1>
        </div>
    );
};

export default PageTitle;
