import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import api from '../../services/api.js';
import "./style.css";

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [companies, setCompanies] = useState([]);

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
    }, [contacts, handleDelete]);

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
        <div className="contacts">
            <div className="contacts-header">Contacts</div>
            <div className="contacts-body">
                
                <div className="simple-contacts">
                    <h4>Personal Contacts</h4>
                    <ul>
                        {contacts.map(contact => (
                            <li key={contact.name}>
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
                            <li key={company.name}>
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
    );
}

export default Contacts;