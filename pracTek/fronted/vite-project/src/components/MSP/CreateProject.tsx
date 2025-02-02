import { useNavigate } from "react-router-dom";
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
import Header from "../Header";
import Success from "../Success";
interface FormData {
  image: string;
  framework: string;
  projectName: string;
  projectType: string;
  projectDuration: string;
}

interface Errors {
  image: string;
  framework: string;
  projectName: string;
  projectType: string;
  projectDuration: string;
}

const CreateProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    image: '',
    framework: '',
    projectName: '',
    projectType: '',
    projectDuration: ''
  });
  const [errors, setErrors] = useState<Errors>({
    image: '',
    framework: '',
    projectName: '',
    projectType: '',
    projectDuration: ''
  });

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

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onUpload = (e: any) => {
    const file = e.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);  // שים לב פה
    };
    if (file) {
      reader.readAsDataURL(file);  // טעינת התמונה כ-Data URL
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {
      image: formData.image ? '' : 'Required field',
      framework: formData.framework ? '' : 'Required field',
      projectName: formData.projectName ? '' : 'Required field',
      projectType: formData.projectType ? '' : 'Required field',
      projectDuration: formData.projectDuration ? '' : 'Required field'
    };
    console.log(newErrors)
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data is valid:', formData);
      navigate("../Success", { state: { credentials: [] }, replace: true });
    } else {
      console.log('Form data is invalid');
    }
  };

  const handleChange = (key: string, value: string | undefined) => {
    setFormData((prev) => ({ ...prev, [key]: value || '' }));
  };

  return (
    <><Header />
      <form onSubmit={handleSubmit}>
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '10%' }}>
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
                    borderRadius: '50%', // Make the image circular
                    cursor: 'pointer',
                    border: formData.image === image ? '3px solid blue' : '2px solid #ccc',
                  }}
                  onClick={() => handleChange('image', image)} // Set the selected image
                />
              ))}
              {imageUrl && (
                <div>
                  <img src={imageUrl} alt="Uploaded Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                </div>
              )}
              <FileUpload
                name="file"
                accept="image/*"
                customUpload
                uploadHandler={onUpload}
                chooseLabel="בחר תמונה"
                style={{
                  // width: '50px',
                  // height: '50px',
                  // borderRadius: '50%',
                  // backgroundImage: `url(${img6})`,
                  // backgroundSize: 'cover',
                  // cursor: 'pointer',
                  // border: '2px solid #ccc',
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                  borderRadius: '50%', // Make the image circular
                  cursor: 'pointer',
                  border: formData.image === imageUrl ? '3px solid blue' : '2px solid #ccc',
                }}
              />
            </div>
          </div>
          <Dropdown
            value={formData.framework}
            options={frameworks}
            onChange={(e) => handleChange('framework', e.value)}
            optionLabel="name"
            placeholder="Select a framework"
            style={{ width: '100%', marginBottom: '1rem', textAlign: 'left' }}
          />

          {/* Project Name */}
          <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem', textAlign: 'left' }}>Project Name*</p>
          <InputText
            id="projectName"
            value={formData.projectName}
            onChange={(e) => handleChange('projectName', e.target.value)}
            style={{ width: '100%' }}
          />

          {/* Project Type */}
          <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem', textAlign: 'left' }}>Project Type*</p>
          <Dropdown
            value={formData.projectType}
            options={projectTypes}
            onChange={(e) => handleChange('projectType', e.value)}
            optionLabel="name"
            placeholder="Select a project type"
            style={{ width: '100%', textAlign: 'left' }}
          />

          {/* Project Duration */}
          <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem', textAlign: 'left' }}>Project Duration*</p>
          <Calendar
            value={formData.projectDuration}
            onChange={(e) => handleChange('projectDuration', e.target.value)}
            selectionMode="range"
            dateFormat="mm/dd/yy"
            placeholder="MM/DD/YYYY - MM/DD/YYYY"
            showIcon={false}
            style={{ width: '100%' }}
          />

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <Button label="Back" icon="pi pi-arrow-left" className="p-button-secondary" style={{ width: '50%' }} />
            <Button label="Next" icon="pi pi-arrow-right" className="p-button-success" style={{ width: '50%' }} />
          </div>
        </Card>
      </form>
    </>);
};

export default CreateProject;
