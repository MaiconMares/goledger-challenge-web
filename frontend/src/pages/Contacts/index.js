import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from 'react-spinner-material';
import { 
    faUser, 
    faTrash, 
    faEdit, 
    faPlus, 
    faEnvelope, 
    faArrowUp, 
    faPhone, 
    faBuilding, 
    faMapMarked, 
    faSortNumericUpAlt,
    faLink,
    faSearch, 
} from "@fortawesome/free-solid-svg-icons";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import api from '../../services/api.js';
import "./style.css";
import 'react-notifications/lib/notifications.css';

function Contacts(props) {
    const [contacts, setContacts] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [formEditIsOpen, setFormEditIsOpen] = useState(false);
    const [contactForm, setContactForm] = useState('');
    const [contactWillEdit, setContactWillEdit] = useState([]);
    const [contactSearching, setContactSearching] = useState('');

    useEffect(() => {
        async function getContacts() {
            const data = {
                "selector": {
                "@assetType": "contact"
                },
                "limit": 10,
                "bookmark": ""
            };
            const response = await api.post('/search', data);
            setContacts(response.data.result);
        }

        getContacts();
        
    }, [contacts]);

    useEffect(() => {
        async function getCompanies() {
            const data = {
                "selector": {
                "@assetType": "company"
                },
                "limit": 10,
                "bookmark": ""
            }
            const response = await api.post('/search', data);
            setCompanies(response.data.result);
        }
        getCompanies();
    }, [companies]);

    async function handleFavorite(contactName) {
        const newContacts = await contacts.map(contact => 
            ((contact.name === contactName) ? { ...contact, favorite: true } : contact)
        );
        setContacts(newContacts);
    }

    async function handleDelete(name, assetType) {
        const data = {
            "@assetType": assetType,
            "name": name
        }
        const response = await api.delete('/delete', { data });

        if (response.status === 200) {  
            NotificationManager.warning('Warning message', 'exclusion sucessfull!');
        } else {
            NotificationManager.error('An unknown error occurred during exclusion!');
        }
    }

    return (
        <>  
            <NotificationContainer/>
            {formIsOpen ? <ContactForm/> : null}
            {formEditIsOpen ? 
                <EditContact formType={contactForm} contactData={contactWillEdit}/> : null}
        <div className="contacts">
            <div className="contacts-header">
                <span>Contacts</span>
                <div className="fieldset">
                    <form onSubmit={(event) => event.preventDefault()} id="search-form">
                        <input 
                            type="text" 
                            value={contactSearching} 
                            id="search-bar"
                            placeholder=" Search..."
                            onChange={event => setContactSearching(event.target.value)}/>
                        <button type="submit">
                            <FontAwesomeIcon icon={faSearch}/>
                        </button>
                    </form>
                </div>
                <i onClick={() => setFormIsOpen(true)}>
                    <FontAwesomeIcon icon={faPlus}/>
                </i>
            </div>
            <div className="contacts-body">
                
                <div className="simple-contacts">
                    <h4>Personal Contacts</h4>
                    <ul>
                        {contactSearching === '' ? contacts.map(contact => (
                            <li key={contact['@key']}>
                                <div className="contact-info">
                                    <div className="contact-photo">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>
                                    <div className="contact-info-text">
                                        <strong>{contact.name}</strong>
                                        <span>Age: {contact.age}</span>
                                        <span>Phone: {contact.phone}</span>
                                        <span>Email:  
                                            {contact.email ? contact.email : ' não informado'}
                                        </span>
                                        <span>Company: {contact.company}</span>
                                    </div>
                                </div>
                                <div className="contact-actions">
                                    <strong onClick={() => handleFavorite(contact.name)}>
                                        <i className="contact-actions-favorite">
                                            { contact.favorite ? <i>&#9733;</i> : <i>&#9734;</i> }
                                        </i>
                                    </strong>
                                    <span 
                                        onClick={() => 
                                        handleDelete(contact.name, "contact")}
                                    >
                                        <i className="contact-actions-delete">
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </i>
                                    </span>
                                    <strong>
                                            <i 
                                                className="contact-actions-edit"
                                                onClick={() => { setContactForm("contact-form"); 
                                                                setFormEditIsOpen(true);
                                                                setContactWillEdit(contact)}}>
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </i>
                                    </strong>
                                </div>
                            </li>
                        )) : 
                        contacts.map(contact => (
                            (contact.name === contactSearching) ? 
                            <li key={contact['@key']}>
                                    <div className="contact-info">
                                        <div className="contact-photo">
                                            <FontAwesomeIcon icon={faUser}/>
                                        </div>
                                        <div className="contact-info-text">
                                            <strong>{contact.name}</strong>
                                            <span>Age: {contact.age}</span>
                                            <span>Phone: {contact.phone}</span>
                                            <span>Email:  
                                                {contact.email ? contact.email : ' não informado'}
                                            </span>
                                            <span>Company: {contact.company}</span>
                                        </div>
                                    </div>
                                    <div className="contact-actions">
                                        <strong onClick={() => handleFavorite(contact.name)}>
                                            <i className="contact-actions-favorite">
                                                { contact.favorite ? <i>&#9733;</i> : <i>&#9734;</i> }
                                            </i>
                                        </strong>
                                        <span 
                                            onClick={() => 
                                            handleDelete(contact.name, "contact")}
                                        >
                                            <i className="contact-actions-delete">
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </i>
                                        </span>
                                        <strong>
                                                <i 
                                                    className="contact-actions-edit"
                                                    onClick={() => { setContactForm("contact-form"); 
                                                                    setFormEditIsOpen(true);
                                                                    setContactWillEdit(contact)}}>
                                                    <FontAwesomeIcon icon={faEdit}/>
                                                </i>
                                        </strong>
                                    </div>
                            </li>
                            : ''
                        ))}
                    </ul>
                </div>
                
                <div className="company-contacts">
                    <h4>Companies Contacts</h4>
                    <ul>
                        {contactSearching === '' ? companies.map(company => (
                            <li key={company['@key']}>
                                <div className="contact-info">
                                    <div className="contact-photo">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>
                                    <div className="contact-info-text">
                                        <strong>Name: {company.name}</strong>
                                        <span>Phone: {company.number}</span>
                                        <span>Address: {company.address}</span>
                                        <span>Site: {company.site ? company.site : 'não informado'}</span>
                                        <span>Number of employees: {company.nemployees}</span>
                                    </div>
                                </div>
                                <div className="contact-actions">
                                    <strong onClick={() => handleFavorite(company.name)}>
                                        <i className="contact-actions-favorite">
                                            { company.favorite ? <i>&#9733;</i> : <i>&#9734;</i> }
                                        </i>
                                    </strong>
                                    <span 
                                        onClick={() => 
                                        handleDelete(company.name, "company")}
                                    >
                                        <i className="contact-actions-delete">
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </i>
                                    </span>
                                    <strong className="contact-actions-edit">
                                            <i 
                                                className="contact-actions-edit"
                                                onClick={() => { 
                                                    setContactForm('company-form'); 
                                                    setFormEditIsOpen(true); 
                                                    setContactWillEdit(company)}}>
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </i>
                                    </strong>
                                </div>
                            </li>
                        )) : 
                        companies.map(company => (
                            (company.name === contactSearching) ?
                                <li key={company['@key']}>
                                    <div className="contact-info">
                                        <div className="contact-photo">
                                            <FontAwesomeIcon icon={faUser}/>
                                        </div>
                                        <div className="contact-info-text">
                                            <strong>Name: {company.name}</strong>
                                            <span>Phone: {company.number}</span>
                                            <span>Address: {company.address}</span>
                                            <span>Site: {company.site ? company.site : 'não informado'}</span>
                                            <span>Number of employees: {company.nemployees}</span>
                                        </div>
                                    </div>
                                    <div className="contact-actions">
                                        <strong onClick={() => handleFavorite(company.name)}>
                                            <i className="contact-actions-favorite">
                                                { company.favorite ? <i>&#9733;</i> : <i>&#9734;</i> }
                                            </i>
                                        </strong>
                                        <span 
                                            onClick={() => 
                                            handleDelete(company.name, "company")}
                                        >
                                            <i className="contact-actions-delete">
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </i>
                                        </span>
                                        <strong className="contact-actions-edit">
                                                <i 
                                                    className="contact-actions-edit"
                                                    onClick={() => { 
                                                        setContactForm('company-form'); 
                                                        setFormEditIsOpen(true); 
                                                        setContactWillEdit(company)}}>
                                                    <FontAwesomeIcon icon={faEdit}/>
                                                </i>
                                        </strong>
                                    </div>
                                </li>
                            : ''
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </>
    );
}

function ContactForm(props) {
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactAge, setContactAge] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactCompany, setContactCompany] = useState('');

    const [companyName, setCompanyName] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companySite, setCompanySite] = useState('');
    const [companyNEmployess, setCompanyNEmployess] = useState('');

    const [formType, setFormType] = useState('contact-form');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    async function handleSubmitContact(event) {
        event.preventDefault();
        setLoading(true);
        
        let data = {
            "@assetType": "contact",
            "name": contactName,
            "phone": contactPhone,
            "company": contactCompany,
            "email": contactEmail,
            "age": Number(contactAge)
        }

        if (!(contactName && contactPhone && companyPhone)) {
            NotificationManager.error('Error message', 'Phone and name are required fields!');
            return setTimeout(() => window.location.reload(), 2000);
        }

        try {
            const response = await api.post('/create', data);
            if (response.status === 200) {
                setLoading(false);

                NotificationManager.success('Sucess message', 'Contact Registered!');
            } else if (response.status === 409) {
                throw {
                    name: "Conflict in register",
                    message: "This contact was already registered!"
                }
            }
        } catch(error) {
            NotificationManager.error('Error message', 'This contact was already registered or another unknown problem has occurred!');
            console.log(error.status);
            console.log('Problema!');
            setLoading(false);
        }

        setIsOpen(false);
        setTimeout(() => window.location.reload(), 3000);
    }

    async function handleSubmitCompany(event) {
        event.preventDefault();
        setLoading(true);

        let data = {
            "@assetType": "company",
            "address": companyAddress,
            "name": companyName,
            "number": companyPhone,
            "site": companySite,
            "nemployees": Number(companyNEmployess)
        }

        if (!(companyAddress && companyName && companyPhone)) {
            NotificationManager.error('Error message', 'Address, name and phone are required fields!');
            return setTimeout(() => window.location.reload(), 2000);
        }

        try {
            const response = await api.post('/create', data);
            if (response.status === 200) {
                setLoading(false);
                props.showChild = false;

                NotificationManager.success('Sucess message', 'Company contact Registered!');
            } if (response.status === 409) {
                throw {
                    name: "Conflict in register",
                    message: "This contact was already registered!"
                }
            }
        } catch(error) {
            console.log(error);
            console.log('Problema!');
            setLoading(false);
            //Mostrar mensagem de erro.
        }

        NotificationManager.error('Error message', 'This contact was already registered or another unknown problem has occurred!');
        setTimeout(() => window.location.reload(), 2000);
    }

    return (
        <>
            {isOpen ?
                <div className="form-interface">
                    <div className="fieldset register-buttons">
                        <button onClick={() => setTimeout(() => window.location.reload(), 500)}>
                            &times;
                        </button>
                        <button  
                            value="contact-form"
                            onClick={e => setFormType(e.target.value)}>Register Contact
                        </button>
                        <button 
                            value="company-form"
                            onClick={e => setFormType(e.target.value)}>Register Company
                        </button>
                    </div>
                    <div className="save-contact-form">
                            {formType && (formType === "contact-form") 
                            ? 
                            <form onSubmit={handleSubmitContact}>
                                <div className="form-header">
                                    <FontAwesomeIcon icon={faUser} className="form-header-icon"/>
                                </div>
                                <div className="fieldset">
                                    <div className="form-icon">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>
                                    <input 
                                        type="text" 
                                        name="contact-name" 
                                        id="contact-name" 
                                        placeholder="  Name"
                                        value={contactName}
                                        onChange={e => setContactName(e.target.value)}/>
                                </div>
                                <div className="fieldset">
                                        <div className="form-icon">
                                            <FontAwesomeIcon icon={faPhone}/>
                                        </div>
                                        <input 
                                            type="text" 
                                            name="contact-phone" 
                                            id="contact-phone" 
                                            placeholder="  Phone"
                                            value={contactPhone} 
                                            onChange={e => setContactPhone(e.target.value)}/>
                                </div>
                                <div className="fieldset">
                                        <div className="form-icon">
                                            <FontAwesomeIcon icon={faSortNumericUpAlt}/>
                                        </div>
                                        <input 
                                            type="text" 
                                            name="contact-age" 
                                            id="contact-age" 
                                            placeholder="  Age"
                                            value={contactAge} 
                                            onChange={e => setContactAge(e.target.value)}/>
                                </div>
                                <div className="fieldset">
                                        <div className="form-icon">
                                            <FontAwesomeIcon icon={faEnvelope}/>
                                        </div>
                                        <input 
                                            type="text" 
                                            name="contact-email" 
                                            id="contact-email" 
                                            placeholder="  Email"
                                            value={contactEmail} 
                                            onChange={e => setContactEmail(e.target.value)}/>
                                </div>
                                <div className="fieldset">
                                        <div className="form-icon">
                                            <FontAwesomeIcon icon={faBuilding}/>
                                        </div>
                                        <input 
                                            type="text" 
                                            name="contact-company" 
                                            id="contact-company" 
                                            placeholder="  Contact Company"
                                            value={contactCompany} 
                                            onChange={e => setContactCompany(e.target.value)}/>
                                </div>
                                <button type="submit" className="form-submit">Save</button>
                                {loading ? <div className="spinner-save-contact">
                                    <Spinner radius={120} color={"#9e189e"} stroke={10} visible={true} />
                                </div> 
                                : null}
                            </form> : 
                            <form onSubmit={handleSubmitCompany}>
                                <div className="form-header">
                                    <FontAwesomeIcon icon={faBuilding} className="form-header-icon"/>
                                </div>
                                <div className="fieldset">
                                    <div className="form-icon">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>
                                    <input 
                                        type="text" 
                                        name="company-name" 
                                        id="company-name" 
                                        placeholder="  Name"
                                        value={companyName} 
                                        onChange={e => setCompanyName(e.target.value)}/>
                                </div>
                                <div className="fieldset">
                                        <div className="form-icon">
                                            <FontAwesomeIcon icon={faMapMarked}/>
                                        </div>
                                        <input 
                                            type="text" 
                                            name="company-address" 
                                            id="company-address" 
                                            placeholder="  Address"
                                            value={companyAddress} 
                                            onChange={e => setCompanyAddress(e.target.value)}/>
                                </div>
                                <div className="fieldset">
                                        <div className="form-icon">
                                            <FontAwesomeIcon icon={faPhone}/>
                                        </div>
                                        <input 
                                            type="text" 
                                            name="company-phone" 
                                            id="company-phone" 
                                            placeholder="  Phone"
                                            value={companyPhone} 
                                            onChange={e => setCompanyPhone(e.target.value)}/>
                                </div>
                                <div className="fieldset">
                                        <div className="form-icon">
                                            <FontAwesomeIcon icon={faLink}/>
                                        </div>
                                        <input 
                                            type="text" 
                                            name="company-site" 
                                            id="company-site" 
                                            placeholder="  Site"
                                            value={companySite} 
                                            onChange={e => setCompanySite(e.target.value)}/>
                                </div>
                                <div className="fieldset">
                                        <div className="form-icon">
                                            <FontAwesomeIcon icon={faSortNumericUpAlt}/>
                                        </div>
                                        <input 
                                            type="text" 
                                            name="company-nemployees" 
                                            id="company-nemployees" 
                                            placeholder="  Number of employees"
                                            value={companyNEmployess} 
                                            onChange={e => setCompanyNEmployess(e.target.value)}/>
                                </div>
                                <button type="submit" className="form-submit">Save</button>
                                {loading ? <div className="spinner-save-contact">
                                    <Spinner radius={120} color={"#9e189e"} stroke={10} visible={true} />
                                </div> 
                                : null}
                            </form> }
                    </div>
                </div>
                : null}
        </>
    );
}

function EditContact(props) {
    const [loading, setLoading] = useState(false);

    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactAge, setContactAge] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactCompany, setContactCompany] = useState('');

    const [companyName, setCompanyName] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companySite, setCompanySite] = useState('');
    const [companyNEmployess, setCompanyNEmployess] = useState('');

    useEffect(() => {
        if (props.contactData['@assetType'] === "contact") {
            setContactName(props.contactData.name);
            setContactPhone(props.contactData.phone);
            setContactAge(props.contactData.age);
            setContactEmail(props.contactData.email);
            setContactCompany(props.contactData.contactCompany);
        } else {
            setCompanyName(props.contactData.name);
            setCompanyPhone(props.contactData.phone);
            setCompanyAddress(props.contactData.address);
            setCompanySite(props.contactData.site);
            setCompanyNEmployess(props.contactData.nemployees);
        }
    }, [props.formType])

    async function handleSubmitContact(event) {
        event.preventDefault();
        setLoading(true);
        
        let data = {
            "@assetType": "contact",
            "name": contactName,
            "phone": contactPhone,
            "company": contactCompany,
            "email": contactEmail,
            "age": Number(contactAge)
        }
        try {
            const response = await api.put('/update', data);
            if (response.status === 200) {
                setLoading(false);

                NotificationManager.success('Sucess message', 'Contact updated successfully!');
            } if (response.status === 409) {
                throw {
                    name: "Conflict in register",
                    message: "This contact was already registered!"
                }
            }
        } catch(error) {
            NotificationManager.error('Error message', 'Problably you passed an uncorret or not registered name contact!');
            console.log(error);
            console.log('Problema!');
            setLoading(false);
        }

        setTimeout(() => window.location.reload(), 2000);
    }

    async function handleSubmitCompany(event) {
        event.preventDefault();
        setLoading(true);

        let data = {
            "@assetType": "company",
            "address": companyAddress,
            "name": companyName,
            "number": companyPhone,
            "site": companySite,
            "nemployees": Number(companyNEmployess)
        }

        try {
            const response = await api.put('/update', data);
            if (response.status === 200) {
                setLoading(false);
                props.showChild = false;

                NotificationManager.success('Sucess message', 'Company contact updated successfully!');

            } if (response.status === 409) {
                throw {
                    name: "Conflict in register",
                    message: "This contact was already registered!"
                }
            }
        } catch(error) {
            console.log(error);
            console.log('Problema!');
            setLoading(false);
            //Mostrar mensagem de erro.

            NotificationManager.error('Error message', 'Problably you passed an uncorret or not registered name contact!');
        }

        setTimeout(() => window.location.reload(), 2000);
    }

    return (
        <>
          <div className="form-interface">
                <div id="form-buttons">
                    <button id="close-edit-form" onClick={() => setTimeout(() => window.location.reload(), 500)}>&times;</button>
                </div>
                <div className="save-contact-form">
                    {props.formType && (props.formType === "contact-form") 
                    ? 
                    <form onSubmit={handleSubmitContact}>
                        <div className="form-header">
                            <FontAwesomeIcon icon={faUser} className="form-header-icon"/>
                        </div>
                        <div className="fieldset">
                            <div className="form-icon">
                                <FontAwesomeIcon icon={faUser}/>
                            </div>
                            <input 
                                type="text" 
                                name="contact-name" 
                                id="contact-name" 
                                placeholder="  Name"
                                value={contactName}
                                onChange={e => setContactName(e.target.value)}/>
                        </div>
                        <div className="fieldset">
                            <div className="form-icon">
                                 <FontAwesomeIcon icon={faPhone}/>
                            </div>
                             <input 
                                type="text" 
                                name="contact-phone" 
                                id="contact-phone" 
                                placeholder="  Phone"
                                value={contactPhone} 
                                onChange={e => setContactPhone(e.target.value)}/>
                        </div>
                        <div className="fieldset">
                            <div className="form-icon">
                                <FontAwesomeIcon icon={faSortNumericUpAlt}/>
                            </div>
                            <input 
                                type="text" 
                                name="contact-age" 
                                id="contact-age" 
                                placeholder="  Age"
                                value={contactAge} 
                                onChange={e => setContactAge(e.target.value)}/>
                        </div>
                        <div className="fieldset">
                            <div className="form-icon">
                                <FontAwesomeIcon icon={faEnvelope}/>
                            </div>
                            <input 
                                type="text" 
                                name="contact-email" 
                                id="contact-email" 
                                placeholder="  Email"
                                value={contactEmail} 
                                onChange={e => setContactEmail(e.target.value)}/>
                        </div>
                        <div className="fieldset">
                            <div className="form-icon">
                                <FontAwesomeIcon icon={faBuilding}/>
                            </div>
                            <input 
                                type="text" 
                                name="contact-company" 
                                id="contact-company" 
                                placeholder="  Contact Company"
                                value={contactCompany} 
                                onChange={e => setContactCompany(e.target.value)}/>
                        </div>
                        <button type="submit" className="form-submit">Save</button>
                            {loading ? 
                            <div className="spinner-save-contact">
                                <Spinner radius={120} color={"#9e189e"} stroke={10} visible={true} />
                            </div> 
                            : null}
                    </form> : 
                    <form onSubmit={handleSubmitCompany}>
                        <div className="form-header">
                            <FontAwesomeIcon icon={faBuilding} className="form-header-icon"/>
                        </div>
                        <div className="fieldset">
                            <div className="form-icon">
                                <FontAwesomeIcon icon={faUser}/>
                            </div>
                            <input 
                                type="text" 
                                name="company-name" 
                                id="company-name" 
                                placeholder="  Name"
                                value={companyName} 
                                onChange={e => setCompanyName(e.target.value)}/>
                        </div>
                        <div className="fieldset">
                            <div className="form-icon">
                                <FontAwesomeIcon icon={faMapMarked}/>
                            </div>
                            <input 
                                type="text" 
                                name="company-address" 
                                id="company-address" 
                                placeholder="  Address"
                                value={companyAddress} 
                                onChange={e => setCompanyAddress(e.target.value)}/>
                        </div>
                        <div className="fieldset">
                            <div className="form-icon">
                                <FontAwesomeIcon icon={faPhone}/>
                            </div>
                            <input 
                                type="text" 
                                name="company-phone" 
                                id="company-phone" 
                                placeholder="  Phone"
                                value={companyPhone} 
                                onChange={e => setCompanyPhone(e.target.value)}/>
                                </div>
                        <div className="fieldset">
                            <div className="form-icon">
                                <FontAwesomeIcon icon={faLink}/>
                            </div>
                            <input 
                                type="text" 
                                name="company-site" 
                                id="company-site" 
                                placeholder="  Site"
                                value={companySite} 
                                onChange={e => setCompanySite(e.target.value)}/>
                        </div>
                        <div className="fieldset">
                            <div className="form-icon">
                                <FontAwesomeIcon icon={faSortNumericUpAlt}/>
                            </div>
                            <input 
                                type="text" 
                                name="company-nemployees"
                                id="company-nemployees" 
                                placeholder="  Number of employees"
                                value={companyNEmployess} 
                                onChange={e => setCompanyNEmployess(e.target.value)}/>
                        </div>
                        <button type="submit" className="form-submit">Save</button>
                            {loading ? 
                                <div className="spinner-save-contact">
                                    <Spinner radius={120} color={"#9e189e"} stroke={10} visible={true} />
                                </div> 
                            : null}
                    </form> }
                </div>
            </div>  
        </>
    );
}

export default Contacts;