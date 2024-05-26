
import React, { useEffect, useState } from 'react';
import "./CashBook.css";
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Form, Row } from 'react-bootstrap';
import AddTaskComponent from '../AddTaskComponent/AddTaskComponent';
import Footer from '../Footer/Footer';
import { createCashbook, createEntry, deleteEntry, getAllEntries, getCashbookNames } from '../../Redux/Action/CashbookAction';
import moment from 'moment';
import CashbookEntry from '../CashbookEntry/CashbookEntry';
import { modes } from '../../config';

function CashBook() {

    const [fields, setFields] = useState({
        cashbookName: '',
        selectedCashbook: '',
        transactionType: '',
        mode: modes.SAVE

    });

    const [showCashbookEntryPopup, setShowCashbookEntryPopup] = useState(false);

    const [selectedRowDetails, setSelectedRowDetails] = useState(undefined);

    const [summaryDetails, setSummaryDetails] = useState({
        cashIn: 0,
        cashOut: 0,
        total: 0
    });

    let contentDynamicHeight = useSelector(state => state.SideBarReducer.dynamicContentContainerHeight);

    let state = useSelector(state => state.cashbookReducer);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFields(pre => ({ ...pre, [e.target.name]: e.target.value }));
    };

    const onAddCashbook = () => {
        dispatch(createCashbook({
            title: fields.cashbookName
        }));
        setFields(pre => ({
            ...pre,
            cashbookName: ''
        }));
    };


    const onAddNewBilling = (type) => {
        setFields(pre => ({ ...pre, mode: modes.SAVE, transactionType: type }));
        setShowCashbookEntryPopup(true);
    };

    const onClickEdit = item => {
        setFields(pre => ({ ...pre, mode: modes.UPDATE, transactionType: item["TRANSACTION_TYPE"] }));
        setSelectedRowDetails(item);
        setShowCashbookEntryPopup(true);
    };

    const onDeleteItem = (item) => {
        dispatch(deleteEntry({
            cbsmId: item["CBSM_ID"]
        }));
        fetchEntriesCallBack();
    };

    const handleClose = () => {
        setShowCashbookEntryPopup(false);
        setSelectedRowDetails(undefined);
        fetchEntriesCallBack();
    };

    const fetchEntriesCallBack = () => {
        dispatch(getAllEntries({
            id: fields.selectedCashbook
        }));
    };

    useEffect(() => {
        dispatch(getCashbookNames());
    }, []);

    useEffect(() => {
        fetchEntriesCallBack();
    }, [fields.selectedCashbook]);

    const refreshEntries = () => {
        fetchEntriesCallBack();

    };

    useEffect(() => {
        let cashInTotal = 0;
        let cashOutTotal = 0;
        let total = 0;

        state.cashbookDetails.forEach(item => {
            if (item["TRANSACTION_TYPE"] == 1) {
                cashInTotal += parseFloat(item["AMOUNT"]);
            } else {
                cashOutTotal += parseFloat(item["AMOUNT"]);
            }
        });

        total = cashInTotal - cashOutTotal;

        setSummaryDetails(pre => ({ ...pre, cashIn: cashInTotal, cashOut: cashOutTotal, total: total }));
    }, [state.cashbookDetails]);


    return (
        <div style={{ height: "100vh", overflow: "scroll" }}>
            {showCashbookEntryPopup && <CashbookEntry show={showCashbookEntryPopup} handleClose={handleClose} configData={fields} selectedRowDetails={selectedRowDetails} />
            }
            <Header />

            <div className='d-flex sidebar-and-content-container' style={{ height: "92vh" }}>
                <SideBar />

                <Row className="main-content-container" style={{ width: contentDynamicHeight + "%" }}>
                    <Col sm={12} className='content-container pt-3'>
                        <Row style={{ gap: "10px" }}>
                            <Col sm={12}>
                                <Form.Text className='task-main-title'>Cash Book</Form.Text>
                            </Col>

                            <Col className='d-flex w-100' style={{ gap: "10px" }}>
                                <Form.Group className='w-100'>
                                    <Form.Label>Create New CashBook</Form.Label>
                                    <Form.Control className="todo-field" size="lg" type="text" name={"cashbookName"} value={fields.cashbookName} onChange={handleChange} placeholder='Enter the Description...' />
                                </Form.Group>
                                <div>
                                    <br />
                                    <button disabled={fields.cashbookName == ''} style={{ height: "34px" }} className='mt-2 btn btn-outline-primary fa fa-plus' onClick={onAddCashbook}></button>
                                </div>
                            </Col>

                            <Col sm={12}>
                                <Form.Group>
                                    <Form.Label>Select your Cashbook</Form.Label>
                                    <Form.Select className="todo-field" name={"selectedCashbook"} value={fields.selectedCashbook} onChange={handleChange} size='lg'>

                                        <option value={''}>Select</option>
                                        {state.cashbookNames.map(item => <option value={item["CBM_ID"]}>{item["TITLE"]}</option>)}

                                    </Form.Select>
                                </Form.Group>
                            </Col>


                        </Row>


                        <Row>
                            <Col className='d-flex justify-content-between align-items-baseline mb-2'>
                                <Form.Text className='task-main-title mt-3'>Billing Details</Form.Text>

                                <div className='d-flex' style={{ gap: "10px" }}>
                                    <button disabled={fields.selectedCashbook == ''} className='btn btn-outline-success' onClick={() => onAddNewBilling(1)}>Cash In</button>
                                    <button disabled={fields.selectedCashbook == ''} className='btn btn-outline-danger' onClick={() => onAddNewBilling(2)}>Cash Out</button>
                                    <i className='fa fa-refresh mt-2' onClick={refreshEntries}></i>
                                </div>
                            </Col>
                            <hr />

                            <div className='cashbook-details-list-container'>

                                {state.cashbookDetails.map(item => (
                                    <Row className='cashbook-details-container card'>
                                        <Col sm={12} className='d-flex justify-content-between'>
                                            <Form.Text className='cashbook-date-text'>{moment(item["DATE"]).format("DD/MM/YYYY HH:mm")}</Form.Text>
                                            <div className='d-flex' style={{ gap: "10px" }}>
                                                <i className='fa fa-edit' onClick={() => { onClickEdit(item); }}></i>
                                                <i className='fa fa-trash' onClick={() => { onDeleteItem(item); }}></i>
                                            </div>

                                        </Col>
                                        <Col sm="12" className='d-flex justify-content-between'>
                                            <Form.Text>{item["DESCRIPTION"]}</Form.Text>
                                            <Form.Text style={{ color: item["TRANSACTION_TYPE"] == 2 ? "red" : "green" }}>{item["TRANSACTION_TYPE"] == 1 ? "Credit" : "Debit"}</Form.Text>
                                            <Form.Text>{item["AMOUNT"]}/-</Form.Text>
                                        </Col>
                                    </Row>
                                ))}

                                {state.cashbookDetails.length == 0 && <div className='d-flex flex-column justify-content-center'>
                                    <Form.Text className='text-center' style={{ fontWeight: 700 }}>No Bills</Form.Text>
                                    <Form.Text>1. Select Cashbook.</Form.Text>
                                    <Form.Text>2. Add by clicking "Cash out" or "Cash in" buttons.</Form.Text>
                                </div>}
                            </div>
                        </Row>

                        <Row className='cashbook-total-container'>
                            <Col className='d-flex flex-column align-items-center'>
                                <Form.Text>Cash In</Form.Text>
                                <Form.Text style={{ color: "green" }}>{summaryDetails.cashIn}</Form.Text>
                            </Col>
                            <Col className='d-flex flex-column align-items-center'>
                                <Form.Text>Cash Out</Form.Text>
                                <Form.Text style={{ color: "red" }}>{summaryDetails.cashOut}</Form.Text>
                            </Col>
                            <Col className='d-flex flex-column align-items-center'>
                                <Form.Text>Balance</Form.Text>
                                <Form.Text style={{ color: summaryDetails.total < 0 ? "red" : "green" }}>{summaryDetails.total}</Form.Text>
                            </Col>
                        </Row>


                    </Col>
                </Row>
            </div>

            <div className='footer-main-container'>
                <Footer />
            </div>
        </div>

    );
}

export default CashBook;