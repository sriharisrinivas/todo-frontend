
import React, { useState } from 'react';
import "./aboutPage.css";
import ContentContainer from '../ContentContainer/ContentContainer';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import { Form } from 'react-bootstrap';


function AboutPage() {
    return (
        <div>
            <Header />

            <div className='d-flex' style={{ height: "92vh" }}>
                <SideBar />
                <Form.Text>Coming Soon.</Form.Text>
            </div>
        </div>

    );
}

export default AboutPage;