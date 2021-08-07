import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Nav } from "react-bootstrap";
import profilePic from "../assets/user2.svg";
import { userProfileDetailsActionFn } from "../redux/action/userAccountAction";
import {
    useHistory,
    Link,
    NavLink,
    Route,
    Switch,
    useRouteMatch,
} from "react-router-dom";

import Myinfo from "../components/user/Myinfo";
import MyAddress from "../components/user/MyAddress";
import MyOrders from "../components/user/MyOrders";
import MyPayment from "../components/user/MyPayment";
const ProfilePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let { path, url } = useRouteMatch();
    const { userInfo } = useSelector((state) => state.userLogin);
    useEffect(() => {
        if (!userInfo) {
            history.push("/");
        } else {
            dispatch(userProfileDetailsActionFn());
        }
    }, [dispatch, history, userInfo]);

    console.log(url);
    return (
        <div>
            <ul class="nav nav-pills d-flex justify-content-center mb-4   flex-wrap">
                <li class="nav-item pills-box m-2">
                    <LinkContainer
                        className="profile-pills "
                        to={`${url}/myinfo`}>
                        <Nav.Link>
                            <div>
                                <h5>Profile Details</h5>
                                <p class="card-text text-muted">
                                    View,edit personal info
                                </p>
                            </div>
                        </Nav.Link>
                    </LinkContainer>
                </li>
                <li class="nav-item pills-box  m-2">
                    <LinkContainer
                        className="profile-pills "
                        to={`${url}/myaddress`}>
                        <Nav.Link>
                            <div>
                                <h5 class="card-title">My Address</h5>
                                <p class="card-text text-muted">
                                    View,edit address
                                </p>
                            </div>
                        </Nav.Link>
                    </LinkContainer>
                </li>
                <li class="nav-item pills-box  m-2">
                    <LinkContainer
                        className="profile-pills "
                        to={`${url}/mypayments`}>
                        <Nav.Link>
                            <div>
                                <h5 class="card-title">My Payments</h5>
                                <p class="card-text text-muted">
                                    View ,edit payments details
                                </p>
                            </div>
                        </Nav.Link>
                    </LinkContainer>
                </li>
                <li class="nav-item pills-box  m-2">
                    <LinkContainer
                        className="profile-pills "
                        to={`${url}/myorders`}>
                        <Nav.Link>
                            <div>
                                <h5 class="card-title">My Orders</h5>
                                <p class="card-text text-muted">
                                    View orders status, history
                                </p>
                            </div>
                        </Nav.Link>
                    </LinkContainer>
                </li>
            </ul>

            <Switch>
                <Route path={`${path}/myinfo`}>
                    <Myinfo />
                </Route>
                <Route path={`${path}/myaddress`}>
                    <MyAddress />
                </Route>
                <Route path={`${path}/mypayments`}>
                    <MyPayment />
                </Route>
                <Route path={`${path}/myorders`}>
                    <MyOrders />
                </Route>
            </Switch>
        </div>
    );
};

export default ProfilePage;
