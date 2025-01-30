import React, { useState } from "react";
import PageLayout from "../componnents/PageLayoutProps";
import Sidebar from "../componnents/Sidebar";
import SecondHeader from "../../SecondHeader";
import PageTitle from "../componnents/PageTitle";
import AssessmentOptions from "../componnents/Options"; // הייבוא של AssessmentOptions
import { Button } from "primereact/button";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import PaginationComponent from "../componnents/Paginator";

const Assesments = () => {
    const handleEdit = (rowData: any) => {
        console.log("Editing", rowData);
    };

    const handleDelete = (rowData: any) => {
        console.log("Deleting", rowData);
    };

    const handleAddAssesments = () => {
        console.log("Adding a assesments");
    };

    const handleGoBack = () => {
        console.log("Going back");
    };

    const handleNext = () => {
        console.log("Going next");
    };

    const [nodes] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const totalRecords = 100;

    const handlePageChange = (event: { first: React.SetStateAction<number>; }) => {
        setFirst(event.first);
    };

    const handleSelectOption = (option: string) => {
        console.log(`${option} selected`);
    };

    const handleSecurityClick = () => {
        console.log("Security selected");
    };

    const handleDataProtectionClick = () => {
        console.log("Data Protection selected");
    };

    const handleUploadsClick = () => {
        console.log("Uploads selected");
    };

    const [options] = useState([
        {
            label: "Security",
            onClick: handleSecurityClick,
        },
        {
            label: "Data Protection",
            onClick: handleDataProtectionClick,
        },
        {
            label: "Uploads",
            onClick: handleUploadsClick,
        },
    ]);

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="main-content">
                <SecondHeader />
                <PageTitle title="Assesments" />

                <PageLayout
                    showSearch={false} // אם לא צריך חיפוש, הצג כפתורים
                    addButtonLabel="+ New Assessment"
                    onAddClick={handleAddAssesments}

                >



                    <div className="table-container">
                        <div className="card">
                            <TreeTable value={nodes} tableStyle={{ width: "100%" }} sortMode="single">
                                <Column field="name" header="ASSESSMENT" sortable headerClassName="custom-header" bodyClassName="centered-text" />
                                <Column field="email" header="CREATED BY" sortable headerClassName="custom-header" bodyClassName="centered-text" />
                                <Column field="contact" header="PROGRESS" sortable headerClassName="custom-header" bodyClassName="centered-text" />
                                <Column field="added" header="DUE ON" sortable headerClassName="custom-header" bodyClassName="centered-text" />
                            </TreeTable>

                            <div className="table-footer">  <PaginationComponent
                                first={first}
                                rows={rows}
                                totalRecords={totalRecords}
                                onPageChange={handlePageChange}
                            /></div>
                        </div>
                    </div>

                </PageLayout>
            </div>
        </div>
    );
};

export default Assesments;
