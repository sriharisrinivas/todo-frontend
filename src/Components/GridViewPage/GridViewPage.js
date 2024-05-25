
import React, { useEffect, useMemo, useState } from 'react';
import "./GridViewPage.css";
import ContentContainer from '../ContentContainer/ContentContainer';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import { Col, Container, Form, Modal, Row } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { fetchTodos } from '../../Redux/Action/TodosAction';
import { API_END_POINTS, CONSTANTS } from '../../config';
import { startLoaderAction, stopLoaderAction } from '../../Redux/Action/LoaderAction';
import AddTaskComponent from '../AddTaskComponent/AddTaskComponent';


function GridViewPage() {
    let contentDynamicHeight = useSelector(state => state.SideBarReducer.dynamicContentContainerHeight);

    const todosList = useSelector(state => state.todosListReducer.todosList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    const [selectedRowDetails, setSelectedRowDetails] = useState(undefined);

    let searchObj = useSelector(state => state.todosListReducer.searchObj);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const onUpdateTask = async (item, isDelete = false) => {
        let url = CONSTANTS.SERVICE_URL + API_END_POINTS.UPDATE_TODO;

        let payload = {
            title: item["TITLE"],
            description: item["DESCRIPTION"] ? item["DESCRIPTION"] : "",
            status: item["STATUS"] == 1 ? 2 : 1,
            severity: item["SEVERITY"],
            category: item["CATEGORY"],
            taskDate: new Date(item["TASK_DATE"]),
            taskId: item["TASK_ID"]
        };

        if (isDelete) {
            payload.status = 3;
        }

        let options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(payload)
        };

        dispatch(startLoaderAction());
        await fetch(url, options);
        dispatch(stopLoaderAction());
        dispatch(fetchTodos(searchObj));

    };

    const onToggleStatus = (item) => {
        onUpdateTask(item);
    };

    const onDeleteTask = (item) => {
        onUpdateTask(item, true);
    };

    const callBack = () => {
        handleClose();
        setSelectedRowDetails(undefined);
    };

    const onEditTask = (item) => {
        setSelectedRowDetails(item);
        setShow(true);
    };

    const Actions = (params) => {
        return <div className='d-flex'>
            {
                params.data["STATUS"] != 3 &&
                <div className='ms-2 mt-1'>
                    <i disabled={params.data["STATUS"] != 1} className='fa fa-edit mt-1' onClick={() => { onEditTask(params.data); }}></i>
                </div>
            }

            {
                params.data["STATUS"] == 1 &&
                <div className='ms-2 mt-1'>
                    <i className='fa fa-trash mt-1' onClick={() => { onDeleteTask(params.data); }}></i>
                </div>
            }
        </div>;
    };

    const CheckBoxRenderer = (params) => {
        return <div className='mt-2'>
            {params.data["STATUS"] != 3 &&
                <Form.Check checked={params.data["STATUS"] == 2} onChange={() => onToggleStatus(params.data)} />
            }
        </div>;
    };

    let colDefs = [
        { field: "", width: 50, cellRenderer: CheckBoxRenderer },
        { headerName: 'Title', field: "TITLE", tooltipField: 'TITLE' },
        { headerName: 'Description', field: "DESCRIPTION", tooltipField: 'DESCRIPTION' },
        { headerName: 'Severity', field: "SEVERITY_DESC", tooltipField: 'SEVERITY_DESC' },
        { headerName: 'Status', field: "STATUS_DESC", tooltipField: 'STATUS_DESC' },
        { headerName: 'Category', field: "CATEGORY_DESC", tooltipField: 'CATEGORY_DESC' },
        { headerName: 'Due Date', field: "formattedDueDate", tooltipField: 'formattedDueDate' },
        { headerName: 'Actions', field: '', cellRenderer: Actions }
    ];

    const getRowStyle = (params) => {
        if (params.data["STATUS"] == 1) {
            return { background: "#FFC96F"}
        } else if (params.data["STATUS"] == 2) {
            return { background: "#ACD793"}
        } else {
            return { background: "#EE4E4E"}
        }
    }

    const defaultColDef = useMemo(() => {
        return {
            filter: true
        }
    })

    return (
        <div>
            <Header />

            <div className='d-flex sidebar-and-content-container' style={{ height: "92vh" }}>
                <SideBar />
                <Container>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Task Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddTaskComponent selectedRowDetails={selectedRowDetails} callBack={callBack} />
                        </Modal.Body>
                    </Modal>
                    <Row className="main-content-container" style={{ width: contentDynamicHeight + "%" }}>
                        <Col className='content-container pt-3'>
                            <div
                                className="ag-theme-quartz" // applying the grid theme
                                style={{ height: 600 }} // the grid will fill the size of the parent container
                            >
                                <AgGridReact
                                    rowData={todosList}
                                    columnDefs={colDefs}
                                    // pagination={true}
                                    defaultColDef={defaultColDef}
                                    // getRowStyle={getRowStyle}
                                    frameworkComponents={
                                        {
                                            Actions: Actions,
                                            CheckBoxRenderer: CheckBoxRenderer
                                        }
                                    }
                                />
                            </div>

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

export default GridViewPage;