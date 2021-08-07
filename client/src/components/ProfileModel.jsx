import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateProfileDetailsActionFn } from "../redux/action/userAccountAction";

const ProfileModel = ({ showModel, setshowModel, user }) => {
    const handleClose = () => setshowModel(false);
    const dispatch = useDispatch();
    const [firstName, setfirstName] = useState(user.firstName);
    const [lastName, setlastName] = useState(user.lastName);
    const [email, setemail] = useState(user.email);

    const handleEditProfile = () => {
        const user = {
            firstName,
            lastName,
            email,
        };
        dispatch(updateProfileDetailsActionFn(user));
        handleClose();
    };

    return (
        <Modal show={showModel} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    <h5 className="text-center text-info ">
                        <span>
                            <i className="fas fa-user-edit"></i>
                        </span>{" "}
                        Edit Profile
                    </h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="row">
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    onChange={(e) =>
                                        setfirstName(e.target.value)
                                    }
                                    type="text"
                                    value={firstName}
                                    placeholder="First Name"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    value={lastName}
                                    type="text"
                                    placeholder="Last Name"
                                    onChange={(e) =>
                                        setlastName(e.target.value)
                                    }
                                />
                            </Form.Group>
                        </Col>
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label>Mobile No</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Mobile Number"
                            value={user.mobileNumber}
                            disabled
                        />
                        <Form.Text className="text-muted">
                            Mobile Number cannot be changed.But you can add new
                            mobile number.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEditProfile}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModel;
