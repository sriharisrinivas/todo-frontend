import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import TaskItem from '../TaskItem/taskitem';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function TaskList() {

    const todosList = useSelector(state => state.todosListReducer.todosList);


    return (
        <>
            <Row>
                <Col sm="12">
                    <Form.Text className='task-main-title'>My Tasks</Form.Text>
                </Col>

                <Col className='d-flex'>
                    <Form.Text className=''>Pending</Form.Text>
                    <div className='pending-tasks-container legend-box'></div>
                </Col>

                <Col className='d-flex'>
                    <Form.Text className=''>Completed</Form.Text>
                    <div className='completed-tasks-container legend-box'></div>
                </Col>

                <Col className='d-flex'>
                    <Form.Text className=''>Deleted</Form.Text>
                    <div className='deleted-tasks-container legend-box'></div>
                </Col>

            </Row>
            <Row className='card task-card mt-2 mb-2'>
                <Col className="task-list-container">

                    <Row style={{ width: "100%" }}>
                        {todosList.map(item =>
                            // <Col sm={12} >
                            <TaskItem item={item} />
                            // </Col>
                        )}

                        {todosList.length == 0 &&
                            <div className='d-flex flex-column align-items-center'>
                                <Form.Text className='mb-1'>No Tasks</Form.Text>
                                <Link to="/home">
                                    <button className='btn btn-outline-success'>Create Task</button>
                                </Link>
                            </div>
                        }
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default TaskList;