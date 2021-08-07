import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Laoding";
import {
    useHistory,
    Link,
    NavLink,
    Route,
    Switch,
    useRouteMatch,
} from "react-router-dom";
import { Col, Nav } from "react-bootstrap";
import { getAllUserAction } from "../redux/action/adminAction/adminAction";
import ErrorMsg from "../components/ErrorMsg";
import AdminUser from "../components/admin/AdminUser";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminProduct from "../components/admin/AdminProduct";
import AdminOrder from "../components/admin/AdminOrder";
const AdminPage = () => {
    let { path, url } = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userLogin);
    const { loading, allUsers, error } = useSelector((state) => state.admin);
    useEffect(() => {
        if (!userInfo && userInfo.isAdmin) {
            history.push("/");
        } else {
            dispatch(getAllUserAction());
        }
    }, [dispatch, history, userInfo]);

    return (
        <div>
            <div className="row">
                <Col xs={12} md={2}>
                    <h4 className="text-white bg-info p-2 text-center rounded-top">
                        Menu
                    </h4>
                    <ul class="nav nav-pills list-group">
                        <li class=" nav-item border border-primary rounded mb-2 ">
                            <LinkContainer to={`${url}/dashboard`}>
                                <Nav.Link>
                                    <div>
                                        <h6>DASHBOARD</h6>
                                    </div>
                                </Nav.Link>
                            </LinkContainer>
                        </li>
                        <li class="nav-item border border-primary rounded-3  mb-2">
                            <LinkContainer className="" to={`${url}/users`}>
                                <Nav.Link>
                                    <h6>USERS</h6>
                                </Nav.Link>
                            </LinkContainer>
                        </li>
                        <li class="nav-item border border-primary rounded mb-2">
                            <LinkContainer className="" to={`${url}/products`}>
                                <Nav.Link>
                                    <h6>PRODUCTS</h6>
                                </Nav.Link>
                            </LinkContainer>
                        </li>
                        <li class="nav-item border border-primary rounded mb-2">
                            <LinkContainer className="" to={`${url}/orders`}>
                                <Nav.Link>
                                    <h6>ORDERS</h6>
                                </Nav.Link>
                            </LinkContainer>
                        </li>
                    </ul>
                </Col>
                <Col xs={12} md={10}>
                    <Switch>
                        <Route path={`${path}/dashboard`}>
                            <AdminDashboard />
                        </Route>
                        <Route path={`${path}/users`}>
                            <AdminUser />
                        </Route>
                        <Route path={`${path}/products`}>
                            <AdminProduct />
                        </Route>
                        <Route path={`${path}/orders`}>
                            <AdminOrder />
                        </Route>
                    </Switch>
                </Col>
            </div>
        </div>
    );
};

export default AdminPage;
