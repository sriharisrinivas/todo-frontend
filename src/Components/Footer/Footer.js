import React from 'react';
import { Container, Form, Nav, NavDropdown, NavLink, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Footer(props) {

    return (
        <div className='footer-container'>
           <NavLink exact as={Link} to="/home" className='d-flex flex-column align-items-center footer-box'>
                <i className='fa fa-home'></i>
                <Form.Text>Home</Form.Text>
           </NavLink>

           <NavLink exact as={Link} to="/myTasks" className='d-flex flex-column align-items-center footer-box'>
                <i className='fa fa-table-list'></i>
                <Form.Text>All Tasks</Form.Text>
           </NavLink>

           <NavLink exact as={Link} to="/gridView" className='d-flex flex-column align-items-center footer-box'>
                <i className='fa fa-table'></i>
                <Form.Text>Grid View</Form.Text>
           </NavLink>

           <NavLink exact as={Link} to="/about" className='d-flex flex-column align-items-center footer-box'>
                <i className='fa fa-circle-exclamation'></i>
                <Form.Text>About</Form.Text>
           </NavLink>
        </div>
    );
}

export default (Footer);