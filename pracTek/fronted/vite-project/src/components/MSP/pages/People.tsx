import React, { useState } from "react";
import PageLayout from "../componnents/PageLayoutProps";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Sidebar from "../componnents/Sidebar";
import SecondHeader from "../../SecondHeader";
import PageTitle from "../componnents/PageTitle";
import PaginationComponent from "../componnents/Paginator";

const People = () => {
    const handleEdit = (rowData: any) => {
        console.log("Editing", rowData);
    };

    const handleDelete = (rowData: any) => {
        console.log("Deleting", rowData);
    };

    const handleAddPeople = () => {
        console.log("Adding a people");
    };

    const [nodes] = useState([]);

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10); 
    const totalRecords = 100; 

    const handlePageChange = (event: { first: React.SetStateAction<number>; }) => {
        setFirst(event.first); 
    };


    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="main-content">
                <SecondHeader />
                <PageTitle title="People" />


                <PageLayout
                    showSearch={true}
                    searchPlaceholder=" Search..."
                    addButtonLabel="+ Add People"
                    onAddClick={handleAddPeople}
                >
                    <div className="table-container">
                        <div className="card">
                            <TreeTable value={nodes} tableStyle={{ width: "100%" }} sortMode="single">
                                <Column field="name" header="CUSTOMER NAME" sortable headerClassName="custom-header" bodyClassName="centered-text" />
                                <Column field="email" header="EMAIL" sortable headerClassName="custom-header" bodyClassName="centered-text" />
                                <Column field="contact" header="CONTACT NUMBER" sortable headerClassName="custom-header" bodyClassName="centered-text" />
                                <Column field="added" header="ADDED DATE" sortable headerClassName="custom-header" bodyClassName="centered-text" />
                                <Column field="status" header="STATUS" sortable headerClassName="custom-header" bodyClassName="centered-text" />
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

export default People;
