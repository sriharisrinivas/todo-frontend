import React, { useState } from 'react';
import AddTaskComponent from '../AddTaskComponent/AddTaskComponent';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { API_END_POINTS, CONSTANTS } from '../../config';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeRenderAlertMsgAction, renderAlertMessageAction } from '../../Redux/Action/AlertMessageAction';
import { startLoaderAction, stopLoaderAction } from '../../Redux/Action/LoaderAction';
import { REDUX_CONSTANTS } from '../../Redux/reduxConstants';
// import { useHistory } from 'react-router-dom';

const initialLoginFields = {
    userName: '',
    password: ''
};

const initialSignUpFields = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: 1,
    profilePic: ''
};

function LoginSignUpForm(props) {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [formType, setFormType] = useState("login");
    const [errorMessage, setErrorMessage] = useState("");
    const [loginFields, setLoginFields] = useState(initialLoginFields);
    const [signUpFields, setSignUpFields] = useState(initialSignUpFields);

    const handleChange = (e) => {
        if (formType == "login") {
            setLoginFields(pre => ({ ...pre, [e.target.name]: e.target.value }));
        } else {
            setSignUpFields(pre => ({ ...pre, [e.target.name]: e.target.value }));
        }
    };

    const removeAlertMessage = () => {
        setTimeout(() => {
            dispatch(removeRenderAlertMsgAction());
        }, 2000);
    };

    const registerUser = async () => {
        if (signUpFields.userName == '' || signUpFields.password == '') {
            setErrorMessage("Please Enter Mandatory Fields.")
            return;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(signUpFields)
        };
        let url = CONSTANTS.SERVICE_URL + API_END_POINTS.CREATE_USER;
        dispatch(startLoaderAction());
        let response = await fetch(url, options);
        let parsedResponse = await response.json();
        dispatch(stopLoaderAction());

        if (response.status == 200) {
            setErrorMessage("");
            dispatch(renderAlertMessageAction({
                message: parsedResponse.message,
                heading: "Register",
                show: true
            }));
            removeAlertMessage();
            setFormType("login");
            setSignUpFields(initialSignUpFields);
        } else {
            setErrorMessage(parsedResponse.message);
        }
    };

    const loginUser = async () => {
        if (loginFields.userName == '' || loginFields.password == '') {
            setErrorMessage("Please Enter Mandatory Fields.")
            return;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(loginFields)
        };
        let url = CONSTANTS.SERVICE_URL + API_END_POINTS.LOGIN;
        dispatch(startLoaderAction());
        let response = await fetch(url, options);
        let parsedResponse = await response.json();
        dispatch(stopLoaderAction());
        if (response.status == 200) {
            setErrorMessage("");
            getProfile(parsedResponse.jwtToken);
            // dispatch(renderAlertMessageAction({
            //     message: "Login SuccessFul. Redirecting to home page in couple of seconds",
            //     heading: "Login",
            //     show: true
            // }));
            // removeAlertMessage();
            sessionStorage.setItem("token", parsedResponse.jwtToken);
            navigate("/home");
            setLoginFields(initialLoginFields);
        } else {
            setErrorMessage(parsedResponse.message);
        }
    };

    const getProfile = async (token) => {
        dispatch(startLoaderAction());
        let url = CONSTANTS.SERVICE_URL + API_END_POINTS.GET_PROFILE;
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${token}`
            }
        };
        let response = await fetch(url, options);
        dispatch(stopLoaderAction());
        response = await response.json();
        dispatch({
            type: REDUX_CONSTANTS.UPDATE_USER_DETAILS,
            payload: response
        });
    };

    const onSubmit = (e) => {
        setErrorMessage("")
        e.preventDefault();
        if (formType == "login") {
            loginUser();
        } else {
            registerUser();
        }
    };


    return (
        <Container className='login-form card'>
            <Form.Text className='login-main-title'>{formType == "login" ? "Login" : "Sign Up"}</Form.Text>

            <Form.Group className='mt-3'>
                <Form.Label><span className='field-required'>* </span>User Name</Form.Label>
                {formType == "login" ?
                    <Form.Control className="todo-field" size="lg" type="text" name={"userName"} value={loginFields.userName} onChange={handleChange} placeholder='Enter User Name...' /> :
                    <Form.Control className="todo-field" size="lg" type="text" name={"userName"} value={signUpFields.userName} onChange={handleChange} placeholder='Enter User Name...' />
                }
            </Form.Group>

            {formType == "signup" &&
                <>
                    <Row>
                        <Col sm="12" md="6">
                            <Form.Group className='mt-3'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control placeholder='Enter First Name' className="todo-field" name={"firstName"} value={signUpFields.firstName} onChange={handleChange} size='lg' />
                            </Form.Group>
                        </Col>

                        <Col sm="12" md="6">
                            <Form.Group className='mt-3'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control placeholder='Enter Last Name' className="todo-field" name={"lastName"} value={signUpFields.lastName} onChange={handleChange} size='lg' />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className='mt-3'>
                        <Form.Label>Gender</Form.Label>
                        <Row>
                            <Col>
                                <Form.Check type="radio" label="Male" name={"gender"} value={1} checked={signUpFields.gender == 1} onChange={handleChange} size='lg' />
                            </Col>
                            <Col>
                                <Form.Check type="radio" label="Female" name={"gender"} value={2} checked={signUpFields.gender == 2} onChange={handleChange} size='lg' />
                            </Col>
                        </Row>
                    </Form.Group>
                </>

            }

            <Form.Group className='mt-3'>
                <Form.Label><span className='field-required'>* </span>Password</Form.Label>
                {formType == "login" ?
                    <Form.Control className="todo-field" size="lg" type="password" name={"password"} value={loginFields.password} onChange={handleChange} placeholder='Enter Password...' /> :
                    <Form.Control className="todo-field" size="lg" type="password" name={"password"} value={signUpFields.password} onChange={handleChange} placeholder='Enter Password...' />
                }
            </Form.Group>

            <Form.Text className='field-required'>{errorMessage}</Form.Text>

            {formType == "login" ?
                <button className='btn btn-primary mt-4 mb-2' onClick={onSubmit} >Login</button> :
                <button className='btn btn-primary mt-4 mb-2' onClick={onSubmit} >Create User</button>
            }

            {formType == "login" ?
                <button onClick={() => { setFormType("signup"); setErrorMessage(""); }} className='btn btn-outline-warning mt-3 mb-2'>Sign Up</button> :
                <button onClick={() => { setFormType("login"); setErrorMessage(""); }} className='btn btn-outline-warning mt-3 mb-2'>Back To Login</button>
            }
        </Container>
    );
}

export default LoginSignUpForm;