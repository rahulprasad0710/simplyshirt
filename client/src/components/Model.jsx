import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { userLogoutActionFn } from "../redux/action/userAction";
import { userProfileResetActionFn } from "../redux/action/userAccountAction";
import { useDispatch } from "react-redux";
const Model = ({ showModel, setshowModel }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClose = () => setshowModel(false);

    const handleLogout = () => {
        dispatch(userProfileResetActionFn());
        dispatch(userLogoutActionFn());
        setshowModel(false);
        history.push("/");
    };

    return (
        <Modal show={showModel} onHide={handleClose}>
            <Modal.Body className="text-center text-info ">
                <h4> Are you sure you want to logout ?</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleLogout}>
                    Yes
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Model;
