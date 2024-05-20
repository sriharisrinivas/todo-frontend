
import React, { useEffect, useState } from 'react';
import "./allTasksPage.css";
import ContentContainer from '../ContentContainer/ContentContainer';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import TaskList from '../TaskList/tasklist';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../../Redux/Action/TodosAction';
import Footer from '../Footer/Footer';

const initialFields = {
    "sortBySeverity": "ASC",
    "search": '',
    "status": "1,2,3",
    // "selectedStatusArr": [],
    "category": '1,2',
    // "selectedCategoryArr": []
};

function AllTasksPage() {

    const [fields, setFields] = useState(initialFields);

    const dispatch = useDispatch();

    const categoriesList = useSelector(state => state.todosListReducer.categoriesList);
    const statusList = useSelector(state => state.todosListReducer.statusList);
    const severityList = useSelector(state => state.todosListReducer.severityList);
    const sortoptions = useSelector(state => state.todosListReducer.sortoptions);

    let contentDynamicHeight = useSelector(state => state.SideBarReducer.dynamicContentContainerHeight);

    const handleChange = (e) => {
        setFields(pre => ({ ...pre, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        let timeInterval = setTimeout(async () => {
            dispatch(fetchTodos(fields));
        }, 1000)

        return () => clearTimeout(timeInterval)
    }, [fields]);

    return (
        <div>
            <Header />

            <div className='d-flex' style={{ height: "92vh", marginBottom: "75px" }}>
                <SideBar />
                <Row className="main-content-container" style={{ width: contentDynamicHeight + "%" }}>
                    <Col className='content-container pt-3'>

                        <Row className='mt-3 mb-5'>
                            <Col sm={12} md={6}>
                                <Form.Group className=''>
                                    <Form.Label>Search Task</Form.Label>
                                    <div className='d-flex'>
                                        <Form.Control className="todo-field" size="lg" type="search" name={"search"} value={fields.search} onChange={handleChange} placeholder='Search Tasks...' />
                                        <i className='fa fa-search mt-2 ms-2' />
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col sm={12} md={6}>
                                <Form.Group>
                                    <Form.Label>Severity</Form.Label>
                                    <Form.Select className="todo-field" name={"sortBySeverity"} value={fields.sortBySeverity} onChange={handleChange} size='lg'>
                                        {sortoptions.map(item => <option value={item["DT_CODE"]}>{item["DT_DESCRIPTION"]}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            {/* <Col>
                                <Form.Group className='mt-3'>
                                    <Form.Label>Gender</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Check type="checkbox" label="Male" name={"gender"} value={1} onChange={handleChange} size='lg' />
                                        </Col>
                                        <Col>
                                            <Form.Check type="checkbox" label="Female" name={"gender"} value={2}  onChange={handleChange} size='lg' />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col> */}

                        </Row>

                        <TaskList />
                    </Col>
                </Row>
            </div>

            <div className='footer-main-container'>
                <Footer />
            </div>
        </div>

    );
}

export default AllTasksPage;