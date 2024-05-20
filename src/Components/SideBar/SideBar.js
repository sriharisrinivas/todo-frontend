import React, { useEffect } from 'react';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import { Button, Col, Form, NavLink, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { updateContentContainerHeight } from '../../Redux/Action/SideBarAction';
import { useDispatch } from 'react-redux';

function SideBar() {

    const dispatch = useDispatch();

    const onExpandCollapseSideBar = () => {
        handleOutside();
    };

    const handleOutside = () => {
        let ele = document.getElementById("sidebar");
        if (ele) {
            ele = ele.getAttribute("class");
            if (!ele.includes("toggled")) {
                dispatch(updateContentContainerHeight(95));
            } else {
                dispatch(updateContentContainerHeight(84));
            }
        } else {
            dispatch(updateContentContainerHeight(100));
        }

    };

    return (
        <div className='sidebar-todo' style={{ display: 'flex', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333" id="sidebar" >
                <CDBSidebarHeader prefix={<i onClick={onExpandCollapseSideBar} className="fa fa-bars fa-large"></i>}>
                    <a href="/home" className="text-decoration-none" style={{ color: 'inherit' }}>
                        Sidebar
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/home" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/home" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Add New Task</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/home" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="table">All Tasks</CDBSidebarMenuItem>
                        </NavLink>
                        {/* <NavLink exact to="/completedTasks" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Completed Tasks</CDBSidebarMenuItem>
                        </NavLink> */}
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                        User Name
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
}

export default SideBar;