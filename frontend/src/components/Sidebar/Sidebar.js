import React, { useState, useEffect } from 'react';
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAddressBook, faUser, faAlignLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let width = window.screen.width;
        let sidebar = document.querySelector('nav#sidebar');
        console.log(width);
        if (width <= 768) {
            sidebar.setAttribute('class', 'active');
            setIsOpen(!isOpen);
        }
    }, [window.onresize]);

    useEffect(() => {
        let button = document.querySelector('button[id=sidebarCollapse]');
        let sidebar = document.querySelector('nav#sidebar');

        if(!isOpen) {
            button.onclick = () => {
                sidebar.setAttribute('class', 'active');
            }
        } else {
            button.onclick = () => {
                sidebar.removeAttribute('class');
            }
        }
    }, [isOpen]);

    function handleMenu() {
        setIsOpen(!isOpen);
    }

    return (
       <div className="wrapper">
           <nav id="sidebar">
                <div className="background-colored">
                    <div className="sidebar-header">
                        <h3>GoBook Options</h3>
                        <strong>GB Options</strong>
                    </div>

                    <ul className="list-unstyled components">
                        <li className="active">
                            <a href="/">
                                <FontAwesomeIcon icon={faHome} className="fa-icon"/>
                                <p>Dashboard</p>
                            </a>
                        </li>
                        <li>
                            <a href="/contacts">
                                <FontAwesomeIcon icon={faAddressBook} className="fa-icon"/>
                                <p>My Contacts</p>
                            </a>
                        </li>
                        <li>
                            <a href="/profile">
                                <FontAwesomeIcon icon={faUser} className="fa-icon"/>
                                <p>Profile</p>
                            </a>
                        </li>
                    </ul>
                </div>
           </nav>

           <div id="content">
               
               <nav className="navbar navbar-expand-lg navbar-light">
                   <div className="container-fluid">

                       <button 
                        type="button" 
                        id="sidebarCollapse" 
                        onClick={handleMenu}>
                            <div><FontAwesomeIcon icon={faBars}/></div>
                       </button>
                   </div>
               </nav>
           </div>
       </div>
    );
}

export default Sidebar;