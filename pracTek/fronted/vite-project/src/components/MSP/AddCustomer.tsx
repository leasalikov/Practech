import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Avatar } from 'primereact/avatar';
import '../style/AddCustomers.css';
import { FileUploadHandlerEvent } from 'primereact/fileupload';
import Header from '../Header';
// import SignUp from '../SingUp';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber, parsePhoneNumber, CountryCode } from 'libphonenumber-js';
import { UserContext } from '../ContextProvider';

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    phoneNumber: string;
    file: File | null;
}
interface Errors {
    first_name: string;
    last_name: string;
    email: string;
    phoneNumber: string;
    file: string;
}

const AddCustomersForm: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(UserContext); 
    if (!context) {
      throw new Error('UserProfile must be used within a UserContextProvider');
    }
  
    const { setUser } = context;
  
    if (!context) {
      return <p>Loading user data...</p>; // במקרה של טעינה או שאין משתמש
    }

    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        email: '',
        phoneNumber: '',
        file: null,
    });
    const [errors, setErrors] = useState<Errors>({
        first_name: '',
        last_name: '',
        email: '',
        phoneNumber: '',
        file: '',
    });
    const validatePhoneNumber = (phoneNumber: string, country: CountryCode) => {
        return isValidPhoneNumber(phoneNumber, country) ? '' : 'Invalid phone number';
    };
    const validateForm = (country: CountryCode): boolean => {
        const newErrors: Errors = {
            first_name: formData.first_name ? '' : 'Required field',
            last_name: formData.last_name ? '' : 'Required field',
            email: formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) ? '' : 'Valid email is required',
            phoneNumber: formData.phoneNumber ? validatePhoneNumber(formData.phoneNumber, country) : 'Phone number is required',
            file: formData.file ? '' : 'File is required',
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleChange = (key: string, value: string | undefined) => {
        setFormData((prev) => ({ ...prev, [key]: value || '' }));
        if (key === 'phoneNumber' && value) {
            const isValid = isValidPhoneNumber(value);
            setErrors((prev) => ({
                ...prev,
                phoneNumber: isValid ? '' : 'Invalid phone number',
            }));
        }
    };

    const onUpload = (e: FileUploadHandlerEvent) => {
        handleChange('file', e.files[0]);
    };

    const handleNavigationBack = () => {
        navigate("../", { state: { credentials: [] }, replace: true });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const phoneNumber = parsePhoneNumber(formData.phoneNumber);
            const country = phoneNumber?.country || 'US';
            if (validateForm(country)) {
                console.log('context', context);
                try {
                    const response = fetch(`http://localhost:5000/api/msps/${context.user?._id}`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(formData),
                    });
                    console.log("response", response)
                    // if (response.ok) {
                    //   const data = await response.json();
                    //   console.log("User created:", data);
                    //   setUser(data);
                    //   navigate("/AddCustomer", { state: { formData } });
                    // } 
                    // else {
                    //   const errorData = await response.json();
                    //   console.error('Error creating user:', response.statusText, errorData);
                    // }
                  } catch (error) {
                    console.error('Error:', error);
                  }
                navigate("./CreateProject", { state: { credentials: [] }, replace: true });
            } else {
                console.log('Form data is invalid');
            }
        } catch (error) {
            console.error('Invalid phone number format', error);
            setErrors((prev) => ({
                ...prev,
                phoneNumber: 'Invalid phone number',
            }));
        }
    };
    return (
        <>
            <Header />
            <form onSubmit={handleSubmit}>
                <Card
                    title="Add New Customer"
                    subTitle="Add agencies/individual clients to your list"
                    style={{ width: '30rem', margin: '2em auto', padding: '1em', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '10%' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                        <Avatar
                            icon="pi pi-image"
                            shape="circle"
                            style={{ width: '60px', height: '60px', backgroundColor: '#f0f4fa', color: '#888' }}
                        />
                        <FileUpload
                            name="demo[]"
                            mode="basic"
                            accept=".svg,.png,.gif"
                            maxFileSize={800000}
                            customUpload
                            uploadHandler={onUpload}
                            auto={true}
                            chooseLabel="Click to upload"
                            emptyTemplate={
                                <div style={{ textAlign: 'center', padding: '0.5rem', border: '1px dashed #ccc', borderRadius: '8px' }}>
                                    <span style={{ fontSize: '14px', color: '#4a90e2', cursor: 'pointer' }}>
                                        Click to upload or drag and drop
                                    </span>
                                    <br />
                                    <span style={{ fontSize: '12px', color: '#888' }}>SVG, PNG, or GIF (max. 800×400px)</span>
                                </div>
                            }
                        />
                        {errors.file && <small>{errors.file}</small>}
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="first_name">First Name</label>
                        <InputText
                            placeholder="Enter your email"
                            id="first_name"
                            value={formData.first_name}
                            onChange={(e) => handleChange('first_name', e.target.value)} />
                        {errors.first_name && <small>{errors.first_name}</small>}
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="last_name">Last Name</label>
                        <InputText
                            placeholder="Enter your last name"
                            id="last_name"
                            value={formData.last_name}
                            onChange={(e) => handleChange('last_name', e.target.value)} />
                        {errors.last_name && <small>{errors.last_name}</small>}
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="email">Email</label>
                        <InputText
                            placeholder="Enter your email"
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                        {errors.email && <small>{errors.email}</small>}
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label >Phone number</label>
                        <PhoneInput
                            className="custom-phone-input"
                            defaultCountry="US"
                            value={formData.phoneNumber}
                            onChange={(value) => handleChange('phoneNumber', value)}
                            placeholder="Enter your phone Number"
                            style={{ width: '100%' }}
                        />
                        {errors.phoneNumber && <small>{errors.phoneNumber}</small>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                        <Button
                            label="Go back"
                            icon="pi pi-arrow-left"
                            className="custom-blue-button"
                            onClick={handleNavigationBack}
                            style={{ width: '50%' }} 
                        />
                        <Button
                            label="Save"
                            // icon="pi pi-check"
                            className="custom-blue-button"
                            type="submit"
                            style={{ width: '50%' }} 
                        />
                    </div>
                </Card>
            </form>
        </>
    );
};
export default AddCustomersForm;