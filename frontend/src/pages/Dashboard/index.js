import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import api from "../../services/api";
import video from "./../../assets/videos/background.mp4";

function Dashboard() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function updateContactAnimation() {
            let data = {
                "selector": {
                "@assetType": "contact"
                }
            }
            const response = await api.post('/search', data);
            setContacts(response.data.result);

            $('.count').each(function () {
                $(this).prop('Counter',0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 4000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
        }
        updateContactAnimation();
    }, []);
    
    return (
        <div className="dashboard container-fluid">
            <div className="dashboard-header">
                <span>Dashboard</span>
            </div>
            <div className="contacts-info bg-dark">
                <div className="contacts-body">
                    <h1 className="count">{contacts.length}</h1>
                    <h5>Registered contacts</h5>
                </div>
                <div className="contacts-footer">
                    <i><FontAwesomeIcon icon={faArrowUp}/><span>25%</span></i>
                    <span>increase in stored contacts</span>
                </div>
            </div>

            <div className="background-video">
                <div className="opacity-background"></div>
                <video src={video} autoPlay muted loop></video>
            </div>
        </div>
    );
}

export default Dashboard;