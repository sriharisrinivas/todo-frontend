
import React, { useState } from 'react';
import "./addNewTaskPage.css";
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import AddTaskComponent from '../AddTaskComponent/AddTaskComponent';


function AddNewTaskPage() {
    let contentDynamicHeight = useSelector(state => state.SideBarReducer.dynamicContentContainerHeight);

    return (
        <div>
            <Header />

            <div className='d-flex' style={{ height: "92vh" }}>
                <SideBar />

                <Row className="main-content-container" style={{ width: contentDynamicHeight + "%" }}>
                    <Col className='content-container pt-3'>
                        <AddTaskComponent />
                    </Col>
                </Row>
            </div>
        </div>

    );
}

export default AddNewTaskPage;