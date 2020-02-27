import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import api from '../../services/api.js';
import "./style.css";

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [formIsOpen, setFormIsOpen] = useState(false);

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
    }

    return (
        <>
            {formIsOpen ? <ContactForm /> : null}
        <div className="contacts">
            <div className="contacts-header">
                <span>Contacts</span>
                <i onClick={() => setFormIsOpen(true)}>
                    <FontAwesomeIcon icon={faPlus}/>
                </i>
            </div>
            <div className="contacts-body">
                
                <div className="simple-contacts">
                    <h4>Personal Contacts</h4>
                    <ul>
                        {contacts.map(contact => (
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
                                        <Link to={`/edit_contact/${contact.name}`}>
                                            <i className="contact-actions-edit">
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </i>
                                        </Link>
                                    </strong>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="company-contacts">
                    <h4>Companies Contacts</h4>
                    <ul>
                        {companies.map(company => (
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
                                        <Link to={`/edit_contact/${company.name}`}>
                                            <i className="contact-actions-edit">
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </i>
                                        </Link>
                                    </strong>
                                </div>
                            </li>
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
    
    async function handleSubmitContact(event) {
        event.preventDefault();

        let data = {
            "@assetType": "contact",
            "name": contactName,
            "phone": contactPhone,
            "company": contactCompany,
            "email": contactEmail,
            "age": Number(contactAge)
        }

        console.log(data);

        const response = await api.post('/create', data);
        console.log(response);
    }

    async function handleSubmitCompany(event) {
        event.preventDefault();

        let data = {
            "@assetType": "company",
            "address": companyAddress,
            "name": companyName,
            "number": companyPhone,
            "site": companySite,
            "nemployees": Number(companyNEmployess)
        }

        const response = await api.post('/create', data);
        console.log(response);
    }

    return (
        <>
            <div className="form-interface">
                <div className="fieldset register-buttons">
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
                        </form> }
                </div>
            </div>
        </>
    );
}

export default Contacts;