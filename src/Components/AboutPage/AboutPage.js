
import React, { useState } from 'react';
import "./aboutPage.css";
import ContentContainer from '../ContentContainer/ContentContainer';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import { Form } from 'react-bootstrap';
import Footer from '../Footer/Footer';


function AboutPage() {
    return (
        <div>
            <Header />

            <div className='d-flex' style={{ height: "92vh", marginBottom: "75px" }}>
                <SideBar />
                <Form.Text>Coming Soon.</Form.Text>
            </div>

            <div className='footer-main-container'>
                <Footer />
            </div>


        </div>

    );
}

export default AboutPage;