// Install dependencies for PrimeReact before running this code
// Run these commands:
// npm install primereact primeicons primeflex
// Import the necessary styles in your index.css or App.js
// import 'primereact/resources/themes/lara-light-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';

export default function App() {
  const [framework, setFramework] = useState("SRA");
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState(null);
  const [dates, setDates] = useState([new Date("2025-01-24"), new Date("2025-01-24")]);

  const projectTypes = [
    { label: "Web Development", value: "Web Development" },
    { label: "Mobile App", value: "Mobile App" },
    { label: "Machine Learning", value: "Machine Learning" }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full sm:w-96">
        <h1 className="text-xl font-semibold text-gray-900 mb-1 text-center">Create a new project</h1>
        <p className="text-gray-500 text-sm mb-5 text-center">Lorem Ipsum is simply dummy text of the</p>

        {/* Project Photo Section */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Project Photo*</label>
          <div className="flex gap-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-gray-200 cursor-pointer hover:scale-105 transition"
              >
                <img src={`https://via.placeholder.com/50x50?text=${index + 1}`} alt={`Photo ${index + 1}`} className="rounded-full w-full h-full" />
              </div>
            ))}
            <FileUpload mode="basic" auto className="p-button-text p-button-rounded border-gray-300" chooseLabel="+" />
          </div>
        </div>

        {/* Framework Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Framework*</label>
          <input
            type="text"
            value={framework}
            onChange={(e) => setFramework(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Project Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Project name*</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Project Type Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Select project type*</label>
          <input
            type="text"
            value={projectType || ""}
            onChange={(e) => setProjectType(e.target.value)}
            placeholder="Select"
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Project Duration Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Project Duration*</label>
          <input
            type="text"
            value={dates.map(date => date.toLocaleDateString()).join(" - ")}
            readOnly
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <Button label="Go Back" className="p-button-text text-gray-700 border border-gray-300 rounded-lg px-4 py-2" />
          <Button label="Next →" className="bg-blue-600 text-white rounded-lg px-5 py-2 hover:bg-blue-700 transition" />
        </div>
      </div>
    </div>
  );
}