import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userLoginActionFn } from "../redux/action/userAction";
import { Form, Row, Col } from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const LoginPage = () => {
    const mobileNumber = useRef();
    const password = useRef();

    const history = useHistory();
    const { userInfo, loading, error } = useSelector(
        (state) => state.userLogin
    );
    const dispatch = useDispatch();
    console.log(userInfo);

    useEffect(() => {
        if (userInfo !== null) {
            history.push("/");
        }
        if (error) {
            toast(
                <p className="text-primary bg-warning rounded p-2">
                    {error.message}
                </p>
            );
        }
    }, [history, userInfo, error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            mobileNumber.current.value === "" ||
            password.current.value === ""
        ) {
            toast(
                <p className="text-primary bg-warning rounded p-2">
                    Please enter all the information.
                </p>
            );
        } else if (password.current.value.length < 8) {
            toast(
                <p className="text-primary bg-warning rounded p-2">
                    Password should contain atleast 8 characters.
                </p>
            );
        } else {
            const user = {
                mobileNumber: mobileNumber.current.value,
                password: password.current.value,
            };

            dispatch(userLoginActionFn(user));
        }
    };

    return (
        <div className="">
            <ToastContainer position="top-center" />

            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                ref={mobileNumber}
                                type="number"
                                placeholder="Mobile  Number"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                ref={password}
                                type="password"
                                placeholder="Enter Password"
                                required
                            />
                        </Form.Group>

                        <div class="d-grid gap-2">
                            <button
                                onClick={handleSubmit}
                                dispatch={loading}
                                class="btn btn-lg btn-success"
                                type="button">
                                Submit
                            </button>
                        </div>
                    </Form>
                    <div className="d-flex justify-content-between mt-2">
                        <Link className="text-info" to="/">
                            Forget Password{" "}
                        </Link>

                        <p>
                            New to Ecom ?{" "}
                            <Link to="/register">Register Here.</Link>{" "}
                        </p>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default LoginPage;
