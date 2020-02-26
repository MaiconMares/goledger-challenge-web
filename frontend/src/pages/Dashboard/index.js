import React, { useEffect } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

function Dashboard() {
    useEffect(() => {
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
    }, []);
    
    return (
        <div className="dashboard container-fluid">
            <div className="dashboard-header">
                <span>Dashboard</span>
            </div>
            <div className="contacts-info bg-dark">
                <div className="contacts-body">
                    <h1 className="count">200</h1>
                    <h5>Registered contacts</h5>
                </div>
                <div className="contacts-footer">
                    <i><FontAwesomeIcon icon={faArrowUp}/><span>25%</span></i>
                    <span>increase in stored contacts</span>
                </div>
            </div>

            <div className="contacts-info bg-dark">
                <div className="contacts-body">
                    <h1 className="count">200</h1>
                    <h5>Registered contacts</h5>
                </div>
                <div className="contacts-footer">
                    <i><FontAwesomeIcon icon={faArrowUp}/><span>25%</span></i>
                    <span>increase in stored contacts</span>
                </div>
            </div>

            <div className="contacts-info bg-dark">
                <div className="contacts-body">
                    <h1 className="count">200</h1>
                    <h5>Registered contacts</h5>
                </div>
                <div className="contacts-footer">
                    <i><FontAwesomeIcon icon={faArrowUp}/><span>25%</span></i>
                    <span>increase in stored contacts</span>
                </div>
            </div>

            <div className="contacts-info bg-dark">
                <div className="contacts-body">
                    <h1 className="count">200</h1>
                    <h5>Registered contacts</h5>
                </div>
                <div className="contacts-footer">
                    <i><FontAwesomeIcon icon={faArrowUp}/><span>25%</span></i>
                    <span>increase in stored contacts</span>
                </div>
            </div>

            <div className="contacts-info bg-dark">
                <div className="contacts-body">
                    <h1 className="count">200</h1>
                    <h5>Registered contacts</h5>
                </div>
                <div className="contacts-footer">
                    <i><FontAwesomeIcon icon={faArrowUp}/><span>25%</span></i>
                    <span>increase in stored contacts</span>
                </div>
            </div>

            <div className="contacts-info bg-dark">
                <div className="contacts-body">
                    <h1 className="count">200</h1>
                    <h5>Registered contacts</h5>
                </div>
                <div className="contacts-footer">
                    <i><FontAwesomeIcon icon={faArrowUp}/><span>25%</span></i>
                    <span>increase in stored contacts</span>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;