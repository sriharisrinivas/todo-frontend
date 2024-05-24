
import React, { useState } from 'react';
import "./aboutPage.css";
import ContentContainer from '../ContentContainer/ContentContainer';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';


function AboutPage() {
    let contentDynamicHeight = useSelector(state => state.SideBarReducer.dynamicContentContainerHeight);

    return (
        <div>
            <Header />

            <div className='d-flex sidebar-and-content-container' style={{ height: "92vh" }}>
                <SideBar />
                <Container>
                    <Row className="main-content-container" style={{ width: contentDynamicHeight + "%" }}>
                        <Col className='content-container pt-3'>

                            <Col sm="12" className='mb-3'>
                                <h1>Todo Application</h1>
                                <Form.Text>
                                    A to-do list is just a list of things you have to-do. That means basically anything and everything can be on your to-do list—but just because you’ve written your to-dos down doesn’t mean your to-do list is actually useful. Effectively tracking when your work is due can help you prioritize and get great work done. But too often, that list of work to-dos is disorganized and disconnected from the actual work you’re doing—which leads to less clarity and more work about work.
                                </Form.Text>
                            </Col>

                            <Col sm="12" className='mb-3'>
                                <h1>Highlights of this website</h1>

                                <ul>
                                    <li className='form-text'>User can able to create/login into this website.</li>
                                    <li className='form-text'>Upon successful login, user will be able to see list of tasks.</li>
                                    <li className='form-text'>User can able to create/update tasks based on category, severity etc...</li>
                                    <li className='form-text'>User can able to filter tasks under All Tasks page.</li>
                                    <li className='form-text'>User can able to update password.</li>
                                </ul>
                            </Col>

                            <Col sm="12" className='mb-3'>
                                <h1>Why use this application?</h1>

                                <ul>
                                    <li className='form-text'>Providing unique username so that we dont have any user conflicts.</li>
                                    <li className='form-text'>Accounts are secure as we are storing encrypted passwords in our system.</li>
                                    <li className='form-text'>Validating user and providing access to account to respective user only.
                                        Only if user is valid he/she can able to access the features</li>
                                    <li className='form-text'>Tasks are being saved/updated against user, so user cannot access/update other users tasks hence account is secure.</li>
                                </ul>
                            </Col>

                            <Col sm="12" className='mb-3'>
                                <h1>More features coming soon.</h1>

                                <ul>
                                    <li className='form-text'>View/Update Profile Picture</li>
                                    <li className='form-text'>Date Range Sorting.</li>
                                    {/* <li className='form-text'></li> */}
                                </ul>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className='footer-main-container'>
                <Footer />
            </div>


        </div>

    );
}

export default AboutPage;