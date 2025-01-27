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

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
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
            {/* <Button icon="pi pi-user" rounded severity="info" aria-label="User" /> */}
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