
import React, { useState } from 'react';
import "./home.css";
import ContentContainer from '../ContentContainer/ContentContainer';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import Footer from '../Footer/Footer';


function Home() {
    return (
        <div>
            <Header />

            <div className='d-flex' style={{ height: "92vh", marginBottom: "75px" }}>
                <SideBar />
                <ContentContainer />
            </div>

            <div className='footer-main-container'>
                <Footer />
            </div>
        </div>

    );
}

export default Home;