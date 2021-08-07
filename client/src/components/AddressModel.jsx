import React, { useRef } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { userAddressPostActionFn } from "../redux/action/userAddressAction";

import { useDispatch } from "react-redux";
const AddressModel = ({ showModel, setshowModel }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClose = () => setshowModel(false);
    const contactName = useRef();
    const phoneNumber = useRef();
    const addressName = useRef();
    const ward = useRef();
    const tole = useRef();
    const city = useRef();
    const district = useRef();

    const handleSubmitAddress = () => {
        const address = {
            contactName: contactName.current.value,
            phoneNumber: phoneNumber.current.value,
            addressName: addressName.current.value,
            ward: ward.current.value,
            tole: tole.current.value,
            city: city.current.value,
            district: district.current.value,
        };

        dispatch(userAddressPostActionFn(address));
        setshowModel(false);
    };

    return (
        <Modal show={showModel} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    <h5 className="text-center text-info ">
                        <span>
                            <i className="far fa-address-card"></i>
                        </span>{" "}
                        Edit Address
                    </h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label>Contact Person</Form.Label>
                        <Form.Control
                            ref={contactName}
                            type="text"
                            placeholder="Contact person's name"
                        />
                    </Form.Group>
                    <div className="row mb-2">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>
                                    Mobile Number (optional)
                                </Form.Label>
                                <Form.Control
                                    ref={phoneNumber}
                                    type="number"
                                    placeholder="Mobile Number"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>
                                    Contact Number for delivery.
                                </Form.Label>
                                <Form.Check
                                    inline
                                    className="text-info"
                                    label="Primary"
                                    type="checkbox"
                                />
                                <Form.Check
                                    inline
                                    className="text-info"
                                    label="Secondary"
                                    type="checkbox"
                                />
                            </Form.Group>
                        </Col>
                    </div>
                    <div className="row">
                        <Col md={9}>
                            <Form.Group className="mb-2">
                                <Form.Label>Tole /Chowk</Form.Label>
                                <Form.Control
                                    ref={tole}
                                    type="text"
                                    placeholder="location.."
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-2">
                                <Form.Label>Ward</Form.Label>
                                <Form.Control
                                    ref={ward}
                                    type="text"
                                    placeholder="Ward Number"
                                />
                            </Form.Group>
                        </Col>
                    </div>
                    <Form.Group className="mb-2">
                        <Form.Label>Address Details</Form.Label>
                        <Form.Control
                            ref={addressName}
                            as="textarea"
                            rows={3}
                        />
                    </Form.Group>
                    <div className="row">
                        <Col md={6}>
                            <Form.Group className="mb-2">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    ref={city}
                                    type="text"
                                    placeholder="town, village,city"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-2">
                                <Form.Label>District</Form.Label>
                                <Form.Control
                                    ref={district}
                                    type="text"
                                    placeholder="District"
                                />
                            </Form.Group>
                        </Col>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmitAddress}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddressModel;
