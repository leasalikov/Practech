import { useState } from 'react';
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
import { DropdownChangeEvent } from 'primereact/dropdown';
import Header from '../Header';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber, parsePhoneNumber, CountryCode } from 'libphonenumber-js';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    file: File | null;
}
interface Errors {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    file: string;
}
const AddCustomersForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        file: null,
    });
    const [errors, setErrors] = useState<Errors>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        file: '',
    });
    const validatePhoneNumber = (phoneNumber: string, country: CountryCode) => {
        return isValidPhoneNumber(phoneNumber, country) ? '' : 'Invalid phone number';
    };
    const validateForm = (country: CountryCode): boolean => {
        const newErrors: Errors = {
            firstName: formData.firstName ? '' : 'Required field',
            lastName: formData.lastName ? '' : 'Required field',
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
        navigate("/CreateCompany", { state: { credentials: [] }, replace: true });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const phoneNumber = parsePhoneNumber(formData.phoneNumber);
            const country = phoneNumber?.country || 'US';
                if (validateForm(country)) {
                console.log('Form data is valid:', formData);
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
                    <div className="p-inputgroup" style={{ marginBottom: '1rem' }}>
                        <span className="p-float-label">
                            <InputText
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)} />
                            <label htmlFor="firstName">First Name</label>
                        </span>
                        {errors.firstName && <small>{errors.firstName}</small>}
                    </div>
                    <div className="p-inputgroup" style={{ marginBottom: '1rem' }}>
                        <span className="p-float-label">
                            <InputText
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)} />
                            <label htmlFor="lastName">Last Name</label>
                        </span>
                        {errors.lastName && <small>{errors.lastName}</small>}
                    </div>
                    <div className="p-inputgroup" style={{ marginBottom: '1rem' }}>
                        <span className="p-float-label">
                            <InputText
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                            <label htmlFor="email">Email</label>
                        </span>
                        {errors.email && <small>{errors.email}</small>}
                    </div>
                    <div className="p-inputgroup" style={{ marginBottom: '1rem' }}>
                        <PhoneInput
                            // className="p-float-label"
                            className="custom-phone-input"
                            defaultCountry="US"
                            value={formData.phoneNumber}
                            onChange={(value) => handleChange('phoneNumber', value)}
                            placeholder="Phone Number"
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
                        />
                        <Button
                            label="Save"
                            icon="pi pi-check"
                            className="custom-blue-button"
                            type="submit"
                        />
                    </div>
                </Card>
            </form>
        </>
    );
};
export default AddCustomersForm;