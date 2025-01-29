// import React, { useState } from "react";
// import Header from "../Header";
// import chat from "../icons/chat.png";
// import { TreeTable } from "primereact/treetable";
// import { Column } from "primereact/column";
// import { TreeNode } from "primereact/treenode";
// import "../style/Costumer.css";
// import { Button } from "primereact/button";
// import { Row } from "primereact/row";

// const Costumers: React.FC = () => {

//     const handleEdit = (rowData: any) => {
//         console.log("Editing", rowData);
//     };

//     const handleDelete = (rowData: any) => {
//         console.log("Deleting", rowData);
//     };

//     const [nodes] = useState<TreeNode[]>([
//         // {
//         //     key: "0 ",
//         //     data: {
//         //         name: "John Doe",
//         //         email: "john@example.com",
//         //         contact: "123-456-789",
//         //         added: "2024-01-01",
//         //         status: "Active",
//         //     },
//         // },
//         // {
//         //     key: "1",
//         //     data: {
//         //         name: "Jane Smith",
//         //         email: "jane@example.com",
//         //         contact: "987-654-321",
//         //         added: "2024-01-05",
//         //         status: "Inactive",
//         //     },
//         // },
//     ]);

//     return (
//         <div className="setup-success">
//             <Header />
//             <div className="card-header">
//                 <span className="card-title">
//                     <i className="pi pi-users"></i> Customers
//                 </span>
//                 <Button label="+ Add Customer" className="custom-button" />
//             </div>

//             <div className="table-container">
//                 <div className="card">
//                     <TreeTable value={nodes} tableStyle={{ width: "100%" }}>
//                         <Column field="name" header="CUSTOMER NAME" expander headerClassName="custom-header" bodyClassName="centered-text"></Column>
//                         <Column field="email" header="EMAIL" headerClassName="custom-header" bodyClassName="centered-text"></Column>
//                         <Column field="contact" header="CONTACT NUMBER" headerClassName="custom-header" bodyClassName="centered-text"></Column>
//                         <Column field="added" header="ADDED DATE" headerClassName="custom-header" bodyClassName="centered-text"></Column>
//                         <Column field="status" header="STATUS" headerClassName="custom-header" bodyClassName="centered-text"></Column>

//                         <Column header="ACTIONS" headerClassName="custom-header" bodyClassName="centered-text" body={(rowData) => (

//                             <div>
//                                 <Button
//                                     icon="pi pi-pencil"
//                                     className="p-button-rounded p-button-text custom-edit-button"
//                                     onClick={() => handleEdit(rowData)}
//                                 />
//                                 <Button
//                                     icon="pi pi-trash"
//                                     className="p-button-rounded p-button-text custom-delete-button"
//                                     onClick={() => handleDelete(rowData)}
//                                     style={{ marginLeft: '10px' }}
//                                 />
//                             </div>

//                         )}></Column>

//                     </TreeTable>

//                     <div className="table-footer">
//                         <Button
//                             label="Go Back"
//                             icon="pi pi-arrow-left"
//                             className="go-back-button"
//                         />
//                         <Button
//                             label="Next"
//                             icon="pi pi-arrow-right"
//                             iconPos="right"
//                             className="next-button"
//                             style={{ marginLeft: "10px" }}
//                         />
//                     </div>
//                 </div>
//             </div>



//             <div className="chat-icon">
//                 <img src={chat} alt="Chat Icon" />
//             </div>
//         </div>
//     );
// };

// export default Costumers;


// components/Costumers.tsx

import React, { useState } from "react";
<!-- <<<<<<< customer -->
import PageLayout from "./componnents/PageLayoutProps";
<!-- =======
import Header from "../A/Header"; -->
import chat from "../icons/chat.png";
<!-- >>>>>>> main -->
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Header from "../Header";

const Costumers: React.FC = () => {
    const [nodes] = useState([
        // {
        //     key: "0",
        //     data: {
        //         name: "John Doe",
        //         email: "john@example.com",
        //         contact: "123-456-789",
        //         added: "2024-01-01",
        //         status: "Active",
        //     },
        // },
        // {
        //     key: "1",
        //     data: {
        //         name: "Jane Smith",
        //         email: "jane@example.com",
        //         contact: "987-654-321",
        //         added: "2024-01-05",
        //         status: "Inactive",
        //     },
        // },
    ]);

    const handleAddCustomer = () => {
        console.log("Adding a customer");
    };

    const handleGoBack = () => {
        console.log("Going back");
    };

    const handleNext = () => {
        console.log("Going next");
    };

    const handleEdit = (rowData: any) => {
        console.log("Editing", rowData);
    };

    const handleDelete = (rowData: any) => {
        console.log("Deleting", rowData);
    };

    return (
        <div>
            <Header></Header>
            <PageLayout
                title="Customers"
                addButtonLabel="+ Add Customer"
                goBackButtonLabel="Go Back"
                nextButtonLabel="Next"
                onAddClick={handleAddCustomer}
                onGoBackClick={handleGoBack}
                onNextClick={handleNext}
            >
                <div className="table-container">
                    <div className="card">
                        <TreeTable value={nodes} tableStyle={{ width: "100%" }}>
                            <Column field="name" header="CUSTOMER NAME" expander headerClassName="custom-header" bodyClassName="centered-text"></Column>
                            <Column field="email" header="EMAIL" headerClassName="custom-header" bodyClassName="centered-text"></Column>
                            <Column field="contact" header="CONTACT NUMBER" headerClassName="custom-header" bodyClassName="centered-text"></Column>
                            <Column field="added" header="ADDED DATE" headerClassName="custom-header" bodyClassName="centered-text"></Column>
                            <Column field="status" header="STATUS" headerClassName="custom-header" bodyClassName="centered-text"></Column>
                            <Column header="ACTIONS" headerClassName="custom-header" bodyClassName="centered-text" body={(rowData) => (
                                <div>
                                    <Button
                                        icon="pi pi-pencil"
                                        className="p-button-rounded p-button-text custom-edit-button"
                                        onClick={() => handleEdit(rowData)}
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        className="p-button-rounded p-button-text custom-delete-button"
                                        onClick={() => handleDelete(rowData)}
                                        style={{ marginLeft: '10px' }}
                                    />
                                </div>

                            )}></Column>
                        </TreeTable>
                        <div className="table-footer">
                            <Button
                                label="Go Back"
                                icon="pi pi-arrow-left"
                                className="go-back-button"
                            />
                            <Button
                                label="Next"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                className="next-button"
                                style={{ marginLeft: "10px" }}
                            />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </div>
    );

};

export default Costumers;
