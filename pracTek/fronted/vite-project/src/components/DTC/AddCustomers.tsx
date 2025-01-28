import React, { useState } from 'react';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Avatar } from 'primereact/avatar';
import '../style/AddCustomers.css';
import { FileUploadHandlerEvent } from 'primereact/fileupload';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { Navigate } from 'react-router-dom';

interface Country {
    name: string;
    code: string;
    flag: string;
    phoneCode: string;
}

const AddCustomersForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        selectedCountry: null as Country | null,
        file: null as File | null,
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        selectedCountry: '',
        file: '',
    });

    const [loading, setLoading] = useState(false);

    const countries: Country[] = [
        {
            name: 'United States',
            code: 'US',
            flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
            phoneCode: '+1',
        },
        {
            name: 'Israel',
            code: 'IL',
            flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg',
            phoneCode: '+972',
        },
        {
            name: 'United Kingdom',
            code: 'GB',
            flag: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg',
            phoneCode: '+44',
        },
        {
            name: 'Germany',
            code: 'DE',
            flag: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
            phoneCode: '+49',
        },
    ];

    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const validateForm = () => {
        const newErrors = {
            firstName: formData.firstName ? '' : 'First name is required',
            lastName: formData.lastName ? '' : 'Last name is required',
            email: formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) ? '' : 'Valid email is required',
            phoneNumber: formData.phoneNumber.match(/^\d+$/) ? '' : 'Phone number must be numeric',
            selectedCountry: formData.selectedCountry ? '' : 'Country is required',
            file: formData.file ? '' : 'File is required',
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const onCountryChange = (e: DropdownChangeEvent) => {
        const selectedCountry = e.value;
        setFormData({
            ...formData,
            selectedCountry,
            phoneNumber: selectedCountry.phoneCode, // Set the phone code as the initial phone number
        });
    };

    const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            phoneNumber: e.target.value,
        });
    };

    const onUpload = (e: FileUploadHandlerEvent) => {
        handleChange('file', e.files[0]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form Data:', formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card
                title="Add New Customer"
                subTitle="Add agencies/individual clients to your list"
                style={{ width: '30rem', margin: '2em auto', padding: '1em', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
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
                    {errors.file && <small style={{ color: 'red' }}>{errors.file}</small>}
                </div>

                <div className="p-inputgroup" style={{ marginBottom: '1rem' }}>
                    <span className="p-float-label">
                        <InputText
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                        />
                        <label htmlFor="firstName">First Name</label>
                    </span>
                    {errors.firstName && <small style={{ color: 'red' }}>{errors.firstName}</small>}
                </div>

                <div className="p-inputgroup" style={{ marginBottom: '1rem' }}>
                    <span className="p-float-label">
                        <InputText
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                        />
                        <label htmlFor="lastName">Last Name</label>
                    </span>
                    {errors.lastName && <small style={{ color: 'red' }}>{errors.lastName}</small>}
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
                    {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Dropdown
                        value={formData.selectedCountry}
                        options={countries}
                        onChange={onCountryChange}
                        optionLabel="name"
                        placeholder="Select Country"
                        style={{ width: '10rem' }}
                        itemTemplate={(option) => (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <img
                                    src={option.flag}
                                    alt={option.name}
                                    style={{ width: '20px', height: '15px', borderRadius: '2px' }}
                                />
                                <span>{option.name}</span>
                            </div>
                        )}
                    />
                    <InputText
                        value={formData.phoneNumber}
                        onChange={onPhoneNumberChange}
                        placeholder="Phone Number"
                        type="tel"
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <Button
                        label="Go back"
                        icon="pi pi-arrow-left"
                        className="custom-blue-button"
                        type="button"
                        onClick={() => {
                            <Navigate to="/CreateCompany"
                             state={{credentials: []}} replace = {true}
                            />
                        }}
                    />
                    <Button
                        label="Save"
                        icon="pi pi-check"
                        loading={loading}
                        className="custom-blue-button"
                        type="submit"
                    />
                </div>
            </Card>
        </form>
    );
};

export default AddCustomersForm;