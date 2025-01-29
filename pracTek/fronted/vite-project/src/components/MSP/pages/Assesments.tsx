// import { TreeTable } from "primereact/treetable";
// import SecondHeader from "../../SecondHeader";
// import PageLayout from "../componnents/PageLayoutProps";
// import PageTitle from "../componnents/PageTitle";
// import Sidebar from "../componnents/Sidebar"
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { useState } from "react";

// const Assesments = () => {

//     const handleAddAssesments = () => {
//         console.log("Adding a assesment");
//     };
//     const [nodes] = useState([]);

//     return (
//         <div className="flex">
//             <Sidebar />
//             <div className="main-content">
//                 <SecondHeader />
//                 <PageTitle title="Assesments" />


//                 <PageLayout
//                     showSearch={true}
//                     searchPlaceholder=" Search..."
//                     addButtonLabel="+ Add People"
//                     onAddClick={handleAddAssesments}
//                 >
//                     <div className="table-container">
//                         <div className="card">
//                             <TreeTable value={nodes} tableStyle={{ width: "100%" }} sortMode="single">
//                                 <Column field="name" header="CUSTOMER NAME" sortable headerClassName="custom-header" bodyClassName="centered-text" />
//                                 <Column field="email" header="EMAIL" sortable headerClassName="custom-header" bodyClassName="centered-text" />
//                                 <Column field="contact" header="CONTACT NUMBER" sortable headerClassName="custom-header" bodyClassName="centered-text" />
//                                 <Column field="added" header="ADDED DATE" sortable headerClassName="custom-header" bodyClassName="centered-text" />
//                                 <Column field="status" header="STATUS" sortable headerClassName="custom-header" bodyClassName="centered-text" />
//                             </TreeTable>

//                             <div className="table-footer">
//                                 <Button label="Go Back" icon="pi pi-arrow-left" className="go-back-button" />
//                                 <Button label="Next" icon="pi pi-arrow-right" iconPos="right" className="next-button" style={{ marginLeft: "10px" }} />
//                             </div>
//                         </div>
//                     </div>
//                 </PageLayout>
//             </div>

//         </div>
//     );
// };

// export default Assesments;



import React, { useState } from "react";
import PageLayout from "../componnents/PageLayoutProps";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Sidebar from "../componnents/Sidebar";
import SecondHeader from "../../SecondHeader";
import PageTitle from "../componnents/PageTitle";

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

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="main-content">
                <SecondHeader />
                <PageTitle title="Assesments" />


                <PageLayout
                    showSearch={true}
                    searchPlaceholder=" Search..."
                    addButtonLabel="+ Add Assesments"
                    onAddClick={handleAddAssesments}
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

                            <div className="table-footer">
                                <Button label="Go Back" icon="pi pi-arrow-left" className="go-back-button" />
                                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" className="next-button" style={{ marginLeft: "10px" }} />
                            </div>
                        </div>
                    </div>
                </PageLayout>
            </div>
        </div>
    );
};

export default Assesments;
