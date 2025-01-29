import { useState } from 'react';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Calendar } from 'primereact/calendar';
import iconFrame from '../icons/frame.png';
import img1 from '../icons/1.png';
import img2 from '../icons/2.png';
import img3 from '../icons/3.png';
import img4 from '../icons/4.png';
import img5 from '../icons/5.png';
import img6 from '../icons/upload.png';
import '../style/CreateProject.css';

const CreateProject = () => {
  const frameworks = [
    { name: 'React', code: 'react' },
    { name: 'Angular', code: 'angular' },
    { name: 'Vue', code: 'vue' },
    { name: 'Svelte', code: 'svelte' },
  ];

  const projectTypes = [
    { name: 'Web Development', code: 'web' },
    { name: 'Mobile App', code: 'mobile' },
    { name: 'Desktop App', code: 'desktop' },
    { name: 'Game Development', code: 'game' },
  ];

  const [selectedFramework, setSelectedFramework] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projectDuration, setProjectDuration] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // מצב לבחירת התמונה
  const [imageUploaded, setImageUploaded] = useState(null); // מצב לשמירת התמונה שהועלתה מהמחשב

  const onFrameworkChange = (e) => {
    setSelectedFramework(e.value);
  };

  const onProjectTypeChange = (e) => {
    setProjectType(e.value);
  };
  
    const handleDateChange = (e) => {
      setProjectDuration(e.value);
    };

  const load = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // פעולה לבחירת התמונה
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // פעולה לבחירת תמונה מהמחשב
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUploaded(reader.result); // הצגת התמונה שהועלתה
        setSelectedImage(null); // נקה את הבחירה הקודמת
      };
      reader.readAsDataURL(file); // קריאת התמונה שנבחרה
    }
  };

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src={iconFrame}
            alt="Profile Image"
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '2px solid #ccc',
            }}
          />
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Create a new project</span>
            <br />
            <span style={{ fontSize: '0.7rem', color: '#888', display: 'block' }}>
              lorem ipsum is simply dummy text of the
            </span>
          </div>
        </div>
      }
      subTitle=""
      style={{
        width: '30rem',
        margin: '2em auto',
        padding: '1em',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Project Photo Section */}
      <div style={{ marginTop: '1.5rem' }}>
        <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem', textAlign: 'left' }}>Project photo*</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {[img1, img2, img3, img4, img5].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Project ${index + 1}`}
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: selectedImage === image ? '3px solid blue' : '2px solid #ccc', // מסגרת כחולה עבור התמונה הנבחרת
                cursor: 'pointer',
              }}
              onClick={() => handleImageClick(image)} // הגדרת פעולה כשנלחצים על התמונה
            />
          ))}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
            }}
          >
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .gif"
              style={{ display: 'none' }}
              id="uploadImage"
              onChange={handleImageUpload} // נוסיף את הפעולה כאן
            />
            <label htmlFor="uploadImage" style={{ cursor: 'pointer', color: '#888' }}>
              <img
                src={imageUploaded || img6} // מציג את התמונה שהועלתה אם קיימת, אחרת מציג את תמונת ברירת המחדל
                alt="Upload"
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: selectedImage === img6 || imageUploaded ? '3px solid blue' : '2px solid #ccc', // מסגרת כחולה כאשר נבחרת התמונה או התמונה הועלתה
                }}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Framework Selection */}
      <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem', textAlign: 'left' }}>Framework*</p>
      <Dropdown
        value={selectedFramework}
        options={frameworks}
        onChange={onFrameworkChange}
        optionLabel="name"
        placeholder="Select a framework"
        style={{ width: '100%', marginBottom: '1rem', textAlign: 'left' }}
      />
      
      {/* Project Name */}
      <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem', textAlign: 'left' }}>Project Name*</p>
      <div className="p-inputgroup" style={{ marginBottom: '1rem' }}>
        <span className="p-float-label" style={{ marginBottom: '1rem' }}>
          <InputText
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <label htmlFor="projectName">Enter project name</label>
        </span>
      </div>

      {/* Project Type */}
      <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem', textAlign: 'left' }}>Project Type*</p>
      <Dropdown
        value={projectType}
        options={projectTypes}
        onChange={onProjectTypeChange}
        optionLabel="name"
        placeholder="Select a project type"
        style={{ width: '100%', textAlign: 'left' }}
      />

      {/* Project Duration */}
      <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem', textAlign: 'left' }}>Project Duration*</p>
  {/* תיבת בחירת תאריך עם אייקון בפנים */}
  <div className="relative w-full flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
  {/* שדה בחירת תאריך */}
  <Calendar
    value={projectDuration}
    onChange={handleDateChange}
    selectionMode="range"
    dateFormat="mm/dd/yy"
    placeholder="MM/DD/YYYY - MM/DD/YYYY"
    showIcon={false} // ביטול הכפתור המיותר של PrimeReact
    className="w-full bg-transparent border-none outline-none focus:ring-0 pr-8"
  />

  {/* האייקון בפנים, צמוד לקצה הימני */}
  <i className="pi pi-calendar absolute right-4 text-gray-500 text-lg"></i>
</div>
        
     {/* Action Buttons: Back and Next */}
   <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', marginTop: '1.5rem' }}>
        <Button
          label="Back"
          className="p-button-secondary"
          style={{
            width: '50%',
            backgroundColor: 'white',
            color: '#555',
            borderColor: '#ccc',
            borderRadius: '4px',
            boxShadow: 'none',
            padding: '0.5rem 1rem',
          }}
          icon="pi pi-arrow-left"
        />
        <Button
          label={loading ? 'Loading...' : 'Next'}
          
          className="p-button-success"
          style={{
            width: '50%',
            height: '3rem',
            backgroundColor: 'blue',
            color: '#fff',
            borderColor: '#28a745',
            borderRadius: '6px',
            boxShadow: 'none',
            // padding: '0.5rem 1rem',
          }}
          icon="pi pi-arrow-right"
          iconPos="right"
          onClick={load}
          disabled={loading}
        />
      </div>
    </Card>
  );
};
export default CreateProject;
