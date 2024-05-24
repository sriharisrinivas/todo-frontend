
import React, { useEffect, useState } from 'react';
import "./allTasksPage.css";
import ContentContainer from '../ContentContainer/ContentContainer';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import TaskList from '../TaskList/tasklist';
import { Col, Collapse, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryAction, fetchStatusAction, fetchTodos } from '../../Redux/Action/TodosAction';
import Footer from '../Footer/Footer';
import { REDUX_CONSTANTS } from '../../Redux/reduxConstants';
import { todosInitialState } from '../../Redux/Reducer/todosListReducer';

function AllTasksPage({ isCompleted }) {
    let fields = useSelector(state => state.todosListReducer.searchObj);

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const categoriesList = useSelector(state => state.todosListReducer.categoriesList);
    const statusList = useSelector(state => state.todosListReducer.statusList);
    const severityList = useSelector(state => state.todosListReducer.severityList);
    const sortoptions = useSelector(state => state.todosListReducer.sortoptions);

    let contentDynamicHeight = useSelector(state => state.SideBarReducer.dynamicContentContainerHeight);

    const handleChange = (e) => {
        let updatedFields = { ...fields };
        updatedFields[e.target.name] = e.target.value;
        updateFields(updatedFields);
    };

    const handleStatus = (item, i) => {
        /* Updating Fields */

        let updatedStatus = [...statusList];
        updatedStatus[i].selected = !updatedStatus[i].selected;
        dispatch(fetchStatusAction(updatedStatus));


        /* Storing Filters Info in store */

        let updatedFields = { ...fields };
        let selectedStatusList = [];

        statusList.forEach(item => {
            if (item.selected) {
                selectedStatusList.push(item.DT_CODE);
            }
        });

        updatedFields.status = selectedStatusList.join(",");
        updateFields(updatedFields);

    };

    const handleCategories = (item, i) => {
        let updatedCategories = [...categoriesList];
        updatedCategories[i].selected = !updatedCategories[i].selected;
        dispatch(fetchCategoryAction(updatedCategories));

        /* Storing Filters Info in store */

        let updatedFields = { ...fields };
        let selectedCategoriesList = [];

        categoriesList.forEach(item => {
            if (item.selected) {
                selectedCategoriesList.push(item.DT_CODE);
            }
        });

        updatedFields.category = selectedCategoriesList.join(",");
        updateFields(updatedFields);

    };

    const updateFields = (data) => {
        dispatch({
            type: REDUX_CONSTANTS.UPDATE_FILTER_OBJ,
            payload: data
        });
    };

    useEffect(() => {
        let updatedFields = { ...fields };

        if (isCompleted) {
            updatedFields = todosInitialState.searchObj;
            updatedFields.status="2"
        }

        let timeInterval = setTimeout(async () => {
            dispatch(fetchTodos(updatedFields));
        }, 1000);

        return () => clearTimeout(timeInterval);

    }, [fields, statusList, categoriesList, isCompleted]);

    useEffect(() => {
        dispatch(dispatch({
            type: REDUX_CONSTANTS.CLEAR_FILTERS
        }))
    }, [])

    return (
        <div>
            <Header />

            <div className='d-flex sidebar-and-content-container' style={{ height: "92vh" }}>
                <SideBar />
                <Row className="main-content-container" style={{ width: contentDynamicHeight + "%" }}>
                    <Col className='content-container pt-3'>
                        <div className='text-end' style={{
                            position: "absolute",
                            right: "18px"
                        }}>
                            <i class="fa-solid fa-filter" style={{ color: "#7091E6" }} onClick={() => { setOpen(!open); }}></i>
                        </div>

                        <Collapse in={open}>
                            <Row className='mt-3 mb-5' style={{ gap: "10px"}}>
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

                                <Row>
                                    <Col>
                                        <Form.Group className='mt-3'>
                                            <Form.Label>Status</Form.Label>
                                            <Row>
                                                {statusList.map((item, i) =>
                                                    <Col sm="12">
                                                        <Form.Check type="checkbox" label={item["DT_DESCRIPTION"]} checked={item.selected} onChange={() => handleStatus(item, i)} size='lg' />
                                                    </Col>
                                                )}
                                            </Row>
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group className='mt-3'>
                                            <Form.Label>Category</Form.Label>
                                            <Row>
                                                {categoriesList.map((item, i) =>
                                                    <Col sm="12">
                                                        <Form.Check type="checkbox" label={item["DT_DESCRIPTION"]} checked={item.selected} onChange={() => handleCategories(item, i)} size='lg' />
                                                    </Col>
                                                )}
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                            </Row>
                        </Collapse>

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