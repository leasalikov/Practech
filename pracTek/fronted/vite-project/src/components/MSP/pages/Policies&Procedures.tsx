import React, { useState } from "react";
import PageLayout from "../componnents/PageLayoutProps";
import Sidebar from "../componnents/Sidebar";
import SecondHeader from "../../SecondHeader";
import PageTitle from "../componnents/PageTitle";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import PaginationComponent from "../componnents/Paginator";
import { Dropdown } from "primereact/dropdown";

const PoliciesProcedures = () => {
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
      label: "Documents",
      onClick: handleSecurityClick,
    },
    {
      label: "Certificates",
      onClick: handleDataProtectionClick,
    },
    {
      label: "Courses",
      onClick: handleUploadsClick,
    },
    {
      label: "Tests",
      onClick: handleUploadsClick,
    }, {
      label: "Surveys",
      onClick: handleUploadsClick,
    },
  ]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <SecondHeader />
        <PageTitle title="Policies & Procedures" />

        <PageLayout
          title="Policies & Procedures"
          useOptions={true}
          options={[
            { label: "Documents", value: "Documents" },
            { label: "Certificates", value: "Certificates" },
            { label: "Courses", value: "Courses" },
            { label: "Tests", value: "Tests" },
            { label: "Surveys", value: "Surveys" }
          ]}
          addButtonLabel={
            <Dropdown
              value={selectedItem}
              options={[
                { label: "Current", value: "Current" },
                { label: "Date", value: "Date" },
                { label: "Type", value: "Type" },
                { label: "Size", value: "Size" },
                { label: "Last Modified", value: "Last Modified" },
                { label: "Actions", value: "Actions" },
              ]}
              onChange={(e) => setSelectedItem(e.value)}
              placeholder="Sort By"
              className="custom-dropdown"
              valueTemplate={(option) => (
                <span>
                  <strong>Sort By:</strong> {option || "Select an option"}
                </span>
              )}
            />
          }
          onAddClick={() => console.log("Adding policy")}
        >

          <div className="table-container">
            <div className="card">
              <TreeTable value={nodes} tableStyle={{ width: "100%" }} sortMode="single">
                <Column field="name" header="POLICY" sortable headerClassName="custom-header" bodyClassName="centered-text" />
                <Column field="email" header="ADDED BY" sortable headerClassName="custom-header" bodyClassName="centered-text" />
                <Column field="contact" header="STATUS" sortable headerClassName="custom-header" bodyClassName="centered-text" />
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

export default PoliciesProcedures;
