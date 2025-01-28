import { useState } from 'react';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { AutoComplete } from "primereact/autocomplete";
// import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Avatar } from 'primereact/avatar';
import '../style/AddCustomers.css'


const AddCustomersForm = () => {
    const [newCustomer, setNewCustomer] = useState('');
    // const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    interface Country {
        name: string;
        code: string;
        flag: string;
    }
    const [phoneNumber, setPhoneNumber] = useState('');
    const countries = [
        { name: 'United States', code: 'US', flag: '🇺🇸' },
        { name: 'Israel', code: 'IL', flag: '🇮🇱' },
        { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
        { name: 'Germany', code: 'DE', flag: '🇩🇪' },
    ];
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const onUpload = (e) => {
        setFile(e.files[0]);
        console.log('Uploaded file:', e.files[0]);
    };
    // const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    // const suggestions = ['John', 'Jane', 'Jack', 'Jill'];

    // const search = (event) => {
    //     const query = event.query.toLowerCase();
    //     const filtered = suggestions.filter((item) =>
    //         item.toLowerCase().includes(query)
    //     );
    //     setFilteredSuggestions(filtered);
    // };
    // const onCountryChange = (any: e) => {
    //     setSelectedCountry(any: e.value);
    // };
    const onCountryChange = (e: DropdownChangeEvent): void => {
        setSelectedCountry(e.value as Country);
    };

    return (
        <Card
            title="Add New Customer"
            subTitle="add agencies/individual clients to your list"
            style={{ width: '30rem', margin: '2em auto', padding: '1em', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                {/* Avatar (Icon for Image Placeholder) */}
                <Avatar
                    icon="pi pi-image"
                    shape="circle"
                    style={{ width: '60px', height: '60px', backgroundColor: '#f0f4fa', color: '#888' }}
                />
                <FileUpload
                    name="demo[]"
                    url="./upload"
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
            </div>
            <div className="p-inputgroup" style={{ marginBottom: '1rem' }}>
                <span className="p-float-label" style={{ marginBottom: '1rem' }}>
                    <AutoComplete inputId="ac"
                        onChange={(e) => setNewCustomer(e.value)} />
                    <label htmlFor="ac">First name</label>
                </span>
            </div>
            <div className="p-inputgroup" style={{ marginBottom: '1rem' }}>
                <span className="p-float-label" style={{ marginBottom: '1rem' }}>
                    <AutoComplete inputId="ac"
                        onChange={(e) => setNewCustomer(e.value)} />
                    <label htmlFor="ac">Last name</label>
                </span>
            </div>
            <div className="p-inputgroup" style={{ marginBottom: '1rem' }}>

                <span className="p-float-label" style={{ marginBottom: '1rem' }}>
                    <AutoComplete inputId="ac"
                        onChange={(e) => setNewCustomer(e.value)} />
                    <label htmlFor="ac">Email</label>
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {/* <Dropdown
                value={selectedCountry}
                options={countries}
                onChange={onCountryChange}
                optionLabel="flag"
                placeholder="Select"
                style={{ width: '4rem' }}
                itemTemplate={(option) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{option.flag}</span>
                        <span>{option.name}</span>
                    </div>
                )}
            /> */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                    <InputText
                        placeholder="Phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        style={{ width: '100%' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                        <Button label="Go back" icon="pi pi-arrow-left" className="custom-blue-button" />
                        <Button
                            label="Save"
                            icon="pi pi-check"
                            loading={loading}
                            onClick={load}
                            className="custom-blue-button"
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AddCustomersForm;