import React, { useEffect, useState } from 'react';
import AddTaskComponent from '../AddTaskComponent/AddTaskComponent';
import TaskList from '../TaskList/tasklist';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function ContentContainer() {

    let contentDynamicHeight = useSelector(state => state.SideBarReducer.dynamicContentContainerHeight)

    return (
        <>
            <Row className="main-content-container" style={{ width: contentDynamicHeight + "%" }}>
                <Col className='content-container pt-3'>
                    <AddTaskComponent />
                    <br />
                    <TaskList />
                </Col>
            </Row>
        </>
    );
}

export default ContentContainer;
