import { useState } from 'react';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { AutoComplete } from "primereact/autocomplete";

const AddCustomersForm = () => {
    const [newCustomer, setNewCustomer] = useState('');
    // const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    // const suggestions = ['John', 'Jane', 'Jack', 'Jill'];

    // const search = (event) => {
    //     const query = event.query.toLowerCase();
    //     const filtered = suggestions.filter((item) =>
    //         item.toLowerCase().includes(query)
    //     );
    //     setFilteredSuggestions(filtered);
    // };

    return (
        <Card 
            title="Add New Customer" 
            style={{ width: '30rem', margin: '2em auto', padding: '1em', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
            <span className="p-float-label">
                <AutoComplete inputId="ac" 
                 onChange={(e) => setNewCustomer(e.value)} />
                <label htmlFor="ac">First name</label>
            </span>
            <span className="p-float-label">
                <AutoComplete inputId="ac" 
                 onChange={(e) => setNewCustomer(e.value)} />
                <label htmlFor="ac">Last name</label>
            </span>
            <span className="p-float-label">
                <AutoComplete inputId="ac" 
                 onChange={(e) => setNewCustomer(e.value)} />
                <label htmlFor="ac">Email</label>
            </span>
        </Card>
    );
};

export default AddCustomersForm;
