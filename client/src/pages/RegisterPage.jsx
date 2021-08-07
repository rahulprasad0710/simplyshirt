import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userRegisterActionFn } from "../redux/action/userAction";
import { Form, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const RegisterPage = () => {
    const { loading, message, status } = useSelector((state) => state.newUser);
    const { userInfo } = useSelector((state) => state.userLogin);

    const mobileNumber = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    useEffect(() => {
        if (userInfo) {
            history.push("/");
        }
        if (message) {
            toast(
                <p className="text-success rounded text-center bg-light p-2">
                    <strong>{message}</strong>
                </p>
            );
        }
        if (status === 201) {
            history.push("/registersuccess");
        }
    }, [history, userInfo, message, status]);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !mobileNumber.current.value ||
            !email.current.value ||
            !password.current.value ||
            !passwordAgain.current.value
        ) {
            toast(
                <p className="rounded text-danger bg-light p-2">
                    Please enter all the information.
                </p>
            );
        } else if (password.current.value.length < 8) {
            toast(
                <p className="rounded text-danger bg-light p-2">
                    Password should contain atleast 8 characters.
                </p>
            );
        } else if (password.current.value !== passwordAgain.current.value) {
            toast(
                <p className="rounded text-danger bg-light p-2">
                    Password does not match.
                </p>
            );
        } else if (mobileNumber.current.value.length !== 10) {
            toast(
                <p className="rounded text-danger bg-light p-2">
                    Mobile Number should be of 10 digits.
                </p>
            );
        } else {
            const user = {
                mobileNumber: mobileNumber.current.value,
                email: email.current.value,
                password: password.current.value,
            };

            dispatch(userRegisterActionFn(user));
        }
    };

    return (
        <div className="">
            <ToastContainer position="top-center" />
            <Row className="d-flex justify-content-center">
                <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control
                                ref={mobileNumber}
                                type="number"
                                placeholder="Mobile  Number"
                                required
                            />
                            <Form.Text className="text-muted">
                                We'll never share your number with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                ref={email}
                                type="email"
                                placeholder="Enter email"
                                required
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                ref={password}
                                type="password"
                                placeholder="Enter Password"
                                required
                            />
                            <Form.Text className="text-muted">
                                Your password should contain atleast 8
                                characters.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                ref={passwordAgain}
                                type="password"
                                placeholder="Confirm your Password"
                                required
                            />
                            <Form.Text className="text-muted">
                                Type the password again to confirm.
                            </Form.Text>
                        </Form.Group>

                        <div class="d-grid gap-2">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                class="btn btn-lg btn-success"
                                type="button">
                                Submit
                            </button>
                        </div>
                    </Form>
                    <div className="mt-3">
                        <p>
                            Already have an account ?{" "}
                            <Link to="/login">Login</Link>{" "}
                        </p>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default RegisterPage;
