import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
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
import AddCustomer from "./AddCustomer";

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

  // פונקציה להעלאת תמונה
  const onUpload = (e: React.MouseEvent) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = (event) => {
      const file = event.target?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result as string);
          setFormData(prev => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
      }
    };

    fileInput.click();
  };

  const handleImageSelect = (image: string) => {
    setFormData((prev) => ({ ...prev, image }));
    setImageUrl(null);  // אם בחרת תמונה מהגלריה, לא להציג את התמונה שהועלתה
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {
      image: formData.image ? '' : 'Required field',
      framework: formData.framework ? '' : 'Required field',
      projectName: formData.projectName ? '' : 'Required field',
      projectType: formData.projectType ? '' : 'Required field',
      projectDuration: formData.projectDuration ? '' : 'Required field'
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleNavigationBack = () => {
    navigate("/AddCustomer", { state: { credentials: [] }, replace: true });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData)
      navigate("../Success", { state: { credentials: [] }, replace: true });
    }
  };

  const handleChange = (key: string, value: string | undefined) => {
    setFormData((prev) => ({ ...prev, [key]: value || '' }));
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <Card
          title={<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={iconFrame} alt="Profile Image"
              style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #ccc' }}
            />
            <span>Create a new project</span>
          </div>}
          subTitle="lorem ipsum is simply dummy text of the"
          style={{ width: '30rem', margin: '2em auto', padding: '1em', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '5%' }}
        >
          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label >Project image</label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[img1, img2, img3, img4, img5].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Project ${index + 1}`}
                  style={{
                    width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%', cursor: 'pointer',
                    border: formData.image === image ? '3px solid blue' : '2px solid #ccc'
                  }}
                  onClick={() => handleImageSelect(image)}
                />
              ))}
              <img
                src={formData.image || imageUrl || img6}  // תצוגת ברירת המחדל (אם לא הועלתה תמונה)
                alt="Uploaded"
                onClick={onUpload}
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  marginBottom: '1rem',
                  border: formData.image === imageUrl ? '3px solid blue' : '2px solid #ccc',
                }}
              />
            </div>
            {errors.image && <small>{errors.image}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="framework">Project framework</label>
            <Dropdown
              className="form-group"
              value={formData.framework}
              options={frameworks}
              onChange={(e) => handleChange('framework', e.value)}
              optionLabel="name"
              placeholder="Select a framework"
              style={{ width: '100%', marginBottom: '0rem', textAlign: 'left' }}
            />
            {errors.framework && <small>{errors.framework}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="projectName">Project name</label>
            <InputText
              placeholder="Enter the project name"
              id="projectName"
              value={formData.projectName}
              onChange={(e) => handleChange('projectName', e.target.value)}
              style={{ width: '100%' }}
            />
            {errors.projectName && <small>{errors.projectName}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="projectType">Project type</label>
            <Dropdown
              value={formData.projectType}
              options={projectTypes}
              onChange={(e) => handleChange('projectType', e.value)}
              optionLabel="name"
              placeholder="Select a project type"
              style={{ width: '100%', textAlign: 'left' }}
            />
            {errors.projectType && <small>{errors.projectType}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="projectDuration">Project duration</label>
            <Calendar
              value={formData.projectDuration}
              onChange={(e) => handleChange('projectDuration', e.target.value)}
              selectionMode="range"
              dateFormat="mm/dd/yy"
              placeholder="MM/DD/YYYY - MM/DD/YYYY"
              showIcon={false}
              style={{ width: '100%' }}
            />
            {errors.projectDuration && <small>{errors.projectDuration}</small>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            <Button
              onClick={handleNavigationBack}
              label="Back" icon="pi pi-arrow-left" style={{ width: '50%' }} className="custom-blue-button" />
            <Button
              type="submit"
              label="Next" icon="pi pi-arrow-right" iconPos="right" style={{ width: '50%' }} className="custom-blue-button" />
          </div>
        </Card>
      </form>
    </>
  );
};

export default CreateProject;
